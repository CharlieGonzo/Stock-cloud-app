package stocks.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.Date;

@Data
public class StockHistoryStatement {


    @Id
   private static long id = 0;

   private long userid;

    private String username;

    private String symbol;

    private int amountBoughtOrSold;

    private boolean isSell;

    LocalDate date;

    public StockHistoryStatement(String username, String symbol, int amountBoughtOrSold, boolean isSell, LocalDate date) {
        userid = id++;
        this.username = username;
        this.symbol = symbol;
        this.amountBoughtOrSold = amountBoughtOrSold;
        this.isSell = isSell;
        this.date = date;
    }
}
