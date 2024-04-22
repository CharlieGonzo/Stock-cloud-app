import { useEffect, useState } from "react";
import "../style/buyPage.css";

function BuyPage() {
  const [user, setUser] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [stocksList, setStocksList] = useState([]);
  const [stockPrice, setStockPrice] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [error, setError] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getInfo();
      if (currentSymbol != "") {
        search();
      }
    }, 5000); // 5000 milliseconds = 5 seconds
    return () => clearInterval(intervalId);
  });

  const getInfo = async () => {
    fetch("/api/user-info", {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
        setStocksList(data.stocks);
      })
      .catch((error) => {
        console.error("Error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("sessionExpiration");
        window.location.href = "/";
      });
  };

  const buy = async () => {
    let s = "/api/buy/" + currentSymbol + "/" + buyAmount;
    console.log("here");
    fetch(s, {
      method: "Get",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        return response.json;
      })
      .then((data) => {
        getInfo();
      })
      .catch((e) => {
        console.error("Error:", e);
        setError(true);
      });
  };

  const search = async () => {
    let s = "/stock/" + symbol;
    fetch(s, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        let a = data.split(",");
        if (a[8] != null) {
          setCompanyName(a[7] + a[8]);
        } else {
          setCompanyName(a[7]);
        }
        setStockPrice(a[4]);
        setCurrentSymbol(symbol);
        if (error) setError(false);
      })
      .catch((error) => {
        setError(true);
        console.error("Error:", error);
      });
  };

  const sell = async () => {
    let s = "/api/sell/" + currentSymbol + "/" + sellAmount;
    console.log("here");
    fetch(s, {
      method: "Get",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        return response.json;
      })
      .then((data) => {
        getInfo();
      })
      .catch((e) => {
        console.error("Error:", e);
        setError(true);
      });
  };

  const ProfilePage = () => {
    window.location.href = "/ProfilePage";
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Buy/Sell Page</h1>
        <div className="buttons">
          <button onClick={() => search()}>Search</button>
          <button onClick={() => ProfilePage()}>Back to Profile</button>
        </div>
      </div>
      <div className="content">
        <div className="form-group">
          <label htmlFor="symbol">Stock Symbol</label>
          <input
            id="symbol"
            type="text"
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>
        <div className="info">
          <h2>
            Total Invested: $
            {user && <b>{Math.round(user.totalInvested * 100) / 100}</b>}
          </h2>
          <h2>Total Money: ${user && <b>{user.totalMoney}</b>}</h2>
          <h2>
            Total to Spend: $
            {user && (
              <b>
                {Math.round((user.totalMoney - user.totalInvested) * 100) / 100}
              </b>
            )}
          </h2>
        </div>
        <div className="stocks">
          <h2>Stocks</h2>
          {stocksList &&
            stocksList.map((stock) => (
              <div key={stock.symbol}>
                <p>
                  {stock.symbol} count: {stock.counter} Price per:{" "}
                  {Math.round(stock.price * 100) / 100} Total:{" "}
                  {Math.round(stock.price * stock.counter * 100) / 100}
                </p>
              </div>
            ))}
        </div>

        {stockPrice !== "" && (
          <>
            <div className="info">
              <h2>Stock Price: {stockPrice}</h2>
              <h2>Company Name: {companyName}</h2>
              <h2>Company Symbol: {currentSymbol.toUpperCase()}</h2>
            </div>
            <div className="actions">
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Amount to Buy"
                  onChange={(e) => setBuyAmount(Math.max(0, e.target.value))}
                  min={0}
                />
                <button onClick={buy}>Buy</button>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Amount to Sell"
                  onChange={(e) => setSellAmount(Math.max(0, e.target.value))}
                  min={0}
                />
                <button onClick={sell}>Sell</button>
              </div>
            </div>
          </>
        )}
      </div>
      {error && (
        <p className="error">
          Error has occurred. Check the information you entered to see if it is
          correct.
        </p>
      )}
    </div>
  );
}

export default BuyPage;
