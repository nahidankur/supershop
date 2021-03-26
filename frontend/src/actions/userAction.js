import axios from 'axios'
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST,
    ORDER_LIST_MY_RESET,USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, CART_CLEAR_ITEMS
} from '../constants/constants'

import { toast } from "react-toastify"

export const login = (email, password)=>async (dispatch)=>{
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(`/api/auth/login`, {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        toast.success('Login Successful', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(err){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload : { }
        })
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error =>(
                toast.error(error.msg, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            ) )
        }
    }

}

export const logout = ()=> (dispatch)=>{
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({type: CART_CLEAR_ITEMS})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_DETAILS_RESET})
    document.location.href = '/login'
    toast.success('Logout Successful', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
}

export const register = (name, email, password)=>async (dispatch)=>{
    try{
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(`/api/auth/register`, {name, email, password}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        toast.success('Registration Successful', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(err){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload : { }
        })
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error =>(
                toast.error(error.msg, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            ) )
        }  
    }

}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      })
  
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        },
      }
  
  
      const { data } = await axios.get(`/api/auth/${id}`, config)
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch(err){
                dispatch({
                    type: USER_DETAILS_FAIL,
                    payload : { }
                })
                const errors = err.response.data.errors
                if(errors){
                    errors.forEach(error =>(
                        toast.error(error.msg, {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            })
                    ) )
                }  
            }
  }

  export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      })
  
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
  
      const { data } = await axios.put(`/api/auth/profile`, user, config)
  
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
      toast.success('Profile Updated Successfully!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })


      dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
      })

      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(err){
                dispatch({
                    type:  USER_UPDATE_PROFILE_FAIL,
                    payload : { }
                })
                const errors = err.response.data.errors
                if(errors){
                    errors.forEach(error =>(
                        toast.error(error.msg, {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            })
                    ) )
                }  
            }
  }