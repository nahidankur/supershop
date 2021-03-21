import {createStore,combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { productList, productDetails} from './reducers/productReducer'
import { cartReducer} from './reducers/cartReducer'

const reducer = combineReducers({
    productList, productDetails,
    cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(
    localStorage.getItem('cartItems')
) : []

const initialState = { 
    cart: { cartItems: cartItemsFromStorage }
 }
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store   