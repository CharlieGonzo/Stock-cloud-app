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

  console.log(localStorage.getItem("token"));
  console.log(localStorage.getItem("sessionExpiration"));
  if (localStorage.getItem("token") == null) {
    return <Navigate to="/" />;
  }

  if (localStorage.getItem("sessionExpiration") != null) {
    if (Date.now >= parseInt(localStorage.getItem("sessionExpiration"))) {
      return <Navigate to="/" />;
    }
  }

  useEffect(() => {
    dispatch(setter(localStorage.getItem("token")));
    s = localStorage.getItem("token");
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

  return (
    <div className="login">
      <h1>Hi {user && user.username}</h1>
      <h3>stocks {user && user.stocks}</h3>
      <h3>total invested: {user && user.totalInvested}</h3>
      <h3>total money: {user && user.totalMoney}</h3>
      <button></button>
    </div>
  );
}

export default ProfilePage;
