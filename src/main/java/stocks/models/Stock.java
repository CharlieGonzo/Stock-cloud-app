package stocks.models;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import stocks.controllers.StockController;

import java.io.IOException;

@Data
public class Stock implements Comparable<Stock>{

	@Autowired
	private final StockController stockController;
	
	private String symbol;
	
	private double price;

	private int counter = 0;
	
	public Stock() {
		stockController = new StockController();
	}	
	public int getAmountOfstock() {
		return counter;
	}
	
	public void buy(int amountBought) {
		counter = counter + amountBought;
	}

	public void updatePrice() throws IOException {
		price  = stockController.getPrice(this.symbol);
	}

	public double totalAmount(){
		return price * counter;
	}

	@Override
	public int compareTo(Stock o) {
		
		if(o.getSymbol().equals(this.getSymbol())) {
			return 0;
		}
		if(o.getSymbol().charAt(0) > this.getSymbol().charAt(0)) {
			return 1;
		}
		
		return 1;
	}

	

	
	
	
	

}
