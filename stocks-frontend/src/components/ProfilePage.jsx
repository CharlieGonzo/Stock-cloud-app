import { useEffect, useState } from "react";
import "../style/home.css";

function ProfilePage() {
  const [stockList, setStockList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getInfo();
    }, 5000); // 5000 milliseconds = 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  const getInfo = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

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
        setStockList(data.stocks);
      })
      .catch((error) => {
        console.error("Error:", error);
        // logout();
      });
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionExpiration");
    window.location.href = "/"; // Redirect using window.location
  }

  function goToBuyPage() {
    window.location.href = "/BuyPage"; // Redirect using window.location
  }

  return (
    <div className="login">
      <h1>Hi {user && user.username}</h1>
      <h3>
        stocks{" "}
        {stockList &&
          stockList.map((stock) => {
            return (
              <ul key={stock.symbol}>
                <li>
                  {stock.symbol} price:
                  {<b>${Math.round(stock.price * 100) / 100}</b>} count:
                  {stock.counter} <br />
                  total: {stock.price * stock.counter}
                </li>
              </ul>
            );
          })}
      </h3>
      <h3>
        total invested:{" "}
        {user && <b>${Math.round(user.totalInvested * 100) / 100}</b>}
      </h3>
      <h3>
        total money: {user && <b>${Math.round(user.totalMoney * 100) / 100}</b>}
      </h3>
      <h3>
        total to Spend:{" "}
        {user && (
          <b>
            ${Math.round((user.totalMoney - user.totalInvested) * 100) / 100}
          </b>
        )}
      </h3>
      <button onClick={goToBuyPage}>Buy Stock</button>
      <button onClick={() => (window.location.href = "/StockHistory")}>
        History page
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default ProfilePage;
