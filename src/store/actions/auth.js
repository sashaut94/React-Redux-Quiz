import axios from "axios";
import {
  AUTH_LOGOUT,
  AUTH_SUCCESS
} from "./actionTypes";

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function logout() {
  localStorage.removeItem('idToken')
  localStorage.removeItem('localId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('idToken')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = localStorage.getItem('expirationDate')
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((new Date(expirationDate) - new Date()) / 1000))
      }
    }
  }
}

export function auth(email, password, isLogin) {
  const authData = {
    email,
    password,
    returnSecureToken: true
  }
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUO5cF8blCLtUgXmPWXIU_F08So1lGcL8'
  if (isLogin) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUO5cF8blCLtUgXmPWXIU_F08So1lGcL8'
  }
  return async dispatch => {
    try {
      const response = await axios.post(url, authData)
      const data = response.data
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
      localStorage.setItem('idToken', data.idToken)
      localStorage.setItem('localId', data.localId)
      localStorage.setItem('expirationDate', expirationDate)
      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))
    } catch (e) {
      console.log(e)
    }
  }
}