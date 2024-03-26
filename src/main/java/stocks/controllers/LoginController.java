package stocks.controllers;

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
import stocks.models.LoginCredentials;
import stocks.models.Role;
import stocks.models.User;
import stocks.models.UserInfo;
import stocks.repositories.UserRepository;
import stocks.service.AuthenticationService;
import stocks.service.JwtService;
import stocks.service.UserService;

import javax.swing.text.html.Option;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {
	
	@Autowired
	private final AuthenticationService service;

	@Autowired
	private final JwtService jService;

	@Autowired
	private final UserService userService;
	
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

	@GetMapping("/user-info")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<UserInfo> getUserInfo(@RequestHeader("Authorization") String authorizationHeader) {
		// Extract the JWT token from the Authorization header
		String jwtToken = authorizationHeader.substring(7); // Assuming Bearer token format

		// Extract the username from the JWT token
		String username = jService.extractUserName(jwtToken);
		
		//create Optional object that finds if user is available
		Optional<User> user = userService.findUserByUsername(username);
		
		//if user is present, returns only info that front end needs. Otherwise, send badRequest()
		if(user.isPresent()) {
			//only send back what we need
			UserInfo userInfo = new UserInfo(user.get().getUsername(),user.get().getStocksHeld(),user.get().getTotalMoney(),user.get().getTotalInvested());
			return ResponseEntity.ok(userInfo);
		}else {
			return ResponseEntity.badRequest().build();
		}
		
		
	}


	
	
	
	

}
