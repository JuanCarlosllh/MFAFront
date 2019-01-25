import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import {
  getProducts,
  addProductToFavoritesMutation
} from '../../queries/products.queries'

import { ProductsGrid } from '../../components/ProductsGrid'

export class ProductsContainer extends Component {
  render () {
    return (
      <Query query={getProducts} variables={{ limit: 20, offset: 0 }}>
        {({ loading, data, type }) => {
          return (
            <Fragment>
              {loading && <p>Loaing</p>}
              {!loading && (
                <Mutation
                  mutation={addProductToFavoritesMutation}
                  update={(cache, { data }) => {
                    cache.writeFragment({
                      id: `Product:${data.addProductToFavorites.id}`,
                      fragment: gql`
                        fragment myProduct on Product {
                          id
                        }
                      `,
                      data: {
                        id: data.addProductToFavorites.id,
                        isOnFavorites: true,
                        __typename: 'Product'
                      }
                    })
                    console.log(`Product:${data.addProductToFavorites.id}`)
                  }}
                >
                  {addToFavorites => (
                    <ProductsGrid
                      products={data.products}
                      actions={[
                        {
                          icon: 'heart',
                          onClick: id =>
                            addToFavorites({ variables: { productId: id } })
                        }
                      ]}
                    />
                  )}
                </Mutation>
              )}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}
