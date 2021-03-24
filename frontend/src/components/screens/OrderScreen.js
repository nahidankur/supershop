import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import { Row, Col, Form, Button, ListGroup, Image, Card } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import RoundLoader from '../RoundLoader'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import Loader from '../Loader'
import Message from '../Message'
import { getOrderDetails} from '../../actions/orderAction'

const OrderScreen = ({match}) => {
    const orderId = match.params.id
    const dispatch  = useDispatch()
    const cart = useSelector(state => state.cart)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error } = orderDetails


    if(!loading){
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
      order.itemsPrice = addDecimals(
        order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )

    }

    useEffect(()=>{
       dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])
    

    return ( loading ? <Loader /> : error ? <ToastContainer position="bottom-left" autoClose={5000} 
    hideProgressBar={false} newestOnTop={false} 
    closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> : <>
    <h1>Order {(order._id).toUpperCase()} </h1>
     <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                   <p> <strong>Name: </strong> { order.user.name } </p>
                   <p><strong>Email: </strong><a href={`mailto:${order.user.email}`} >{order.user.email}</a> </p> 
                    <p>
                        <strong>Address: </strong>
                        { order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {' '}
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : <Message variant='danger'>
                  Not Delivered Yet
                  </Message>}

                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                    <strong>Method: </strong> {order.paymentMethod}
                    </p>
                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>
                  Not Paid Yet
                  </Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? <Message variant='info'>Your Order is Empty</Message> : <ListGroup variant='flush'>
                       {order.orderItems.map((item, index)=> (
                           <ListGroup.Item key={index}>
                               <Row>
                                   <Col md={1}>
                                       <Image className='mb-2' src={item.image} alt={item.name} fluid rounded></Image>
                                   </Col>
                                   <Col>
                                   <Link  to={`/product/${item.product}`}>
                                       {item.name}
                                   </Link>
                                   </Col>
                                   <Col md={4}>
                                       {item.qty} x ${item.price} = ${(item.qty*item.price).toFixed(2)}
                                   </Col>
                               </Row>

                           </ListGroup.Item>
                       ))}
                        </ListGroup>}
                </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3 className='text-center'>Order Summery</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Items
                            </Col>
                            <Col><i className='fas fa-dollar-sign' style={{color: 'green'}}></i> {order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                          Shipping
                            </Col>
                            <Col><i className='fas fa-dollar-sign' style={{color: 'green'}}></i> {order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Tax
                            </Col>
                            <Col><i className='fas fa-dollar-sign' style={{color: 'green'}}></i> {order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Total Cost
                            </Col>
                            <Col><i className='fas fa-dollar-sign' style={{color: 'green'}}></i> {order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                  

                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
       
    )
}

export default OrderScreen
