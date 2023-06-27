import React, { useState, useRef, useEffect } from "react";
import "./artPiece.css";
import { Link, useLocation } from "react-router-dom";

function ArtPiece(props) {
  const componentRef = useRef();

  const assetsPath = process.env.PUBLIC_URL + "/assets/";
  const expanded = props.expanded;
  const [availablity, setAvailablity] = useState("");
  const [amountOfLithography, setAmountOfLithography] = useState(1);

  useEffect(() => {
    const { sold, amountTotal, amountLeft } = props.data;

    const originalAvailable = !sold;
    const lithographyAvailable = amountLeft > 0;
    const isSold = !lithographyAvailable && !originalAvailable;

    let availabilityText = "";

    if (originalAvailable && lithographyAvailable) {
      availabilityText = "Original and Lithography ";
    } else if (originalAvailable) {
      availabilityText = "Original ";
    } else if (lithographyAvailable) {
      availabilityText = "Lithography ";
    } else {
      availabilityText = "Sold";
    }

    setAvailablity(availabilityText);
  }, [props.cart]);

  const [originalIsInCart, setOriginalIsInCart] = useState(false);
  const [lithographyIsInCart, setLithographyIsInCart] = useState(false);
  const [totalCartLength, setTotalCartLength] = useState(0);

  const handleExpand = () => {
    props.handleSetExpandIndex(props.index);
    window.scrollTo(0, 0);
  };
  const handleClose = () => {
    props.handleSetExpandIndex(null);
  };

  const handlePrevIndex = () => {
    let index = props.index - 1;

    if (index < 0) {
      index = props.artArrayLength - 1;
    }
    props.handleSetExpandIndex(index);
    window.scrollTo(0, 0);
  };

  const handleNextIndex = () => {
    let index = props.index + 1;

    if (index > props.artArrayLength - 1) {
      index = 0;
    }
    props.handleSetExpandIndex(index);
    window.scrollTo(0, 0);
  };

  const handleAddOriginalToCart = () => {
    /*  props.addItemToCart(props.data); */

    const updatedData = {
      ...props.data,
      amount: 1, // Example value for the "amount" property
      type: "original", // Example value for the "type" property
    };

    props.addItemToCart(updatedData);
  };
  const handleAddLithographyToCart = () => {
    /*  props.addItemToCart(props.data); */

    const updatedData = {
      ...props.data,
      amount: amountOfLithography, // Example value for the "amount" property
      type: "lithography", // Example value for the "type" property
    };

    props.addItemToCart(updatedData);
  };

  const decrementLithography = () => {
    let amount = amountOfLithography - 1;
    if (amount <=1) {
      amount = 1;
    }

    setAmountOfLithography(amount);
  };
  const incrementLithography = () => {
    let amount = amountOfLithography + 1;
    if (amount > props.data.amountLeft) {
      amount -= 1;
    }
    setAmountOfLithography(amount);
  };

  const handleRemoveOriginalFromCart = () => {
    props.removeOriginalFromCart(props.data.id);
  };
  const handleRemoveLithographyFromCart = () => {
    props.removeLithographyFromCart(props.data.id);
  };

  useEffect(() => {
    const original = props.isOriginalInCart(props.data.id);
    const lithography = props.isLithographyInCart(props.data.id);

    setOriginalIsInCart(original);
    setLithographyIsInCart(lithography);

    let cartLength =0;
    props.cart.forEach(element => {
      cartLength += element.amount;
      
      
    });

    setTotalCartLength(cartLength);
  }, [props.cart]);

  useEffect(() => {
    props.removeItemFromCart(props.data.id, "lithography");

  }, [amountOfLithography]);
  return (
    <div
      ref={componentRef}
      className={`artPiece ${expanded ? "artPiece-expanded" : ""}`}
      onClick={expanded ? null : handleExpand}
    >
      {expanded ? (
        <div className="artPiece-background" onClick={handleClose}></div>
      ) : null}
      <div className={`artPice-top ${expanded ? "artPice-top-expanded" : ""}`}>
        {props.data.cover && (
          <div
            className={`img-container ${
              expanded ? "img-container-expanded" : ""
            }`}
          >
            <img
              className={`img-image ${expanded ? "img-image-expanded" : ""}`}
              src={assetsPath + props.data.cover}
              alt=""
            />
          </div>
        )}
      </div>
      {expanded ? (
        <div className="indexButtons">
          <button className="indexButton prevButton" onClick={handlePrevIndex}>
          Previous
          </button>
          <button className="indexButton nextButton" onClick={handleNextIndex}>
            Next
          </button>
        </div>
      ) : null}
      {expanded ? (
        <div className="artPice-bot-expanded-bot-buttons">
          {/* To Cart */}
          <Link to="/checkout">
            <button className="CTAbutton2">{"View Cart (" + totalCartLength  + ")"}</button>
          </Link>
          {/* Get Original */}
          {!props.data.sold ? (
            <>
              {!originalIsInCart ? (
                <>
                  <button
                    className="CTAbutton1"
                    onClick={handleAddOriginalToCart}
                  >
                    Get Original
                  </button>
                </>
              ) : (
                <button
                  className="CTAbutton2"
                  onClick={handleRemoveOriginalFromCart}
                >
                  Remove Original
                </button>
              )}
            </>
          ) : null}
          {/* Get Litography */}

          {props.data.amountLeft > 0 ? (
            <div className="lithography-buttons">
              {amountOfLithography > 0 ? (
                <>
                  {!lithographyIsInCart ? (
                    <button
                      className="lithography-buttons-middle"
                      onClick={handleAddLithographyToCart}
                    >
                      {"Get " + amountOfLithography + " Lithography "}
                    </button>
                  ) : (
                    <button
                      className="CTAbutton2"
                      onClick={handleRemoveLithographyFromCart}
                    >
                      {"Remove Lithography (" + amountOfLithography + ")"}
                    </button>
                  )}
                </>
              ) : (
                <button
                  disabled
                  className="lithography-buttons-middle no-border"
                >
                  {"Litography (" + amountOfLithography + ")"}
                </button>
              )}

              <div className="lithography-buttons-amount">
                <button
                  className="lithography-buttons-left"
                  onClick={decrementLithography}
                >
                  -
                </button>
                <button
                  className="lithography-buttons-right"
                  onClick={incrementLithography}
                >
                  +
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
      {expanded ? (
        <>
          <div className="artPice-bot-expanded-close">
            <button className="closeButton" onClick={handleClose}>
              X
            </button>
          </div>
        </>
      ) : null}
      {expanded ? (
        <div className="artPice-bot-expanded">
          <div className="artPice-bot-expanded-top">
            <h3 className="artPice-bot-expanded-top-first">
              {props.data.title}
            </h3>{" "}
            {!props.data.sold ? (
              <p>{props.data.price + "kr (Original)"}</p>
            ) : null}
          </div>
          <div className="artPice-bot-expanded-top artPice-bot-expanded-top-second">
            {props.data.sold && props.data.amountLeft <= 0 ? (
              <h4 className="artPice-sold artPice-bot-expanded-top-first">
                Sold
              </h4>
            ) : (
              <h4 className="artPice-available">{availablity}</h4>
            )}
            {props.data.amountLeft > 0 ? (
              <p>{props.data.lithographyPrice + "kr (Litography)"}</p>
            ) : null}
          </div>

          <div className="artPice-bot-expanded-bot">
            <p>{props.data.desc}</p>
          </div>
         
        </div>
        
      ) : (
        <div className="artPice-bot">
          <h3>{props.data.title}</h3>
        </div>
      )}
      {props.data.sold && props.data.amountLeft <= 0 ? (
        <h4 className="artPice-sold">Sold</h4>
      ) : (
        <h4 className="artPice-available">{availablity}</h4>
      )}
    </div>
  );
}

export default ArtPiece;
