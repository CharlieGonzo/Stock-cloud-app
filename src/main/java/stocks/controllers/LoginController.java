package stocks.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import stocks.dto.JwtAuthenticationResponse;
import stocks.models.LoginCredentials;
import stocks.models.User;
import stocks.repositories.UserRepository;
import stocks.service.AuthenticationService;
import stocks.service.UserService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {
	
	@Autowired
	private final AuthenticationService service;
	
	@PostMapping("/Register")
	public JwtAuthenticationResponse Register(@RequestBody LoginCredentials register){
		System.out.println("here");
        return service.signUp(register);
	}
	
	
	@PostMapping("/Login")
	public JwtAuthenticationResponse login(@RequestBody LoginCredentials user){
		System.out.println(user);
		return service.signIn(user);
		
		

	}
	
	
	
	

}
