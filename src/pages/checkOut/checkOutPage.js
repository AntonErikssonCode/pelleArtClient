import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import "./checkOutPage.css";
import CheckOutItem from "./checkOutItem";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-solid.svg";
import axios from "axios";
function CheckOutPage(props) {
  const [price, setPrice] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const checkmark = "&#100004;";
  const URL = "https://pelle-art-bb0b92a8bfe3.herokuapp.com"; //http://localhost:8800
  useEffect(() => {
    let totalPrice = 0;
    props.cart.forEach((art) => {
      if (art.type == "lithography") {
        totalPrice += art.lithographyPrice * art.amount;
      } else {
        totalPrice += art.price;
      }
    });
    setPrice(totalPrice);
  }, [props.cart]);

  const handlePaymentButtonClick = async () => {
    try {
      await Promise.all(
        props.cart.map(async (artPiece) => {
          let newAmount = artPiece.amountLeft -artPiece.amount;
          await axios.put(`${URL}/art/${artPiece.id}`, { newAmount: newAmount, type: artPiece.type });

        })
      );
    } catch (error) {
      console.log(error);
    }

    // Show the overlay
    setShowOverlay(true);

    // Reset the overlay after the animation ends
    setTimeout(() => {
      setShowOverlay(false);
      props.clearCart();
    }, 1500);
  };
 

  if (props.cart.length == 0) {
    return (
      <div>
        <Header cart={props.cart} />
        <h2 className="pageTitle">Check Out</h2>

        <div className="checkOut">
          <div className="divider"></div>
          <h5>Empty</h5>

          <div className="divider"></div>
        </div>
      </div>
    );
  }
  if (props.cart.length > 0) {
    return (
      <div>
        <Header cart={props.cart} />
        <h2 className="pageTitle">Check Out</h2>

        <div className="checkOut">
          <div className="divider"></div>
          {props.cart.map((artPiece) => {
            return (
              <React.Fragment key={artPiece.title + artPiece.type}>
                <CheckOutItem
                  key={artPiece.title}
                  artPiece={artPiece}
                  removeItemFromCart={props.removeItemFromCart}
                  removeLithographyFromCart={props.removeLithographyFromCart}
                  removeOriginalFromCart={props.removeOriginalFromCart}
  
                />
              </React.Fragment>
            );
          })}
          <div className="divider"></div>
          <div className="payment-container">
            <p>{"Total: "}</p>
            
            <p>{price + "kr"}</p>
          </div>
          <div className={`overlay ${showOverlay ? "active" : ""}`}>
            <div className={`overlay-content ${showOverlay ? "active" : ""}`}>
              <CheckIcon
                className={`checkMark ${showOverlay ? "active" : ""}`}
              />
            </div>
          </div>
          <button className="payment-button" onClick={handlePaymentButtonClick}>
            Go To Payment
          </button>
        </div>
      </div>
    );
  }
}

export default CheckOutPage;
