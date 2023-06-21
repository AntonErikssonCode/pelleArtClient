import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./header.css";
function Header(props) {
  const location = useLocation();
  const [totalCartLength, setTotalCartLength] = useState(0);

  useEffect(() => {
   
    let cartLength =0;
    props.cart.forEach(element => {
      cartLength += element.amount;
      
      
    });

    setTotalCartLength(cartLength);
  }, [props.cart]);

  return (
    <header>
      <h1>The Art Of Pelle</h1>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname == "/" || location.pathname == "/art"
                  ? "nav-link-active"
                  : ""
              }`}
              to="/art"
            >
              ART
            </Link>
          </li>
          <li className="nav-item">
            <Link    className={`nav-link ${
                location.pathname == "/checkout" 
                
                  ? "nav-link-active"
                  : ""
              }`} to="/checkout">
              CHECK OUT 
            </Link>
            <p className="cart-num">{totalCartLength}</p>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
