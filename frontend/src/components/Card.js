import React, { useState } from "react";
import { useCart, useDispatchCart } from "./contextReducer";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const Data = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(7);
  let shoesItem = props.item;
  const handleAddToCart = async () => {
    let shoesCart = [];
    for (const item of Data) {
      if (item.id === shoesItem.id) {
        shoesCart = item;
        break;
      }
    }
    console.log(shoesCart);
    console.log(new Date());
    if (shoesCart !== []) {
      if (shoesCart.size === size) {
        await dispatch({
          type: "UPDATE",
          id: shoesItem.id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (shoesCart.size !== size) {
        await dispatch({
          type: "ADD",
          id: shoesItem.id,
          name: shoesItem.name,
          qty: qty,
          size: size,
          price: finalPrice,
          image: props.image,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: shoesItem.id,
      name: shoesItem.name,
      qty: qty,
      size: size,
      price: finalPrice,
    });
  };
  let finalPrice = qty * props.price;
  const myStyle = {
    backgroundColor: "#133337",
  };
  return (
    <div>
      <div className="card mb-5 bg-dark text-white" style={myStyle}>
        <img src={props.image} className="card-img-top" alt="..." />
        <div
          className="card-body d-flex flex-column align-items-center justify-content-center"
          style={{ height: "210px" }}
        >
          <p className="card-text fs-5 text-center">{props.name}</p>
          <h5 className="card-title">
            <b className="text-warning">Category:</b> {props.category}
          </h5>
          <div>
            <select
              className="mb-2 me-2 rounded bg-light"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(5), (_, i) => {
                return <option value={i + 1}>{i + 1}</option>;
              })}
            </select>
            <select
              className="mb-2 me-2 rounded bg-light"
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {Array.from(Array(4), (_, i) => {
                return <option value={i + 7}>{i + 7}</option>;
              })}
            </select>
            <div className="d-inline">₹{finalPrice}/-</div>
            <br />
            <button
              className="btn btn-outline-warning"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
