package stocks.controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import stocks.dto.JwtAuthenticationResponse;
import stocks.models.*;
import stocks.repositories.UserRepository;
import stocks.service.AuthenticationService;
import stocks.service.JwtService;
import stocks.service.UserService;

import javax.swing.text.html.Option;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
	
	@Autowired
	private final AuthenticationService service;

	@Autowired
	private final JwtService jService;

	@Autowired
	private final UserService userService;
	
	@Autowired
	private final StockController stockController;
	
	@PostMapping("/Register")
	public ResponseEntity<JwtAuthenticationResponse> Register(@RequestBody LoginCredentials register){
		//if username is taken, return error code 409
		Optional<User> user = userService.findUserByUsername(register.getUsername());
		if(user.isPresent()) {
			return ResponseEntity.status(409).build();
		}

        return ResponseEntity.ok(service.signUp(register));
	}
	
	
	@PostMapping("/Login")
	public JwtAuthenticationResponse login(@RequestBody LoginCredentials user){
		return service.signIn(user);
	}

	@GetMapping("/buy/{stockSymbol}/{amountBought}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<String> buy(@PathVariable String stockSymbol,@PathVariable String amountBought,@RequestHeader("Authorization") String authHead ) throws IOException{
		// Extract the JWT token from the Authorization header
		User user = getUser(authHead);

		if(user == null) return ResponseEntity.badRequest().build();
		Stock stock = user.getStocksHeld().get(stockSymbol.toLowerCase());
		if(stock == null) {
			stock = new Stock();
			stock.setSymbol(stockSymbol.toLowerCase());
			user.getStocksHeld().put(stock.getSymbol(), stock);
		}


		double total = user.getTotal();
		stock.updatePrice();
		if((stock.getPrice()*stock.getCounter() + user.getTotalInvested()) < total) {
			stock.buy(Integer.parseInt(amountBought));


		}else{
			return ResponseEntity.badRequest().body("not enough money");
		}
		user.getHistory().add(new StockHistoryStatement(user.getUsername(), stockSymbol,Integer.parseInt(amountBought),false, LocalDate.now()));
		System.out.println(user.getHistory().size());
		user.updateTotal();
		//save updates to database
		userService.saveUser(user);



		return ResponseEntity.ok(null);




	}

	@GetMapping("/sell/{stockSymbol}/{amountSell}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<String> sell(@PathVariable String stockSymbol,@PathVariable String amountSell,@RequestHeader("Authorization") String authHead ) throws IOException{
		// Extract the JWT token from the Authorization header
		User user = getUser(authHead);

		if(user == null) return ResponseEntity.badRequest().body("error with user info");
		Stock stock = user.getStocksHeld().get(stockSymbol.toLowerCase().toLowerCase());
		if(stock == null) {
			return ResponseEntity.badRequest().body("does not own any of this stock");
		}


		stock.updatePrice();
		if(stock.getCounter() < Integer.parseInt(amountSell)){
			return ResponseEntity.badRequest().body("not enough stocks to sell");
		}else{
			stock.setCounter(stock.getCounter() - Integer.parseInt(amountSell));
			if(stock.getCounter() == 0) {
				user.getStocksHeld().remove(stockSymbol.toLowerCase());
			}
		}
		user.updateTotal();
		userService.saveUser(user);



		return ResponseEntity.ok(null);

	}

	/*private void hasStock(Stock stock,User user) {
		if(user.getStocksHeld().contains(stock)) {
			for(Stock s:user.getStocksHeld()) {
				if(s.getSymbol().toLowerCase().equals(stock.getSymbol().toLowerCase())) {
					stock = s;
					break;
				}
			}
		}else {
			user.getStocksHeld().add(stock);
		}
	}*/

	public User getUser(String header){
		// Extract the JWT token from the Authorization header
		String jwtToken = header.substring(7); // Assuming Bearer token format

		// Extract the username from the JWT token
		String username = jService.extractUserName(jwtToken);

		//create Optional object that finds if user is available
		Optional<User> user = userService.findUserByUsername(username);

		//if user is present, returns only info that front end needs. Otherwise, send badRequest()
		return user.orElse(null);

	}



	@GetMapping("/user-info")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<UserInfo> getUserInfo(@RequestHeader("Authorization") String authorizationHeader) throws IOException {
		User info = getUser(authorizationHeader);

		if(info == null) return ResponseEntity.badRequest().build();

		//only send back what we need
		info.updateTotal();
		userService.saveUser(info);
		return ResponseEntity.ok(new UserInfo(info.getUsername(),info.getStocksHeld().values().toArray(),info.getHistory(),info.getTotal(),info.getTotalUpToDate()));

	}

	@GetMapping("/user-history")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<LinkedList<StockHistoryStatement>> getHistory(@RequestHeader("Authorization") String authorizationHeader){
		User user = getUser(authorizationHeader);

		if(user == null)
			return ResponseEntity.badRequest().body(null);

		return ResponseEntity.ok(user.getHistory());
	}

}
