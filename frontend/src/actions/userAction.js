import axios from 'axios'
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS
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
            payload : { msg: 'Invalid Credentials' }
        })
        toast.error('Invalid Credentials', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }

}

export const logout = ()=> (dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
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