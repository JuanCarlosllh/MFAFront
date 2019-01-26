import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import { Select } from 'antd'

import {
  getProducts,
  addProductToFavoritesMutation
} from '../../queries/products.queries'

import { ProductsGrid } from '../../components/ProductsGrid'

const Option = Select.Option

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`
const SelectContainer = styled.div`
  width: 10rem;
  margin-bottom: 2rem;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`
const StyledSelect = styled(Select)`
  width: 100%;
`

export class ProductsContainer extends Component {
  state = {
    category: 'small-appliances',
    orderBy: 'name',
    orderDirection: 'ASC'
  }

  onCategoryChanged = category => this.setState({ category })
  onOrderByChanged = orderBy => this.setState({ orderBy })
  onOrderDirectionChanged = orderDirection => this.setState({ orderDirection })

  render () {
    return (
      <Fragment>
        <h1>Product list</h1>
        <FilterContainer>
          <SelectContainer>
            <p>Category</p>
            <StyledSelect
              defaultValue='small-appliances'
              onChange={this.onCategoryChanged}
            >
              <Option value='small-appliances'>Small Appliances</Option>
              <Option value='dishwashers'>Dishwashers</Option>
            </StyledSelect>
          </SelectContainer>
          <SelectContainer>
            <p>Order by</p>
            <StyledSelect defaultValue='name' onChange={this.onOrderByChanged}>
              <Option value='name'>Name</Option>
              <Option value='price'>Price</Option>
            </StyledSelect>
          </SelectContainer>
          <SelectContainer>
            <p>Order direction</p>
            <StyledSelect
              defaultValue='ASC'
              onChange={this.onOrderDirectionChanged}
            >
              <Option value='ASC'>Ascending</Option>
              <Option value='DESC'>Descending</Option>
            </StyledSelect>
          </SelectContainer>
        </FilterContainer>
        <Query
          query={getProducts}
          variables={{
            limit: 20,
            offset: 0,
            category: this.state.category,
            orderBy: this.state.orderBy,
            orderDirection: this.state.orderDirection
          }}
        >
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
      </Fragment>
    )
  }
}
