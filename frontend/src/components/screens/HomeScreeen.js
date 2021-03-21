import React, {useEffect} from 'react'
import {Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Product from '../../components/Product'
import { listProduct} from '../../actions/productAction'
import Loader from '../Loader'
import Message from '../Message'

const HomeScreeen = () => {

      const dispatch = useDispatch()

      useEffect(()=>{
          dispatch(listProduct())
      }, [dispatch])

      const productList = useSelector(state => state.productList)
      const {loading, error, products } = productList
    return (
       <>
       <h1>Latest Products</h1>
       { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:    <Row>
           { products.map(product => (
               <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
               <Product product={product} />
               </Col>
           ))}
       </Row>  }
    

       </>
    )
}

export default HomeScreeen
