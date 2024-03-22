import { useDispatch, useSelector } from "react-redux";
import { setter } from "../tokenSlice";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import "../style/home.css";

function ProfilePage() {
  const token = useSelector((state) => state.token.value);
  let s = "";
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token == '') {
      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("sessionExpiration"));
      if (localStorage.getItem("token") == null) {
        window.location.href = "/"; // Redirect using window.location
      }
      if (localStorage.getItem("sessionExpiration") != null) {
        if (Date.now >= parseInt(localStorage.getItem("sessionExpiration"))) {
          logout();
        }
      }
      dispatch(setter(localStorage.getItem("token")));
    }
    if (token != "") {
      s = token;
    } else {
      s = localStorage.getItem("token");
    }
    getInfo();
  }, []);

  const getInfo = async () => {
    console.log(s);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + s,
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function logout() {
    dispatch(setter(""));
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
      <h3>stocks {user && user.stocks}</h3>
      <h3>total invested: {user && user.totalInvested}</h3>
      <h3>total money: {user && user.totalMoney}</h3>
      <button onClick={goToBuyPage}>Buy Stock</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default ProfilePage;
