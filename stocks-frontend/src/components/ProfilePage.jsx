import { useDispatch, useSelector } from "react-redux";
import { setter } from "../tokenSlice";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import "../style/home.css";

function ProfilePage() {
  let s = "";
  const [stockList,setStockList] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    console.log(s);
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
        //logout();
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
      <h3>stocks {stockList && stockList.map((stock) => {
        return (
          <ul key={stock.symbol}>
            <li>{stock.symbol} price:{stock.price} count:{stock.counter}</li>
          
          </ul>
        )
      })}</h3>
      <h3>total invested: {user && user.totalInvested}</h3>
      <h3>total money: {user && user.totalMoney}</h3>
      <h3>total to Spend: {user && user.totalMoney - user.totalInvested}</h3>
      <button onClick={goToBuyPage}>Buy Stock</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default ProfilePage;
