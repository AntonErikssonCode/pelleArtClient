import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtPiece from "../../components/artPiece";
import Header from "../../components/header";
import "./artPage.css";
import ResetButton from "../../components/reset";

function ArtPage(props) {
  const [art, setArt] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const URL = "https://pelle-art-bb0b92a8bfe3.herokuapp.com"; //http://localhost:8800

  
  const handleSetExpandIndex = (index) => {
    setExpandedIndex(index);
/*     console.dir("expand set to:" + index);
 */   };
  useEffect(() => {
    const fetchAllArt = async () => {
      try {
        const res = await axios.get(`${URL}/art`);
/*         console.log(res.data);
 */        setArt(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllArt();
  }, []);
  return (
    <div>
      <Header cart={props.cart}/>
      <h2 className="pageTitle">Available Art</h2>
      <div className="artWorks">
        {art.map((artPiece, index) => {
          

          return (
            <ArtPiece
              key={index}
              index={index}
              data={artPiece}
              expandedIndex={expandedIndex}
              handleSetExpandIndex={handleSetExpandIndex}
              expanded={expandedIndex === index}
              artArrayLength={art.length}
              clearCart={props.clearCart}
              removeItemFromCart={props.removeItemFromCart}
              addItemToCart={props.addItemToCart}
              isOriginalInCart={props.isOriginalInCart}
              isLithographyInCart={props.isLithographyInCart}
              removeOriginalFromCart={props.removeOriginalFromCart}
              removeLithographyFromCart={props.removeLithographyFromCart}

              cart={props.cart}
            />
          );
        })}
      </div>
      <ResetButton/>
    </div>
  );
}

export default ArtPage;
