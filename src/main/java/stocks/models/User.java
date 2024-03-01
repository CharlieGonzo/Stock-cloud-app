package stocks.models;

import java.util.Collection;
import java.util.List;
import java.util.TreeSet;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Document(collection = "Users")
@Data
public class User{
	

	
	

	@Id
	private String id;
	
	private String username;
	
	private String password;
	
	private TreeSet<Stock> stocksHeld = new TreeSet<>();
	

	
	
	

	
	
	
	
	
	


}
