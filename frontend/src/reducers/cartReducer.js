import {CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/constants'

export const cartReducer = (state = { cartItems : [] }, action)=> {
    const {type, payload } = action

    switch(type){
        case CART_ADD_ITEM:
            const existItem = state.cartItems.find(x => x.product === payload.product)

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x=> x.product === existItem.product ? payload : x)
                }

            } else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, payload]
                }
            }
            default: 
            return state
    }

}