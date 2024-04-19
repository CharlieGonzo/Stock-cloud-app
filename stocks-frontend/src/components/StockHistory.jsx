import { useEffect } from "react";
import { useState } from "react";
import "../style/home.css";

const StockHistory = () => {
    const [history,setHistory] = useState([])

    useEffect(() => {
        getHistory();
    },[])


    const getHistory = async () => {
        const header = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          };

        fetch("/api/user-history",{
            method: "GET",
            headers: header,
        }).then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        }).then(data => {
            console.log(data);
            setHistory(data)
        })
    }


    return(
        <div className="login">
            {history && history.map((historyStatement) => {
                return(
                
                <ul key={historyStatement.userid}>
                    <li><h2>Company Symbol: {historyStatement.symbol} Transaction Date: {historyStatement.date} Type of Transaction: {historyStatement.sell==false && (<p>sell</p>)}</h2></li>
                </ul>
            
                )
            })}
        </div>
    )

}

export default StockHistory;