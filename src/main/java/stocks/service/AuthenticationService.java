package stocks.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import stocks.dto.JwtAuthenticationResponse;
import stocks.models.LoginCredentials;
import stocks.models.Role;
import stocks.models.User;
import stocks.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	
	private final UserRepository userRepository;
  
	
  	private final UserService userService;
  
	
	private final PasswordEncoder passwordEncoder;
  
	
	private final JwtService jwtService;
  
	
	private final AuthenticationManager authenticationManager;

	  public JwtAuthenticationResponse signUp(LoginCredentials request) {
	      User user = new User();
	      System.out.println(request.getUsername());
	      user.setUsername(request.getUsername());
	      user.setPassword(passwordEncoder.encode(request.getPassword()));
	      user.setRole(Role.ROLE_USER);

	      user = userService.saveUser(user);
	      var jwt = jwtService.generateToken(user);
	      return JwtAuthenticationResponse.builder().token(jwt).build();
	  }
	
	
	  public JwtAuthenticationResponse signIn(LoginCredentials request) {

	      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));
	      var user = userRepository.findByUsername(request.getUsername())
	              .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
	      var jwt = jwtService.generateToken(user);

	      return JwtAuthenticationResponse.builder().token(jwt).build();
	  }

  
}
