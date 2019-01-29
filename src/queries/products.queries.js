import gql from 'graphql-tag'

export const getProducts = gql`
  query getProducst(
    $limit: Int
    $offset: Int
    $category: String
    $orderBy: String
    $orderDirection: String
  ) {
    products(
      limit: $limit
      offset: $offset
      category: $category
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      count
      products {
        id
        name
        price
        image
        type
        isOnFavorites
      }
    }
  }
`

export const getLocalProducts = gql`
  query {
    products @client {
      id
      name
      price
      image
      type
      isOnFavorites
    }
  }
`
