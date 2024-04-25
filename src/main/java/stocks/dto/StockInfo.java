package stocks.dto;

import lombok.Data;

@Data
public class StockInfo {

	public String stockSymbol;
	
	public String stockPrice;
	
	public double totalAmountInPrice;
	
	public int amountOwned;
	
	
}
