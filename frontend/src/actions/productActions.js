import axios from "axios";
import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  CLEAR_ERROR,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
} from "../constants/productConstants";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 50000], category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }
      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: e.response.data.message,
      });
    }
  };

export const getProductsAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get("/api/v1/admin/products");
    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (e) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: e.response.data.message,
    });
  }
};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (e) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: e.response.data.message,
    });
  }
};

//NEw Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);
    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (e) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: e.response.data.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
