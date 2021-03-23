import {createStore,combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { productList, productDetails} from './reducers/productReducer'
import { cartReducer} from './reducers/cartReducer'
import { userLogin, userRegister} from './reducers/userReducers'

const reducer = combineReducers({
    productList, productDetails,
    cart: cartReducer,
    userLogin, userRegister
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(
    localStorage.getItem('cartItems')
) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(
    localStorage.getItem('userInfo')
) : null

const initialState = { 
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
 }
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store   