import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'

import { removeProductFromFavoritesMutation } from '../../queries/products.queries'

import { getUserFavorites } from '../../queries/users.queries'

import { ProductsGrid } from '../../components/ProductsGrid'

console.log(getUserFavorites)
console.log(getUserFavorites)

export class FavoritesContainer extends Component {
  render () {
    return (
      <Query query={getUserFavorites}>
        {({ loading, data, type, ...rest }) => {
          return (
            <Fragment>
              {loading && <p>Loaing</p>}
              {!loading && data && (
                <Mutation
                  mutation={removeProductFromFavoritesMutation}
                  update={(cache, { data }) => {
                    const { me } = cache.readQuery({
                      query: getUserFavorites
                    })
                    cache.writeQuery({
                      query: getUserFavorites,
                      data: {
                        me: {
                          ...me,
                          favorites: me.favorites.filter(
                            f => f.id !== data.removeFromFavorites.id
                          )
                        }
                      }
                    })
                  }}
                >
                  {removeFromFavorites => (
                    <ProductsGrid
                      products={data.me.favorites}
                      actions={[
                        {
                          icon: 'delete',
                          onClick: id =>
                            removeFromFavorites({
                              variables: { productId: id },
                              optimisticResponse: {
                                __typename: 'Mutation',
                                removeFromFavorites: {
                                  __typename: 'Product',
                                  id
                                }
                              }
                            })
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
