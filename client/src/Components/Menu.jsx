import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { Header, Cart, Slider, Footer } from "../Components";

const Menu = () => {
  const isCart = useSelector((state) => state.isCart);
  const products = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts()
        .then((data) => {
          dispatch(setAllProducts(data));
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error fetching products:", error);
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, products]);

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start bg-lightOverlay p-4 md:p-10 gap-10">
      <Header />

      <div className="flex flex-col items-center justify-center flex-1">
        {isLoading ? (
          <div className="w-full h-40 flex flex-col items-center justify-center">
            <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
              <span role="img" aria-label="Sad Face" className="text-2xl mr-2">
                😔
              </span>{" "}
              Out of Stock..!
            </div>
          </div>
        ) : products && products.length > 0 ? (
          <div className="w-full mt-12 flex items-start justify-start flex-col">
            <Slider products={products} />
          </div>
        ) : (
          <div className="w-full h-40 flex flex-col items-center justify-center">
            <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-center">
              <span role="img" aria-label="Sad Face" className="text-2xl mr-2">
                😔
              </span>{" "}
              Out of Stock..!
            </div>
          </div>
        )}
      </div>
      {isCart && <Cart />}
      <div className="flex flex-col items-center justify-center flex-1 px-6 md:px-24 xl:px-10 max-w-screen-xl w-full mb-[-50px] bottom-0">
        <Footer />
      </div>
    </main>
  );
};

export default Menu;
