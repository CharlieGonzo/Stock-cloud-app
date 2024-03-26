import { useDispatch, useSelector } from "react-redux";
import { setter } from "../tokenSlice";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import "../style/home.css";
import { current } from "@reduxjs/toolkit";

function BuyPage(){
    const token = useSelector((state) => state.token.value);
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const[symbol,setSymbol] = useState('');
    const[stockPrice,setStockPrice] = useState('');
    const[companyName,setCompanyName] = useState('');
    const[currentSymbol,setCurrentSymbol] = useState('');
    const[update,setUpdate] = useState(false);
    

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };


    useEffect(() => {
      getInfo();
    },[])

   
    useEffect(() => {
      const intervalId = setInterval(() => {
        if(currentSymbol != ''){
          
          buy();
        }
       
      }, 5000); // 5000 milliseconds = 5 seconds
      return () => clearInterval(intervalId);
    });
  
   

    const getInfo = async () => {
      fetch("/api/user-info", {
        method: "GET",
        headers: headers,
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
          return response.json();
      }).then((data) => {
          console.log(data);
          setUser(data);
      }).catch((error) => {
          console.error("Error:", error); 
          localStorage.removeItem('token');
          localStorage.removeItem('sessionExpiration');
          window.location.href = "/";
      });
      };

    

      const buy = async ()=>{
        let s = "/stock/" + currentSymbol
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
            let a = data.split(',')
            if(a[8] != null){
            setCompanyName(a[7]+a[8])
            }else{
              setCompanyName(a[7])
            }
            setStockPrice(a[4]);
            setCurrentSymbol(symbol);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }

      const search = async ()=>{
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
            let a = data.split(',')
            console.log(a);
            if(a[8] != null){
            setCompanyName(a[7]+a[8])
            }else{
              setCompanyName(a[7])
            }
            setStockPrice(a[4]);
            setCurrentSymbol(symbol);
            setUpdate(true);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }


      const sell = async ()=>{
        
      }
      
      const ProfilePage =  () => {
        window.location.href = '/ProfilePage'
      }

      return <div className="login">
                <h1>Buy/Sell page</h1>
                <label htmlFor="symbol">Stock Symbol</label>
                <input id="symbol" type="text" onChange={(e) => setSymbol(e.target.value)}/>
                <h3>Total money available: {user && user.totalMoney}</h3>
                <h3>Total money invested: {user && user.totalInvested}</h3>
                <button onClick={search}>search</button>
                <button onClick={ProfilePage}>back to profile</button>
                {(stockPrice !== '' ) && <>
                  <h2>Stock Price {stockPrice}</h2>
                  <h2>Company Name: {companyName}</h2>
                  <h2>Company Symbol: {currentSymbol.toUpperCase()}</h2>
                  <div>
                    <div>
                      <input type="number" />
                      <button>buy</button>
                    </div>
                    <div>
                      <input type="number" />
                      <button>sell</button>
                      </div>
                    
                    
                  </div>
                  </>}
            </div>
      
    }

      export default BuyPage;
    
