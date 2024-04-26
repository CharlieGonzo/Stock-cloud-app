package stocks.models;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

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
	

	@Builder.Default
	private double totalMoney = 1000.00;
	

	private String password;
	
	@Builder.Default
	private HashMap<String,Stock> stocksHeld = new HashMap<>();

	@Builder.Default
	private LinkedList<StockHistoryStatement> history = new LinkedList<>();
	
	LocalDate createdAt;
	
	private Role role;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return Arrays.asList(new SimpleGrantedAuthority(role.name()));
	}
	

	public double getTotalInvested() throws IOException {
		double invest = 0;
		double preInvest = 0;
		for(String s: stocksHeld.keySet()) {
			Stock stock = stocksHeld.get(s);
			preInvest += stock.getPrice() * stock.getCounter();
			stock.updatePrice();
			invest += stocksHeld.get(s).getPrice() * stocksHeld.get(s).getCounter();
		}
		updateTotal(preInvest,invest);
		return invest;
	}
	
	public void updateTotal(double preInvest, double invest) {
		double difference = preInvest - invest;
		totalMoney -= difference;
		System.out.println(totalMoney);
	}

	public void updateTotal() throws IOException {
		double invest = getTotalInvested();
		double toSpend = totalMoney - invest;
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
