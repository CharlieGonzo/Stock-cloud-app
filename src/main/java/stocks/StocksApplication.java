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


	
	

	

}
