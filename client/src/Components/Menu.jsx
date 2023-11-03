import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { Header, Cart, Slider, Footer } from "../Components";

const Menu = () => {
  const isCart = useSelector((state) => state.isCart);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [dispatch, products]);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start bg-lightOverlay p-4 md:p-10 gap-10">
      <Header />
      <div className="w-full mt-16 flex items-start justify-start flex-col">
        <Slider products={products} />
      </div>
      {isCart && <Cart />}
      <div className="flex flex-col items-center justify-center flex-1 px-6 md:px-24 xl:px-10 w-full max-w-screen-xl mb-[-50px]">
        <Footer />
      </div>
    </main>
  );
};

export default Menu;
