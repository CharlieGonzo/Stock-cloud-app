package stocks.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import stocks.models.User;
import stocks.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

	@Autowired
	private UserRepository users;
	
	
	
	public UserDetailsService userDetailsService() {
		return new UserDetailsService() {
			
			  @Override
	          public UserDetails loadUserByUsername(String username) {
	              return users.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
	          }
	      };
	}
	
	
	public Optional<User> findUserByUsername(String username){
		return users.findByUsername(username);
	}
	
	public User saveUser(User user) {

		if(user.getId() == null) {
			user.setCreatedAt(LocalDate.now());
		} else {
			// Check if the user exists in the database
			User existingUser = users.findById(user.getId()).orElse(null);
			if (existingUser != null) {
				existingUser.setUsername(user.getUsername());
				existingUser.setPassword(user.getPassword());
				existingUser.setRole(user.getRole());
				existingUser.setId(user.getId());
				existingUser.setStocksHeld(user.getStocksHeld());
				existingUser.setCreatedAt(user.getCreatedAt());
				existingUser.setTotalMoney(user.getTotalMoney());



				return users.save(existingUser);
			}
		}
		return users.save(user);
	}
	
	public boolean deleteById(String id) {
		Optional<User> user = users.findById(id);
		if(user.isEmpty()) {
			return false;
		}
		users.deleteById(id);
		return true;
	}
	
	public boolean deleteByUsername(String username) {
		if(users.findByUsername(username) == null) {
			return false;
		}
		users.deleteByUsername(username);
		
		return true;
	}
	
	
	
}
