import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { Button, Modal, Input } from 'antd'

import {
  getUserFavorites,
  removeProductFromFavoritesMutation,
  shareFavoritesMutation
} from '../../queries/favorites.queries'

import { ProductsGrid } from '../../components/ProductsGrid'

export class FavoritesContainer extends Component {
  state = {
    shareModalOpen: false,
    shareModalLoading: false,
    shareWidth: ''
  }
  onOpenShareModal = () => this.setState({ shareModalOpen: true })
  onCloseShareModal = () => this.setState({ shareModalOpen: false })
  onSharedWidthChanged = e => this.setState({ shareWidth: e.target.value })

  render () {
    return (
      <Fragment>
        <h1>Favorites</h1>
        <Button type='primary' icon='share-alt' onClick={this.onOpenShareModal}>
          Sare list
        </Button>
        <Mutation mutation={shareFavoritesMutation}>
          {shareWidth => (
            <Modal
              title='Share favorites list'
              visible={this.state.shareModalOpen}
              onCancel={this.onCloseShareModal}
              footer={[
                <Button key='back' onClick={this.onCloseShareModal}>
                  Cancel
                </Button>,
                <Button
                  key='submit'
                  type='primary'
                  loading={this.stateshareModalLoading}
                  onClick={() =>
                    shareWidth({
                      variables: { toUserName: this.state.shareWidth }
                    })
                  }
                >
                  Share
                </Button>
              ]}
            >
              <p>Share with user:</p>
              <Input
                placeholde='User name'
                onChange={this.onSharedWidthChanged}
                value={this.state.shareWidth}
              />
            </Modal>
          )}
        </Mutation>
        <Query query={getUserFavorites} fetchPolicy='network-only'>
          {({ loading, data, type, ...rest }) => {
            return (
              <Fragment>
                {loading && <p>Loaing</p>}
                {!loading && data && (
                  <Mutation
                    mutation={removeProductFromFavoritesMutation}
                    update={(cache, { data }) => {
                      const { favorites } = cache.readQuery({
                        query: getUserFavorites
                      })
                      cache.writeQuery({
                        query: getUserFavorites,
                        data: {
                          favorites: favorites.filter(
                            f => f.id !== data.removeFromFavorites.id
                          )
                        }
                      })
                    }}
                  >
                    {removeFromFavorites => (
                      <ProductsGrid
                        products={data.favorites}
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
      </Fragment>
    )
  }
}
