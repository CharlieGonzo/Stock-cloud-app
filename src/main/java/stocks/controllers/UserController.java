package stocks.controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import stocks.dto.JwtAuthenticationResponse;
import stocks.dto.UserInfo;
import stocks.models.*;
import stocks.service.AuthenticationService;
import stocks.service.JwtService;
import stocks.service.UserService;

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

	/**
	 * register user to jwt service and return json token
	 * @param register info ser is registering with
	 * @return jwt token
	 */
	@PostMapping("/Register")
	public ResponseEntity<JwtAuthenticationResponse> Register(@RequestBody LoginCredentials register){
		
		if(register.getUsername().length() < 6 || register.getPassword().length() < 6) {
			return ResponseEntity.status(422).build();
		}
		//if username is taken, return error code 409
		Optional<User> user = userService.findUserByUsername(register.getUsername());
		if(user.isPresent()) {
			return ResponseEntity.status(409).build();
		}
		
		

        return ResponseEntity.ok(service.signUp(register));
	}


	/**
	 * login in user and send back jwt token
	 * @param user user credentials
	 * @return jwt token
	 */
	@PostMapping("/Login")
	public JwtAuthenticationResponse login(@RequestBody LoginCredentials user){
		return service.signIn(user);
	}


	/**
	 * allows user to buy stock using real time stock info api I made
	 * @param stockSymbol
	 * @param amountBought
	 * @param authHead
	 * @return
	 * @throws IOException
	 */
	@GetMapping("/buy/{stockSymbol}/{amountBought}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<String> buy(@PathVariable String stockSymbol,@PathVariable String amountBought,@RequestHeader("Authorization") String authHead ) throws IOException{
		User user = getUser(authHead);

		if(user == null) return ResponseEntity.badRequest().build();

		Stock stock = user.getStocksHeld().get(stockSymbol.toLowerCase());
		if(stock == null) {
			stock = new Stock();
			stock.setSymbol(stockSymbol.toLowerCase());
			user.getStocksHeld().put(stock.getSymbol(), stock);
		}

		//update stock prices and user info
		double total = user.getTotal();
		stock.updatePrice();
		if((stock.getPrice()*stock.getCounter() + user.getTotalInvested()) < total) {
			stock.buy(Integer.parseInt(amountBought));
		}else{
			return ResponseEntity.badRequest().body("not enough money");
		}

		//create historical transaction statement and add it to users history
		user.getHistory().add(new StockHistoryStatement(user.getUsername(), stockSymbol,Integer.parseInt(amountBought),false, LocalDate.now()));
		user.updateTotal();

		//save updates to database
		userService.saveUser(user);

		return ResponseEntity.ok(null);

	}


	/**
	 * allows users to sell stocks with up to date pricing
	 * @param stockSymbol
	 * @param amountSell
	 * @param authHead
	 * @return
	 * @throws IOException
	 */
	@GetMapping("/sell/{stockSymbol}/{amountSell}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<String> sell(@PathVariable String stockSymbol,@PathVariable String amountSell,@RequestHeader("Authorization") String authHead ) throws IOException{
		// Extract the JWT token from the Authorization header
		User user = getUser(authHead);

		if(user == null) return ResponseEntity.badRequest().body("error with user info");
		Stock stock = user.getStocksHeld().get(stockSymbol.toLowerCase().toLowerCase());

		//can't sell stock user doesnt have
		if(stock == null) {
			return ResponseEntity.badRequest().body("does not own any of this stock");
		}

		//get latest price of stock
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



	/**
	 * get user info through jwt service
	 * @param header
	 * @return
	 */
	//get user info by using there jwt token
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


	/**
	 * return user info in a DTO
	 * @param authorizationHeader
	 * @return
	 * @throws IOException
	 */
	@GetMapping("/user-info")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<UserInfo> getUserInfo(@RequestHeader("Authorization") String authorizationHeader) throws IOException {
		User info = getUser(authorizationHeader);

		if(info == null) return ResponseEntity.badRequest().build();

		double invest = info.getTotalInvested();
		UserInfo user = new UserInfo(info.getUsername(),info.getStocksHeld().values().toArray(),info.getHistory(),info.getTotal(),info.getTotalInvested());
		userService.saveUser(info);

		//return userinfo to front end as a DTO
		return ResponseEntity.ok(user);

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
