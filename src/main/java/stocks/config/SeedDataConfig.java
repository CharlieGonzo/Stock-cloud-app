package stocks.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import stocks.models.Role;
import stocks.models.User;
import stocks.repositories.UserRepository;
import stocks.service.UserService;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeedDataConfig implements CommandLineRunner {

	@Autowired
    private final UserRepository userRepository;
	
	@Autowired
    private final PasswordEncoder passwordEncoder;
	
	@Autowired
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {

        //always have an admin user in database
      if (userRepository.count() == 0) {

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("Admin"));
        admin.setRole(Role.ROLE_ADMIN);
        
        System.out.println(admin);
        userService.saveUser(admin);
        log.debug("created ADMIN user - {}", admin);
      }
    }

}
