package stocks;



import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;


import stocks.controllers.StockController;

@WebMvcTest(StockController.class)
@AutoConfigureMockMvc
public class StockControllerTest {
	
	@Autowired
	MockMvc mock;
	
	@Test
	@WithMockUser
	public void testApi() {
		/*
		 * this test first checks if the end point returns a status code 200
		 * then after that, it checks if the type of content is JSON. this should be true becuase this 
		 * application is using a rest controller. After we check if the return type is an array. This is because
		 * this endpoint sends back an array of strings. finally it prints out the information  
		 */
		try {
			mock.perform(get("/stock/msft"))
			.andExpect(status().isOk())
			.andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andDo(print());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
	
	}
}
