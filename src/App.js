import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout } from './components/Layout'

import './index.css'
import { client } from './apollo/client'

class App extends Component {
  render () {
    return (
      <ApolloProvider client={client}>
        <Layout>
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
        </Layout>
      </ApolloProvider>
    )
  }
}

export default App
