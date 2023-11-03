export const setOrders = (data) => {
  return {
    type: "SET_ORDERS",
    orders: data,
  };
};

export const getOrders = (data) => {
  return {
    type: "GET_ORDERS",
  };
};
