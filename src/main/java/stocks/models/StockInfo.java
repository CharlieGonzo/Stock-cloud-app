package stocks.models;

import lombok.Data;

@Data
public class StockInfo {

	public String stockSymbol;
	
	public String stockPrice;
	
	public double totalAmountInPrice;
	
	public int amountOwned;
	
	
}
