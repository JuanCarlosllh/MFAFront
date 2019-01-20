import ApolloClient from 'apollo-boost'

import config from '../config'

console.log(config)

export const client = new ApolloClient({
  uri: config.GATEWAY_URL
})
