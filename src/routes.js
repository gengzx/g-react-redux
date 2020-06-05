'use strict';

/**
 * React-router 路由
 */

import React, { Component } from 'react';

import { HashRouter as Router, Route, IndexRoute } from 'react-router-dom'
 
import { LazyLoad } from '@/bundle';

const Default = LazyLoad(require(`bundle-loader?lazy&name=[name]!./views/Default/Default`))

//const Test = LazyLoad(require(`bundle-loader?lazy&name=[name]!./views/Create/Widget/Files`))

/*
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
)*/


// 路由
class Routes extends Component {

  componentDidMount(){

  }

  componentWillUnmount() {

  }

   render() {
      return (
    
        <Router>
          <div style={{ height: '100%', width: '100%' }}>
            <Route exact path="/" component={Default} />
          </div>
        </Router>
          
      );
   }
}

export default Routes
