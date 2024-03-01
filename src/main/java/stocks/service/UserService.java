package stocks.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import stocks.models.User;
import stocks.repositories.UserRepository;

@Service
public class UserService {

	
	
	UserRepository users;
	
	public UserService(UserRepository users) {
		this.users = users;
	}
	
	
	
	public Optional<User> findUserByUsername(String username){
		return Optional.ofNullable(users.findByUsername(username));
	}
	
	public Optional<User> saveUser(User user) {
		return Optional.ofNullable(users.save(user));
	}
	
	public boolean deleteById(String id) {
		if(users.findById(id) == null) {
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
