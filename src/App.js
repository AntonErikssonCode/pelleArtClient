import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArtPage from "./pages/art/artPage";
import CheckOutPage from "./pages/checkOut/checkOutPage";

function App() {
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
  };
  const removeItemFromCart = (itemId, itemType) => {
    const updatedCart = cart.filter(
      (item) => item.id !== itemId || item.type !== itemType
    );
   setCart(updatedCart);
  };

  
  const removeOriginalFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === itemId && item.type === "original"))
    );
  };
  
  const removeLithographyFromCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === itemId && item.type === "lithography"))
    );
  };
  
  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const isOriginalInCart = (itemId) => {
    return cart.some((item) => item.id === itemId && item.type == "original");
  };
  const isLithographyInCart = (itemId) => {
    return cart.some(
      (item) => item.id === itemId && item.type == "lithography"
    );
  };

  useEffect(() => {
    console.dir(cart);
  }, [cart]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ArtPage
                clearCart={clearCart}
                removeItemFromCart={removeItemFromCart}
                addItemToCart={addItemToCart}
                isOriginalInCart={isOriginalInCart}
                isLithographyInCart={isLithographyInCart}
                removeLithographyFromCart={removeLithographyFromCart}
                removeOriginalFromCart={removeOriginalFromCart}
                cart={cart}
              />
            }
          />
          <Route
            path="/art"
            element={
              <ArtPage
                clearCart={clearCart}
                removeItemFromCart={removeItemFromCart}
                addItemToCart={addItemToCart}
                isOriginalInCart={isOriginalInCart}
                isLithographyInCart={isLithographyInCart}
                removeLithographyFromCart={removeLithographyFromCart}
                removeOriginalFromCart={removeOriginalFromCart}
                cart={cart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckOutPage
                clearCart={clearCart}
                removeItemFromCart={removeItemFromCart}
                addItemToCart={addItemToCart}
                isOriginalInCart={isOriginalInCart}
                isLithographyInCart={isLithographyInCart}
                removeLithographyFromCart={removeLithographyFromCart}
                removeOriginalFromCart={removeOriginalFromCart}
                cart={cart}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
