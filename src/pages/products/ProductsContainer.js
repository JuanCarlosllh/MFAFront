import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'

import { getProducts } from '../../queries/products.queries'

import { ProductsGrid } from './ProductsGrid'

export class ProductsContainer extends Component {
  render () {
    return (
      <Query query={getProducts} variables={{ limit: 20, offset: 0 }}>
        {({ loading, data, type }) => {
          return (
            <Fragment>
              {loading && <p>Loaing</p>}
              {!loading && <ProductsGrid products={data.products} />}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}
