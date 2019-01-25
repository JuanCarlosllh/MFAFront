import gql from 'graphql-tag'

export const getProducts = gql`
  query getProducst($limit: Int, $offset: Int, $category: String) {
    products(limit: $limit, offset: $offset, category: $category) {
      id
      name
      image
      type
      isOnFavorites
    }
  }
`

export const addProductToFavoritesMutation = gql`
  mutation addProductToFavorites($productId: ID!) {
    addProductToFavorites(productId: $productId) {
      id
    }
  }
`

export const removeProductFromFavoritesMutation = gql`
  mutation removeFromFavorites($productId: ID!) {
    removeFromFavorites(productId: $productId) {
      id
    }
  }
`
