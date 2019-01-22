import React from 'react'
import { Redirect } from '@reach/router'

const { checkAuth } = require('../utils/auth')

export class ProtectedRoutes extends React.Component {
  render () {
    return checkAuth() ? this.props.children : <Redirect to='/login' noThrow />
  }
}
