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
	public JwtAuthenticationResponse Register(@RequestBody LoginCredentials register){
        return service.signUp(register);
	}
	
	
	@PostMapping("/Login")
	public JwtAuthenticationResponse login(@RequestBody LoginCredentials user){
		return service.signIn(user);
	}

	@GetMapping("/user-info")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<User> getUserInfo(@RequestHeader("Authorization") String authorizationHeader) {
		// Extract the JWT token from the Authorization header
		String jwtToken = authorizationHeader.substring(7); // Assuming Bearer token format

		// Extract the username from the JWT token
		String username = jService.extractUserName(jwtToken);
		System.out.println((username));

		// Fetch the user information from the database
		Optional<User> user = userService.findUserByUsername(username);
		return user.map(value -> ResponseEntity.ok().body(value))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}


	
	
	
	

}
