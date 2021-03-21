import { CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/constants'
import axios from 'axios'
import { toast} from 'react-toastify'

export const addTocart = (id, qty)=> async (dispatch, getState)=>{
    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: data.qty
        }
    })
    toast.success("MY SUCCESS")

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))


}