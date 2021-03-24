import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container } from 'react-bootstrap'
import setAuthToken from './utils/setAuthToken'
import ProductScreen from './components/screens/ProductScreen'
import HomeScreeen from './components/screens/HomeScreeen'
import CartScreen from './components/screens/CartScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import ShippingScreen from './components/screens/ShippingScreen'
import PaymentScreen from './components/screens/PaymentScreen'
import PlaceOrderScreen from './components/screens/PlaceOrderScreen'
import OrderScreen from './components/screens/OrderScreen'

// if(localStorage.token){
//   setAuthToken(localStorage.token)
// }


const App =()=> {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/profile' component={ProfileScreen} />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/login' component={LoginScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/' component={HomeScreeen} exact />

        </Container>
      
      </main>
      
      <Footer />

    </Router>
  );
}

export default App;
