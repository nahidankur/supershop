import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS
} from '../constants/constants'
import axios from 'axios'


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