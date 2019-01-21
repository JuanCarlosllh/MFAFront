import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Router } from '@reach/router'

import './index.css'
import { client } from './apollo/client'
import { Layout } from './components/Layout'
import { ProductsContainer } from './pages/products/ProductsContainer'

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Layout>
          <Router>
            <ProductsContainer path='products' />
          </Router>
        </Layout>
      </ApolloProvider>
    )
  }
}

export default App
