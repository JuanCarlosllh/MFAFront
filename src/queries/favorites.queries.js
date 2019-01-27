import gql from 'graphql-tag'

export const getUserFavorites = gql`
  query {
    favorites {
      id
      name
      image
      type
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
export const shareFavoritesMutation = gql`
  mutation($toUserName: String!) {
    shareFavorites(toUserName: $toUserName)
  }
`
