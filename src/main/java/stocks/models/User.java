package stocks.models;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.TreeSet;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Document(collection = "Users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Data
public class User implements UserDetails{



	@Id
	private String id;
	
	private String username;
	

	private double totalMoney = 1000;
	

	private String password;
	
	@Builder.Default
	private TreeSet<Stock> stocksHeld = new TreeSet<>();
	
	LocalDate createdAt;
	
	private Role role;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return Arrays.asList(new SimpleGrantedAuthority(role.name()));
	}
	
	public double getTotalInvested() throws IOException {
		double invest = 0;
		for(Stock s:stocksHeld) {
			s.updatePrice();

			invest += s.getPrice() * s.getCounter();
		}

		return invest;
	}

	public void updateTotal() throws IOException {
		double invest = getTotalInvested();
		double toSpend = totalMoney - getTotalInvested();
		totalMoney = invest + toSpend;
	}

	public double getTotal() throws IOException {
		return totalMoney;
	}
	

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	
	

	
	
	

	
	
	
	
	
	


}
