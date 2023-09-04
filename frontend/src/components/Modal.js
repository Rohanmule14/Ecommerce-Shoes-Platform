import React from "react";
import { useCart, useDispatchCart } from "./contextReducer";
import Badge from "react-bootstrap/Badge";
import axios from "axios";

const Modal = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  const handleCheckout = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      const response = await axios.post(
        "http://localhost:5000/api/auth/orderData",
        {
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }
      );
      if (response.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      alert(error.message);
    }
  };
  let total_price = data.reduce((total, shoes) => total + shoes.price, 0);
  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-warning me-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        My Cart{" "}
        {data.length > 0 ? (
          <Badge pill bg="danger">
            {data.length}
          </Badge>
        ) : null}
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                My Cart
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {data.length === 0 ? (
                <div>
                  <div className="w-100 text-center text-black fs-3">
                    The Cart is Empty!
                  </div>
                </div>
              ) : (
                <div>
                  <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                    <table className="table table-hover table-dark">
                      <thead className="text-warning fs-4">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Size</th>
                          <th scope="col">Amount</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((shoes, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{shoes.name}</td>
                            <td>{shoes.qty}</td>
                            <td>{shoes.size}</td>
                            <td>{shoes.price}</td>
                            <td>
                              <button type="button" className="btn p-0">
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                                  alt="delete"
                                  style={{ height: "25px" }}
                                  onClick={() => {
                                    dispatch({ type: "REMOVE", index: index });
                                  }}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div>
                      <h1 className="fs-2 text-warning">
                        Total Price: Rs {total_price}/-
                      </h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
