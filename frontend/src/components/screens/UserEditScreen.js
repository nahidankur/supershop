import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import Message from '../Message'
import RoundLoader from '../RoundLoader'
import Loader from '../Loader'
import { getUserDetails,getUserDetailsByIdByAdmin, updateUser} from '../../actions/userAction'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import { USER_UPDATE_RESET} from '../../constants/constants'

const UserEditScreen = ({match, history}) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading : loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate
   
    useEffect(()=>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
           history.push('/admin/userlist')
         
        } else {
            if( !user || user._id !== userId ){
                dispatch(getUserDetailsByIdByAdmin(userId))
             } else {
                 setName(user.name)
                 setEmail(user.email)
                 setIsAdmin(user.isAdmin)
             }
        }
    }, [user, dispatch, userId])

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin}))

    }
 
    return (
        <> 
        <Link to='/admin/userlist' className='btn btn-primary my-3' >
            Go Back
        </Link>
        {loadingUpdate && <RoundLoader />}
        {errorUpdate && <ToastContainer
     position="bottom-left"
     autoClose={5000}
     hideProgressBar={false}
      newestOnTop={false}
     closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover/>}
        <h1>Edit User</h1>
        
        { loading ? <Loader /> : error ? <Message>An Error Occured</Message>  : (
            <Card className='p-5'>
            <Row >
                <Col lg='10' >
            {loading && <RoundLoader />}
                <Form onSubmit={e => onSubmit(e)} >
    
                <Form.Group >
              <Form.Label><h5>Your Full Name</h5></Form.Label>
              <Form.Control
               value={name} onChange={e=> setName(e.target.value)}
              type="text" placeholder="Enter Name"  />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label><h5>Email address</h5></Form.Label>
              <Form.Control type="email" 
              value={email} onChange={e=> setEmail(e.target.value)}
              placeholder="Enter Email"  />
            
            </Form.Group>
          
            <Form.Group controlId="isAdmin">
              <Form.Check
               checked={isAdmin} onChange={e=> setIsAdmin(e.target.checked)}
              type="checkbox" label='Is Admin'  />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
                </Col>
            </Row>
            </Card>

        )  }
        
      </>
    )
}

export default UserEditScreen
