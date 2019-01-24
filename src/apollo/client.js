import ApolloClient from 'apollo-boost'

import config from '../config'
import { getToken } from '../utils/auth'

export const client = new ApolloClient({
  uri: `${config.GATEWAY_URL}/graphql`,
  fetchOptions: {
    credentials: 'include'
  },
  request: async operation => {
    const token = getToken()
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  }
})
