import { useEffect, useState } from "react";
import "../style/home.css";

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
      .then((data) => {getInfo()})
      .catch((e) => {
        console.error("Error:", e);
        setError(true);
      });
  };

  const ProfilePage = () => {
    window.location.href = "/ProfilePage";
  };

  return (
    <div className="login">
      <h1>Buy/Sell page</h1>
      <label htmlFor="symbol">Stock Symbol</label>
      <input
        id="symbol"
        type="text"
        onChange={(e) => setSymbol(e.target.value)}
      />
      <h3>
        total invested:{" "}
        {user && <b>${Math.round(user.totalInvested * 100) / 100}</b>}
      </h3>
      <h3>
        total money: {user && <b>${Math.round(user.totalMoney * 1000) / 1000}</b>}
      </h3>
      <h3>
        total to Spend:{" "}
        {user && (
          <b>
            ${Math.round((user.totalMoney - user.totalInvested) * 100) / 100}
          </b>
        )}
      </h3>
      <h3>
        Stocks{" "}
        {stocksList &&
          stocksList.map((stock) => {
            return (
              <ul key={stock.symbol}>
                <li>
                  {stock.symbol} count: {stock.counter} Price per:{" "}
                  {Math.round(stock.price * 100) / 100} Total :{" "}
                  {Math.round(stock.price * stock.counter * 100) / 100}
                </li>
              </ul>
            );
          })}
      </h3>
      <button onClick={() => search()}>search</button>
      <button onClick={() => ProfilePage()}>back to profile</button>
      {error && (
        <p>error has occured. Check info you entered to see if it is correct</p>
      )}
      {stockPrice !== "" && (
        <>
          <h2>Stock Price {stockPrice}</h2>
          <h2>Company Name: {companyName}</h2>
          <h2>Company Symbol: {currentSymbol.toUpperCase()}</h2>
          <div>
            <div>
              <input
                type="number"
                onChange={(e) => setBuyAmount(e.target.value)}
              />
              <button onClick={buy}>buy</button>
            </div>
            <div>
              <input
                type="number"
                onChange={(e) => setSellAmount(e.target.value)}
              />
              <button onClick={sell}>sell</button>
            </div>
            <div></div>
          </div>
        </>
      )}
    </div>
  );
}

export default BuyPage;
