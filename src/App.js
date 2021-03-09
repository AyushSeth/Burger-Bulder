import React, { Component } from 'react'


import {Route , Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  render() {
    return (
      // <BrowserRouter>
        <div className="App">
          
          <Layout>
            
            <Switch>
              <Route path="/checkout" component={Checkout} /> 
              <Route path="/orders" component={Orders} /> 
              <Route path="/" exact component={BurgerBuilder} /> 
              {/* <BurgerBuilder /> */}
              {/* <Checkout /> */}
            </Switch>
            
          </Layout>
        </div>
        // </BrowserRouter>
      );
    }
}

export default App;
