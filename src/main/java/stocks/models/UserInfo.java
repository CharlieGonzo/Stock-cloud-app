package stocks.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.TreeSet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Data
public class UserInfo {
	
	private String username;
	
	private Object[] stocks;
	
	private double totalMoney;
	
	private double totalInvested;
}
