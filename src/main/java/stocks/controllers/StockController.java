package stocks.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import stocks.Utilities.SymbolToNameTranslator;
import stocks.models.Stock;


/**
 * This class acts as a type of API to gather data about the {@link Stock} in our application. It does this by Receiving CSV files from Yahoo finance,
 * and then parses that data to allow access to specific date for a {@link Stock}. This class can also access the history of a stock from all the way back to 1970
 * @author Charles Gonzalez Jr
 */
@RestController
@RequestMapping("/stock")
public class StockController{
	
	
	/**
	 * This method creates a Get request that obtains stock info based on the companies symbol.
	 * @param stockSymbol the symbol being used to know which company stock to look for(going to change the return type to a stock object)
	 * @return An array if string consists of specific info about the Stock
	 * @throws IOException
	 */
	@GetMapping("/{stockSymbol}")
	public ResponseEntity<String> getStockInfo(@PathVariable String stockSymbol) throws IOException {
		
		/*This URL path to obtain CSV file from Yahoo Finance
		 * We use the the stock symbol to find what stock info we want, and we use the current time method to get the most recent data
		 */
		String stockUrl = "https://query1.finance.yahoo.com/v7/finance/download/" + stockSymbol + "?period1=" + this.getCurrentTime() 
		+ "&period2=" + this.getCurrentTime() + "&interval=1d&events=history&includeAdjustedClose=true";

		  
		//creates URL object that downloads CSV File
		URL oracle = null;
		BufferedReader in = null;
		try {
				oracle = new URL(stockUrl);
				in = new BufferedReader(new InputStreamReader(oracle.openStream()));
	     	} catch (Exception e) {

				try {
					stockUrl = "https://query1.finance.yahoo.com/v7/finance/download/" + stockSymbol + "?period1=" + (this.getCurrentTime()-86400)
							+ "&period2=" + (this.getCurrentTime()-86400) + "&interval=1d&events=history&includeAdjustedClose=true";
					oracle = new URL(stockUrl);
					in = new BufferedReader(new InputStreamReader(oracle.openStream()));
				} catch (MalformedURLException ignored) {
					return ResponseEntity.badRequest().build();
				}
		}

		//runs through all the lines of the CSV file and if it line containing the word "Date"  we know it contains the current info
		//of the stock we are searching for
	    String stockInfo;
	    while ((stockInfo = in.readLine()) != null)
	     		if (!stockInfo.contains("Date")) {
	     			return ResponseEntity.ok(stockInfo + ", " +  SymbolToNameTranslator.TranslateToCompanyName(stockSymbol));
				 }

	   return ResponseEntity.badRequest().build();
	        		
	}
	
	


	public double getPrice(String symbol) throws IOException {
		String s = this.getStockInfo(symbol).getBody();
		return Double.parseDouble(s.split(",")[4]);
	}


	
	
	
	/**
	 * this method gets current time and returns it as a long
	 * @return the current time
	 */
	public long getCurrentTime(){
	       Calendar cal = Calendar.getInstance();
	       cal.set(LocalDate.now().getYear(), LocalDate.now().getMonthValue() - 1, LocalDate.now().getDayOfMonth());
	       Date currentDate = cal.getTime();
	       return currentDate.getTime() / 1000;
	}
	 
	
	
}
