import React from 'react'
import { Link} from 'react-router-dom'
import {Row, Col, Button, Image, ListGroup, Card } from 'react-bootstrap'
import Rating from '../Rating'
import products from '../../products'

const ProductScreen = ({match}) => {

    const product = products.find(product => product._id === match.params.id ) 
    return (
       <>
       <Link className='btn btn-primary my-3' to='/'>
           Go Back
       </Link>
       <Row>
           <Col md={6}>
               <Image src={product.image} alt={product.name} fluid />
            
           </Col>

           <Col md={3}>
               <ListGroup variant='flush'>
                   <ListGroup.Item>
                       <h2>{product.name}</h2>
                       </ListGroup.Item>
                    <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Price : </strong> ${product.price}

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Description : </strong> {product.description}

                    </ListGroup.Item>

               </ListGroup>
           </Col>

           <Col md={3}>
               
                   <ListGroup>
                       <ListGroup.Item>
                            <strong>Price : </strong> ${product.price}
                           </ListGroup.Item>
                           <ListGroup.Item>
                           <strong>Status : </strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Button className='btn btn-info btn-block' disabled={product.countInStock === 0}>
                                   Add to Cart
                               </Button>
                           </ListGroup.Item>
                   </ListGroup>

           </Col>
       </Row>
       </>
    )
}

export default ProductScreen
