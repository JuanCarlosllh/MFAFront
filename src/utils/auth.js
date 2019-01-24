import config from '../config'
const axios = require('axios')

export const checkAuth = () => !!window.sessionStorage.getItem('token')

export const login = async userData => {
  try {
    const auth = await axios.post(`${config.GATEWAY_URL}/login`, userData)
    window.sessionStorage.setItem('token', auth.data.token)
    return auth
  } catch (e) {
    console.error(e)
    throw new Error('Login error')
  }
}

export const logOut = () => window.sessionStorage.removeItem('token')

export const getToken = () => `Bearer ${window.sessionStorage.getItem('token')}`

export const register = async userData => {
  try {
    const register = await axios.post(
      `${config.GATEWAY_URL}/register`,
      userData
    )
    return register
  } catch (e) {
    console.log('ERROR')
    console.error(e)
    throw new Error('Register error')
  }
}
