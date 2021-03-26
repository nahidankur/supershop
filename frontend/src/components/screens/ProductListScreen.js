import React, {useEffect, useState} from 'react'
import { Row, Col, Form, Button,Table, Card } from 'react-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import {LinkContainer } from 'react-router-bootstrap'
import Message from '../Message'
import RoundLoader from '../RoundLoader'
import { register} from '../../actions/userAction'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import {listProduct, deleteProduct } from '../../actions/productAction'
import Loader from '../Loader'
import { deleteModel } from 'mongoose'

const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { products, loading: loadingProduct } = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: laodingDelete, success: successDelete } = productDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listProduct())
        } else {
            history.push('/')
        }
       
    }, [dispatch, history, userInfo,successDelete])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure want to delete this product?')){
         dispatch(deleteProduct(id))
            
        }

    }

    const createProductHandler = ()=>{

    }


    return (
        <>
        <Row className='align-items-center'>
            <Col >
            <h1>
                Products
            </h1>
            </Col>
            <Col className='text-right'>
                <Button onClick={createProductHandler} className='my-3'>Create Product</Button>
                
              
            </Col>
        </Row>
           <ToastContainer position="bottom-left" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
        <h2>Users</h2>
        {loadingProduct && <RoundLoader />}
        {laodingDelete && <RoundLoader />}
        { loading? <Loader />: error ? <Message>Access Denied</Message> : (
            
             <Table striped bordered responsive hover className='table-sm'>
             <thead>
               <tr>
                 <th>ID</th>
                 <th>NAME</th>
                 <th>PRICE</th>
                 <th>CATAGORY</th>
                 <th>BRAND</th>
                 <th></th>
               </tr>
             </thead>
             <tbody>
                 { products.map(product=> (
                     <tr key={product._id}>
                         <td>{product._id}</td>
                         <td>{product.name}</td>
                         <td>$ {product.price}</td>
                         <td>
                            {product.category}
                         </td>
                         <td>{product.brand}</td>
                         <td>
                             <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                 <Button variant='light' className='btn-sm'>
                                     <i className='fas fa-edit'></i>

                                 </Button>
                             </LinkContainer>
                             {' '} {' '}
                             <Button className='btn-sm' variant='danger' onClick={()=> deleteHandler(product._id)}>
                                 <i className='fas fa-trash'></i> 
                             </Button>
                         </td>
                     </tr>
                     
                 )) }
             </tbody>
             </Table>
        )}
            
        </>
    )
}

export default ProductListScreen
