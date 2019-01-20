import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'

import './index.css'
import { client } from './apollo/client'

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <h1>MyFavouriteAppliances.wow.</h1>
        <Query
          query={gql`
            query Products($limit: Int, $offset: Int) {
              products(limit: $limit, offset: $offset) {
                id
              }
            }
          `}
          variables={{ limit: 4, offset: 0 }}
        >
          {({ loading, data }) => (
            <div>
              {loading && <p>Loaing</p>}
              {!loading && data.products.map(product => <p>{product.id}</p>)}
            </div>
          )}
        </Query>
      </ApolloProvider>
    )
  }
}

export default App
