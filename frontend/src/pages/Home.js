import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { products } from "../product";
import Search from "../components/Search";

const Home = () => {
  const shoesBrand = products[1];
  const shoesInfo = products[0];
  const [search, setSearch] = useState("");
  const myStyle = {
    backgroundImage:
      "url('https://images.pexels.com/photos/7078619/pexels-photo-7078619.jpeg?auto=compress&cs=tinysrgb&w=600')",
    backgroundSize: "contain",
  };
  return (
    <div className="" style={myStyle}>
      <div>
        <Navbar />
      </div>
      <div>
        <Search
          search={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="container">
        {shoesBrand !== [] ? (
          shoesBrand.map((brandItems) => {
            return (
              <div className="row">
                <div className="ms-3 fs-3 fw-bold text-black">
                  {brandItems.brand}
                </div>
                <hr />
                {shoesInfo !== [] ? (
                  shoesInfo
                    .filter(
                      (shoeItems) =>
                        shoeItems.brand === brandItems.brand &&
                        shoeItems.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div className="col-sm-12 col-md-6 col-lg-3">
                          <Card
                            category={filterItems.category}
                            image={filterItems.image}
                            name={filterItems.name}
                            price={filterItems.price}
                            item={filterItems}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>Nothing found!</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
