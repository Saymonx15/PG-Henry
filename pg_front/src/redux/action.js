// import { products } from "../asset/products";
import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_PRODUCTS,
  GET_PAGINATED_PRODUCTS,
  SIGN_UP,
  SEARCH_PRODUCT,
  FILTER_SPORT,
  FILTER_GENRE,
  FILTER_BRAND,
  FILTER_NAV_GENDER,
  CHECK_LOGIN,
  LOGOUT,
  ORDER_BY,
  ORDER_BY_PRICE,
  DETAIL_PRODUCT,
  ADD_TO_CART,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  UPDATE_ITEM_NUM,
  REMOVE_DUPLICATES_CART,
  CREATE_USER,
  GET_ALL_USERS,
  CHANGE_ROLE_USER,
  DELETE_USER,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  FETCH_SAVED_ITEMS,
  ADD_TO_CART_DETAIL,
  FILTER_BRAND_CAROUSEL,
  REMEMBER_PASSWORD,
  RESET_PASSWORD,
  ORDER_MERCADOPAGO,
  GET_ORDER_BY_ID,
  GET_REVIEWS
} from "./const";

const URL = "https://pg-athen.herokuapp.com"
//const URL = "https://localhost:3001"

export function signUp(body) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${URL}/api/login`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      return dispatch({
        type: SIGN_UP,
        payload: user.data.data,
      });
    } catch (e) {
      Swal.fire({
        title: "Error!",
        text: "Email or password invalid",
        icon: "error",
        confirmButtonText: "GO HOME",
      });
      // Swal.fire(
      //   "¡User created successfully!",
      //   "¡Thank you for visiting our website!"
      // );
      // console.log(e)
    }
  };
} 

export function mercadoPago(body) {
  return async function (dispatch) {
    try {
      let order = await axios.post(`https://pg-athen.herokuapp.com/api/crear-orden`, body);
      console.log(order.data.url)
      return dispatch({
        type: ORDER_MERCADOPAGO,
        payload: order.data.url
      });
    } catch (e) { 
      console.log(e);
    }
  };
}

export function getOrderById(id){
  return async function(dispatch){
    try{      
      let orderId = await axios.get(`${URL}/api/order/${id}`)
      
      return dispatch({
        type:GET_ORDER_BY_ID,
        payload: orderId.data
      })
    }
    catch(e){
      console.log(e)
    }

  }
}


export function passwordRemember(body) {
  return async function (dispatch) {
    try {
      console.log(body);
      let password = await axios.post(`${URL}/api/olvide-password`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      console.log(password);
      return dispatch({
        type: REMEMBER_PASSWORD,
        payload: password
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function resetPassword(body) {
  return async function (dispatch) {
    try {
      let newPassword = await axios.post(`${URL}/api/olvide-passwords`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      console.log(newPassword);
      return dispatch({
        type: RESET_PASSWORD,
        payload: newPassword
      });
    } catch (e) {
      console.log(e);
    }
  };
}


export function createUser(body) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${URL}/api/user`, body);
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      console.log(user.data.data.user);
      return dispatch({
        type: CREATE_USER,
        payload: user.data.data.user,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getAllUsers(body) {
  return async function (dispatch) {
    try {
      /* const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;  */
      let users = await axios.get(`${URL}/api/user`,{
        headers: {
          Authorization: `Bearer 23k4!jhisd&jhf8*asfdasdf$dsf45%&`,
        }
      });
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      //console.log(user.data.data.user);
      return dispatch({
        type: GET_ALL_USERS,
        payload: users.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function changeRoleUser(id,body) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON; 
      let userChange = await axios.put(`${URL}/api/user/${id}`,body,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      //console.log(user.data.data.user);
      return dispatch({
        type: CHANGE_ROLE_USER,
        payload: userChange.data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteUser(id) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON; 
      let userDelete = await axios.delete(`${URL}/api/user/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      //user.data.expire = new(new Date().getTime() + user.data.expire)
      // localStorage.setItem(`userDetails`, JSON.stringify(user.data));
      //console.log(user.data.data.user);
      return dispatch({
        type: DELETE_USER,
        payload: userDelete.data
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function createProduct(body) {
  body.price = parseInt(body.price);
  body.discount = parseInt(body.discount);
  body.stock = parseInt(body.stock);
  body.sport = body.sport.join();
  console.log('body',body)
  return async function(dispatch){
    try{
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON; 
      let newProduct = await axios.post(`${URL}/api/product`,body,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(newProduct.data);
      return dispatch({
        type:CREATE_PRODUCT,
        payload:newProduct.data
      })
    }
    catch(e){ 
      console.log(e)
    Swal.fire({
      title: "Error creating product!",
      text: "Please try again",
      icon: "error",
      confirmButtonText: "Back",
    });
  }
} 
}

export function editProduct(id, body) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;
      console.log(body);
      let putProduct = await axios.put(`${URL}/api/product/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(putProduct.data);
      return dispatch({
        type: EDIT_PRODUCT,
        payload: putProduct.data,
      });
    } catch (e) {
      Swal.fire({
        title: "Error updating product!",
        text: e.msg,
        icon: "Error",
        confirmButtonText: "Back",
      });
    }
  };
}

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
      const { token } = tokenJSON;
      let deleteProduct = await axios.delete(`${URL}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(deleteProduct.data);
      return dispatch({
        type: DELETE_PRODUCT,
        payload: id,
      });
    } catch (e) {
      Swal.fire({
        title: "Error deleting product!",
        text: e.msg,
        icon: "error",
        confirmButtonText: "Back",
      });
    }
  };
}

export function getProduct() {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${URL}/api/products`);
      console.log("Products", res.data);
      return dispatch({
        type: GET_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function searchProduct(payload) {
  return async function (dispatch) {
    try {
      var product = await axios.get(`${URL}/api/products?title=${payload}`, {});
      return dispatch({
        type: SEARCH_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      Swal.fire({
        title: "Product not found!",
        text: "Please try with another product",
        icon: "Error",
        confirmButtonText: "Back",
      });
    }
  };
}

export function filterBySport(payload) {
  console.log(payload);
  return {
    type: FILTER_SPORT,
    payload, //Acá llegaría el tipo de deporte
  };
}

export function filterByGenre(payload) {
  return {
    type: FILTER_GENRE,
    payload, //Acá llegaría el tipo de genero
  };
}

export function filterByBrand(payload) {
  console.log(payload);
  return {
    type: FILTER_BRAND,
    payload, //Acá llegaría el tipo de genero
  };
}

export function filterByGenderInNav(payload) {
  return {
    type: FILTER_NAV_GENDER,
    payload,
  };
}

export function orderBy(payload) {
  return {
    type: ORDER_BY,
    payload: payload, // Deberia llegar el array con los obj para ordenar.
  };
}

export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload: payload, // Deberia llegar el array con los obj para ordenar.
  };
}

export function detailProduct(id) {
  console.log(id);
  return async function (dispatch) {
    try {
      var product = await axios.get(`${URL}/api/product/${id}`);
      console.log(product);
      return dispatch({
        type: DETAIL_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function logout(history){
  history.push('/')
  console.log('En action logout')
  return{
    type:LOGOUT,
    
  }
}

//CHECK LOGIN ACTION CREATOR
export function checkLogin(id,token) {
  console.log(id);
  return async function(dispatch){
    let user = await axios.get(`${URL}/api/user/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return dispatch({
      type:CHECK_LOGIN,
      payload: user.data,
    })
} 
}
export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}

export function addToCartDetail(payload){
  return {
    type: ADD_TO_CART_DETAIL,
    payload
  }
}

export function deleteFromCart(payload) {
  return {
    type: DELETE_FROM_CART,
    payload,
  };
}

export function deleteAllFromCart() {
  return {
    type: DELETE_ALL_FROM_CART,
  };
}

export function removeDupsCart(payload) {
  return {
    type: REMOVE_DUPLICATES_CART,
    payload,
  };
}

export function sendItemNum(payload) {
  return {
    type: UPDATE_ITEM_NUM,
    payload,
  };
}

export function fetchCartItems(payload) {
  return {
    type: FETCH_SAVED_ITEMS,
    payload,
  };
}

export function filterByCarousel(payload) {
  console.log(payload);
  return {
    type: FILTER_BRAND_CAROUSEL,
    payload, //Acá llegaría el tipo de genero
  };
}


export function getReviews() {
  return async function (dispatch) {
    const resp = await axios.get(`/api/review`);
    const data = resp.data
    console.log(resp)
    if (resp) {
    return  dispatch({ type: GET_REVIEWS, payload: data });
    }
  };
}