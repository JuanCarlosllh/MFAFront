import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Router } from '@reach/router'

import './index.css'
import { client } from './apollo/client'
import { Layout } from './components/Layout'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { ProductsContainer } from './pages/products/ProductsContainer'
import { LoginContainer } from './pages/login/LoginContainer'
import { FavoritesContainer } from './pages/favorites/FavoritesContainer'
import { RegisterContainer } from './pages/register/registerContainer'

class App extends Component {
  componentDidCatch (error, info) {
    console.log(error, info)
  }

  render () {
    return (
      <ApolloProvider client={client}>
        <Layout>
          <Router>
            <ProtectedRoutes path='/'>
              <ProductsContainer path='products' />
              <FavoritesContainer path='favorites' />
            </ProtectedRoutes>
            <LoginContainer path='/login' />
            <RegisterContainer path='/register' />
          </Router>
        </Layout>
      </ApolloProvider>
    )
  }
}

export default App
