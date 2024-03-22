import { useDispatch, useSelector } from "react-redux";
import { setter } from "../tokenSlice";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import "../style/home.css";

function BuyPage(){
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
    

      const buy = async ()=>{

      }

      const sell = async ()=>{
        
      }

      return <div>
                <h1>Buy/Sell page</h1>
                <label htmlFor="symbol">Stock Symbol</label>
                <input id="symbol" type="text" />
                <h3>Total money available: {user && user.totalMoney}</h3>
                <h3>Total money invested: {user && user.totalinvested}</h3>
                <button onClick={buy}>buy</button>
                <button onClick={sell}>sell</button>
            </div>
      
    }

      export default BuyPage;
    
