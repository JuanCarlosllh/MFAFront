import ApolloClient from 'apollo-boost'

import config from '../config'
import { getToken } from '../utils/auth'

console.log(config)

export const client = new ApolloClient({
  uri: `${config.GATEWAY_URL}/graphql`,
  headers: {
    Authorization: getToken()
  }
})
