package stocks.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import stocks.models.LoginCredentials;
import stocks.models.User;
import stocks.repositories.UserRepository;
import stocks.service.UserService;

@RestController
public class LoginController {
	
	@Autowired
	UserService userService;
	
	 @Autowired
	 private BCryptPasswordEncoder passwordEncoder;
	
	@PostMapping("/Register")
	public ResponseEntity<String> Register(@RequestBody LoginCredentials register){
		 // Hash the password
        String hashedPassword = passwordEncoder.encode(register.getPassword());
        
     
        
        User user = new User();
        user.setUsername(register.getUsername());
        user.setPassword(hashedPassword);
		
		Optional<User> userr = userService.saveUser(user);
		System.out.println(userr.isPresent());
		if(userr.isPresent()) {
			return ResponseEntity.ok("User registered!");
		}
		return ResponseEntity.badRequest().body("invalid info");
	}
	
	/*
	@PostMapping("/Login")
	public ResponseEntity<User> login(@RequestBody User user){
		String username = user.getUsername();
		String password = user.getPassword();
		

	}
	*/
	
	
	

}
