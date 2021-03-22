import React, {useEffect, useState} from 'react'
import { Link} from 'react-router-dom'
import {Row, Col, Button, Image, Card, ListGroup, Form } from 'react-bootstrap'
import Rating from '../Rating'
import { listProductDetails} from '../../actions/productAction'
import {useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'


const ProductScreen = ({match, history}) => {
     const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))

    }, [match, dispatch])

    const addtoCartHandler = ()=>{
       history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error} = productDetails

    return (
       <>
       <Link className='btn btn-primary my-3' to='/'>
           Go Back
       </Link>
       { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>: <Row>
           <Col md={6}>
               <Image src={product && product.image} alt={product && product.name} fluid />
            
           </Col>

           <Col md={3}>
               <ListGroup variant='flush'>
                   <ListGroup.Item>
                       <h2>{product && product.name}</h2>
                       </ListGroup.Item>
                    <ListGroup.Item>
                    <Rating value={product && product.rating} text={`${product && product.numReviews} reviews`}/>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Price : </strong> ${product && product.price}

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description : </strong> {product && product.description}

                    </ListGroup.Item>

               </ListGroup>
           </Col>

           <Col md={3}>
               
                   <ListGroup>
                       <ListGroup.Item>
                            <strong>Price : </strong> ${product && product.price}
                           </ListGroup.Item>
                           <ListGroup.Item>
                           <strong>Status : </strong> {product && product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                           </ListGroup.Item>
                           {product.countInStock > 0 && (
                                   <ListGroup.Item>
                                       <strong>Qty</strong>
                                       <Form.Control as='select' value={qty} onChange={e=> setQty(e.target.value)}> 
                                  {
                                      [...Array(product.countInStock).keys()].map(x => (
                                          <option key={x+1} value={x+1} >
                                              {x+1}

                                          </option>
                                      ))
                                  }


                                  </Form.Control>
           
                               </ListGroup.Item>

                           )}

                           <ListGroup.Item>
                               <Button
                               onClick={addtoCartHandler}
                               className='btn btn-info btn-block' disabled={product && product.countInStock === 0}>
                                   Add to Cart
                               </Button>
                           </ListGroup.Item>
                   </ListGroup>

           </Col>
       </Row>  }
       
       </>
    )
}

export default ProductScreen

