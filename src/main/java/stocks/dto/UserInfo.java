package stocks.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.TreeSet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import stocks.models.StockHistoryStatement;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Data
public class UserInfo {
	
	private String username;
	
	private Object[] stocks;

	private LinkedList<StockHistoryStatement> history;
	
	private double totalMoney;
	
	private double totalInvested;
}
