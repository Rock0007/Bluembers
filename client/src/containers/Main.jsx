import React, { useEffect } from "react";
import { Cart, FilterSection, Footer, Header, Home } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      // Handle API call errors here
      getAllProducts()
        .then((data) => {
          dispatch(setAllProducts(data));
        })
        .catch((error) => {
          // Handle error (e.g., show error message to the user)
          console.error("Error fetching products:", error);
        });
    }
  }, [dispatch, products]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-lightOverlay overflow-x-hidden">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 px-6 md:px-24 xl:px-10 w-full max-w-screen-xl mt-8 overflow-x-hidden">
        <Home />
        <FilterSection />
        <Footer />
      </div>
      {isCart && <Cart />}
    </div>
  );
};

export default Main;
