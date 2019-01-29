import React, { Component, Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import styled from '@emotion/styled'
import { Select, Pagination } from 'antd'

import { getProducts } from '../../queries/products.queries'
import { addProductToFavoritesMutation } from '../../queries/favorites.queries'
import { ProductsGrid } from '../../components/ProductsGrid'

const Option = Select.Option

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
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

const PaginatorContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`

export class ProductsContainer extends Component {
  state = {
    category: 'small-appliances',
    orderBy: 'name',
    orderDirection: 'ASC',
    limit: 20,
    offset: 0,
    page: 0
  }

  onCategoryChanged = category => this.setState({ category })
  onOrderByChanged = orderBy => this.setState({ orderBy })
  onOrderDirectionChanged = orderDirection => this.setState({ orderDirection })
  onPaginaterChanged = page => {
    this.setState({
      offset: this.state.limit * (page - 1),
      page
    })
    window.scrollTo(0, 0)
  }

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
          fetchPolicy={'cache-and-network'}
          variables={{
            limit: this.state.limit,
            offset: this.state.offset,
            category: this.state.category,
            orderBy: this.state.orderBy,
            orderDirection: this.state.orderDirection
          }}
        >
          {({ loading, data }) => {
            return (
              <Fragment>
                {loading && <p>Loaing</p>}
                {!loading && (
                  <Fragment>
                    <Mutation
                      mutation={addProductToFavoritesMutation}
                      update={async (cache, { data }) => {
                        const productsLocalResponse = cache.readQuery({
                          query: getProducts,
                          variables: {
                            limit: this.state.limit,
                            offset: this.state.offset,
                            category: this.state.category,
                            orderBy: this.state.orderBy,
                            orderDirection: this.state.orderDirection
                          }
                        })
                        productsLocalResponse.products.products = productsLocalResponse.products.products.map(
                          product => ({
                            ...product,
                            isOnFavorites: product.isOnFavorites
                              ? true
                              : data.addProductToFavorites.id === product.id
                          })
                        )
                        cache.writeQuery({
                          query: getProducts,
                          data: productsLocalResponse
                        })
                      }}
                    >
                      {addToFavorites => (
                        <ProductsGrid
                          products={data.products.products}
                          actions={[
                            {
                              icon: 'heart',
                              onClick: id =>
                                addToFavorites({
                                  variables: { productId: id },
                                  optimisticResponse: {
                                    __typename: 'Mutation',
                                    addProductToFavorites: {
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

                    <PaginatorContainer>
                      <Pagination
                        defaultPageSize={this.state.limit}
                        defaultCurrent={this.state.page}
                        total={data.products.count}
                        onChange={this.onPaginaterChanged}
                      />
                    </PaginatorContainer>
                  </Fragment>
                )}
              </Fragment>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}
