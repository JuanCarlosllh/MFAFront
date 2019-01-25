import gql from 'graphql-tag'

export const getCurrentUser = gql`
  query getCurrentUser {
    me {
      id
      username
    }
  }
`

export const getUserFavorites = gql`
  query {
    me {
      id
      favorites {
        id
        name
        image
        type
      }
    }
  }
`
