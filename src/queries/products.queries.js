import gql from 'graphql-tag'

export const getProducts = gql`
  query getProducst($limit: Int, $offset: Int, $category: String) {
    products(limit: $limit, offset: $offset, category: $category) {
      id
      name
      image
      type
    }
  }
`
