import axios from "axios";

export const baseURL = "http://localhost:5001/bluembers-de568/us-central1/app";
export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//add new product
export const addNewProduct = async (data) => {
  try {
    console.log("Sending data:", data);
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    console.log("Response:", res.data);
    return res.data.data;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

//get all the products

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    console.log("Response:", res.data);
    return res.data.data;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

//delete a product
export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    console.log("Response:", res.data);
    return res.data.data;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

//GET all user
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//add an item to cart
export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//get all cart items
export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      {
        params: {
          productId: productId,
          type: type,
        },
      }
    );

    return res.data.data;
  } catch (error) {
    return null;
  }
};

//Orders
export const getAllOrder = async (user_id) => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders/`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//update order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrder/${order_id}`,
      null,
      {
        params: { sts: sts },
      }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
