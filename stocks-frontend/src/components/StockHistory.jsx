import { useEffect } from "react";
import { useState } from "react";
import "../style/history.css";

const StockHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    const header = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    fetch("/api/user-history", {
      method: "GET",
      headers: header,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setHistory(data);
      });
  };

  return (
    <div className="container">
      {history &&
        history.map((historyStatement) => (
          <div key={historyStatement.userid} className="transaction">
            <h2>Company Symbol: {historyStatement.symbol}</h2>
            <p>Transaction Date: {historyStatement.date}</p>
            <p>
              Type of Transaction:{" "}
              <span className={historyStatement.sell ? "sell" : "buy"}>
                {historyStatement.sell ? "Sell" : "Buy"}
              </span>
            </p>
          </div>
        ))}
      <button
        onClick={() => {
          window.location.href = "/ProfilePage";
        }}
      >
        Return to profile page
      </button>
    </div>
  );
};

export default StockHistory;
