import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
PRODUCT_DELETE_REQUEST,
PRODUCT_DELETE_SUCCESS,
PRODUCT_DELETE_FAIL

} from '../constants/constants'
import axios from 'axios'
import { toast } from "react-toastify"

export const listProduct = ()=> async (dispatch)=>{
    try{
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const {data} = await axios.get('/api/products')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload : { msg: err.response.statusText, status: err.response.status }
        })

    }
}

export const listProductDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload : { msg: err.response.statusText, status: err.response.status }
        })

    }
}


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
      dispatch({ 
        type: PRODUCT_DELETE_REQUEST,
      })
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
       await axios.delete(`/api/products/${id}`,config)
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS
      })
  
    } catch(err){
                dispatch({
                    type:  PRODUCT_DELETE_FAIL,
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