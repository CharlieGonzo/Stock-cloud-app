package stocks.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
public class StockHistoryStatement {

    private String symbol;

    private int amountBoughtOrSold;

    private boolean isSell;

    LocalDate date;



}
