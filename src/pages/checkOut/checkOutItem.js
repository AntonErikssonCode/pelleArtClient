import React from "react";
import "./checkOutItem.css";

function CheckOutItem(props) {
  const artPiece = props.artPiece;
  const assetsPath = process.env.PUBLIC_URL + "/assets/";


  const handleRemoveOriginalFromCart = () => {
    props.removeOriginalFromCart(artPiece.id);
  };
  const handleRemoveLithographyFromCart = () => {
    props.removeLithographyFromCart(artPiece.id);
  };

  return (
    <div className="checkOutItem">
      <div className="checkOutItem-img-space">
        <div className="checkOutItem-img-container">
          <img
            className="checkOutItem-img"
            src={assetsPath + artPiece.cover}
            alt=""
          />
        </div>
      </div>
      <div className="checkOutItem-titleAndType">
        <p className="checkOutItem-title">{artPiece.title}</p>
        <p className="checkOutItem-type">
          {artPiece.amount + " " + artPiece.type}
        </p>
      </div>
      {artPiece.type == "original" ? (
        <p className="checkOutItem-price">
          {artPiece.amount + "*" + artPiece.price + "kr"}
        </p>
      ) : (
        <p className="checkOutItem-price">
          {artPiece.amount + "*" + artPiece.lithographyPrice + "kr"}
        </p>
      )}
      {artPiece.type == "original" ? (
        <button
          className="checkOutItem-remove"
          onClick={handleRemoveOriginalFromCart}
        >
          REMOVE
        </button>
      ) : (
        <button
          className="checkOutItem-remove"
          onClick={handleRemoveLithographyFromCart}
        >
          REMOVE
        </button>
      )}
    </div>
  );
}

export default CheckOutItem;
