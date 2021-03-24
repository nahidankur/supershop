import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import { Row, Col, Table, Form, Button, Card } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch } from 'react-redux'
import Message from '../Message'
import RoundLoader from '../RoundLoader'
import { getUserDetails, updateUserProfile} from '../../actions/userAction'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"
import Loader from '../Loader'
import { USER_UPDATE_PROFILE_RESET} from '../../constants/constants'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
  
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

  
    useEffect(() => {
      if (!userInfo) {
        history.push('/login')
      } else {
        if (!user || !user.name || success) {
          dispatch({type: USER_UPDATE_PROFILE_RESET})
          dispatch(getUserDetails('profile'))
       
        } else {
         
          setName(user.name)
          setEmail(user.email)
        }
      }
    }, [dispatch, history, userInfo, user, success])
  
    const submitHandler = (e) => {
      e.preventDefault()
      if (password !== confirmPassword) {
        setMessage(toast.error('Password Did not Match!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          }))
      } else {
        dispatch(updateUserProfile({
          _id: user._id, name, email, password
        }))

      }
    }
    return (
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          { loading && <Loader />}
          <ToastContainer position="bottom-left" autoClose={5000} 
            hideProgressBar={false} newestOnTop={false} 
            closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> 
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          
        </Col>
     
      </Row>
    )
  }
  export default ProfileScreen  
