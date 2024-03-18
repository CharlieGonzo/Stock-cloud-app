package stocks.Utilities;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;


/**
 * This class holds one method. The only purpose of this class is to translate company symbols to their full company's name
 * @author Charles Gonzalez Jr
 */
public class SymbolToNameTranslator {
	

	private SymbolToNameTranslator() {}
	
	/**
	 * This method is a static method that takes the symbol of a company and will translate it to a full company name.
	 * It does this by performing an HTML scrape on the URL path provided by the translateUrl variable.
	 * @param symbol the symbol of the company
	 * @return returns the full company name in a String object
	 * @throws IOException
	 */
	public static String TranslateToCompanyName(String symbol) throws IOException {
	
		symbol = symbol.toLowerCase();
		
		//create variables containing URL path to a website being HTML scraped
		String translateUrl = "https://stockanalysis.com/stocks/" + symbol + "/";
		
		//The company name that is eventually going to be updated and returned(hopefully)
		String title = "";
		
		
		//Create URL object that allows us to access HTML content
		URL url = new URL(translateUrl);
		BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
		
		//runs through HTML content using a BufferedReader object. If the reader finds a line that contains "title"
		//it will find where the company's title is by already know which index it starts at
		String inputLine;
		while ((inputLine = in.readLine()) != null){
			if(inputLine.contains("title")){
				for(int i = 82;i<inputLine.length();i++){
					if(inputLine.charAt(i) != '('){
						System.out.println(inputLine.charAt(i));
						//keeps adding characters until company name is done
						title = title+=inputLine.charAt(i);
						
					}else{
						break;
					}
				}
				break;
			}
		}
		
		
		in.close();

		
	    return title;

	}
	

}


