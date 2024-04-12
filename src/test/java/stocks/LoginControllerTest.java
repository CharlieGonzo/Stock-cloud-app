package stocks;


import static org.hamcrest.CoreMatchers.any;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import stocks.controllers.UserController;
import stocks.models.User;
import stocks.repositories.UserRepository;
import stocks.service.UserService;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
public class LoginControllerTest {
	
	@Autowired
	MockMvc mock;
	
	@Autowired
	UserService service;
	
	@Autowired
	BCryptPasswordEncoder encoder;
	
	@AfterEach
	public void cleanUp() {
		System.out.println(service.deleteByUsername("testUser"));
	}
	
	
	
	@Test
	@WithMockUser(roles = "USER")
	public void LoginTest() throws Exception {
		// Prepare a valid User object as JSON
        String userJson = "{\"username\":\"testUser\", \"password\":\"testPassword\"}";

        // Perform POST request to /Login endpoint with JSON payload
        mock.perform(MockMvcRequestBuilders.post("/api/Register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print());// Print response for debugging
 
        
	}
	
	

}
