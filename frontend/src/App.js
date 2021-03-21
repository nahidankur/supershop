import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container } from 'react-bootstrap'
import ProductScreen from './components/screens/ProductScreen'
import HomeScreeen from './components/screens/HomeScreeen'
import CartScreen from './components/screens/CartScreen'

const App =()=> {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
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
