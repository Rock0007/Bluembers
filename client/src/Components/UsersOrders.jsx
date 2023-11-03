import React, { useEffect, useState } from "react";
import { Header, OrderData } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, getAllUsers } from "../api";
import { setOrders } from "../context/actions/ordersAction";
import { setAllUserDetails } from "../context/actions/allUsersAction";

const UsersOrders = () => {
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [usersOrders, setUsersOrders] = useState(null);

  useEffect(() => {
    if (!user) {
      getAllUsers().then((userData) => {
        if (userData) {
          dispatch(setAllUserDetails(userData));
          fetchUserOrders(userData.user_id);
        }
      });
    } else {
      fetchUserOrders(user.user_id);
    }
  }, [user]);

  const fetchUserOrders = (userId) => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
        setUsersOrders(data.filter((item) => item.userId === userId));
      });
    } else {
      setUsersOrders(orders.filter((data) => data.userId === userId));
    }
  };

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-lightOverlay">
      <Header />
      <div className="w-full flex flex-col items-start justify-start mt-36 px-6 md:px-24 xl:px-10 gap-10 pb-24">
        {usersOrders?.length > 0 ? (
          usersOrders.map((item, i) => (
            <OrderData key={i} index={i} data={item} admin={false} />
          ))
        ) : (
          <>
            <h1 className="text-[62px] text-headingColor font-bold select-none">
              No Orders
            </h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UsersOrders;
