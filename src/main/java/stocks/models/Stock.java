package stocks.models;

import lombok.Data;
import stocks.controllers.StockController;

@Data
public class Stock {
	
	private String symbol;
	
	private double price;
	

}
