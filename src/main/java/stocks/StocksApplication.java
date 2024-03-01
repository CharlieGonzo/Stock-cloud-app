package stocks;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import stocks.models.User;
import stocks.repositories.UserRepository;
import stocks.service.UserService;

@SpringBootApplication
public class StocksApplication{

	@Autowired
	UserService users;
	
	public static void main(String[] args) {
		SpringApplication.run(StocksApplication.class, args);
	}

	/*
	@Override
	public void run(String... args) throws Exception {
		User user = new User("hello","hi");
		Optional<User> use = users.saveUser(user);
		System.out.println(use.get());
		if(use.isEmpty()) {
			throw new RuntimeException("why");
		}
		
	}
	*/
	
	

	

}
