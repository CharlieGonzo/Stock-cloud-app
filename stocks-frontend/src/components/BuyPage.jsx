import { useDispatch, useSelector } from "react-redux";
import { setter } from "../tokenSlice";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import "../style/home.css";

function BuyPage(){
    const token = useSelector((state) => state.token.value);
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const[symbol,setSymbol] = useState('');
    const[stock,setStock] = useState('');

    useEffect(() => {
      getInfo();
    },[])

    

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
          })
          .catch((error) => {
            
            console.error("Error:", error);
           
          });
      };

    

      const buy = async ()=>{
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem('token'),
        };
        let s = "/stock/" + symbol
        fetch(s, {
          method: "GET",
          headers: headers,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.text();
          })
          .then((data) => {
            console.log(data);
            setStock(data);
          })
          .catch((error) => {
            dispatch(setter(""));
            localStorage.removeItem("token");
            localStorage.removeItem("sessionExpiration");
            window.location.href = "/"; // Redirect using window.location
            console.error("Error:", error);
          });
      }

      const sell = async ()=>{
        
      }

      return <div>
                <h1>Buy/Sell page</h1>
                <label htmlFor="symbol">Stock Symbol</label>
                <input id="symbol" type="text" onChange={(e) => setSymbol(e.target.value)}/>
                <h3>Total money available: {user && user.totalMoney}</h3>
                <h3>Total money invested: {user && user.totalInvested}</h3>
                <button onClick={buy}>search</button>
                {(stock !== '' ) && <div>
                  <h3>{stock}</h3>
                  <button>buy</button>
                  <button>sell</button>
                  </div>}
            </div>
      
    }

      export default BuyPage;
    
