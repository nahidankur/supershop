import axios from 'axios'
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT } from '../constants/constants'

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
            });
    }

}