import config from '../config'
const axios = require('axios')

export const checkAuth = () => !!window.sessionStorage.getItem('token')

export const login = async userData => {
  try {
    const auth = await axios.post(`${config.GATEWAY_URL}/login`, userData)
    window.sessionStorage.setItem('token', auth.data.token)
  } catch (e) {
    console.error(e)
    throw new Error('Login error')
  }
}

export const getToken = () => `Bearer ${window.sessionStorage.getItem('token')}`
