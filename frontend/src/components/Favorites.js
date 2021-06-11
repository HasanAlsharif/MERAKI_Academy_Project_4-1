import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ShowRating from "./ShowRating";
import {AiFillDelete} from "react-icons/ai"

export default function Favorites({ token }) {
  const [result, setResult] = useState([]);
  const [info, setInfo] = useState([]);

  let thisToken = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:5000/favorites", {
        headers: {
          Authorization: "Bearer " + thisToken,
        },
      })
      .then((response) => {
        setResult(response.data);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [info]);
  const products = result.map((element, i) => {
    const idProduct = element._id;

    return (
      
      <div
        className="card"
        
      >
        <div className="card-image" onClick={() => {
          history.push(`product/${element._id}`);
        }}>
          <img src={element.img} />
        </div>

        <div className="rating"></div>

        <div className="card-description">
        <ShowRating rate={Math.round(element.averageRating)} />
          <p className="nameProduct">Name:{element.name}</p>
          <p className="PriceProduct">Price:{element.price}</p>
          <AiFillDelete size ={27} onClick={() => {
            console.log(idProduct);
axios
.put(
  "http://localhost:5000/favorites",

  {
    productId:idProduct ,
  },
  {
    headers: {
      authorization: "Bearer " + thisToken,
    },
  }
)
.then((result) => {
  setInfo(Math.random());
})
.catch((err) => {
  console.log(err);
});  }}/>
        </div>
      </div>
    );
  });

  return(  <div> 
    <div className="small-container" > <h2>My WishList</h2> </div>
        {result.length !=0 ?  <div className="category">{products}</div>  : <div className="small-container"> <h4>You don't have any product </h4> </div>}
        
  </div>   )
}
