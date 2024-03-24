package stocks.models;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import stocks.controllers.StockController;

import java.io.IOException;

@Data
public class Stock {

	@Autowired
	private final StockController stockController;
	
	private String symbol;
	
	private double price;

	private int counter = 0;

	public void updatePrice() throws IOException {
		price  = stockController.getPrice(this.symbol);
	}
	

}
