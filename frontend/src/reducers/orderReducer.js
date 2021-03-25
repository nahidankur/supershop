import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
ORDER_PAY_SUCCESS,
ORDER_LIST_MY_RESET,
ORDER_PAY_FAIL,
ORDER_PAY_RESET,
ORDER_DETAILS_RESET,
ORDER_LIST_MY_REQUEST,
ORDER_LIST_MY_SUCCESS,
ORDER_LIST_MY_FAIL
} from '../constants/constants'

export const orderCreate = (state ={}, action) => {
    const { type, payload} = action

    switch(type){
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                order: payload,
                success: true
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ORDER_DETAILS_RESET:
            return {}
            default:
                return state
    }
}

export const orderDetails = (state ={ loading: true,  orderItems: [],  shippingAddress: {}}, action) => {
    const { type, payload} = action

    switch(type){
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            }
            default:
                return state
    }
}

export const orderPay = (state ={ }, action) => {
    const { type, payload} = action

    switch(type){
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ORDER_PAY_RESET:
            return {
                
            }
            default:
                return state
    }
}



export const orderMyList = (state ={ orders: [] }, action) => {
    const { type, payload} = action

    switch(type){
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: payload
            }
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: payload
            }
        case ORDER_LIST_MY_RESET:
            return {
                orders: []
            }
            default:
                return state
    }
}