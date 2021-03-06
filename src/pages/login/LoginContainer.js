import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Form, Icon, Input, Button } from 'antd'

import { login } from '../../utils/auth'

const PageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const StyledForm = styled(Form)`
  max-width: 20rem;
  width: 100%;
`

const StyledLoginButton = styled(Button)`
  margin-right: 1rem;
`

class LoginContainerClass extends Component {
  state = {
    loading: false,
    loginError: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        login(values)
          .then(() => {
            window.location = '/products' // For simplicity
          })
          .catch(e => {
            console.log('Error:', e)
            this.props.form.setFields({
              password: {
                errors: [new Error('Invalid user or password')]
              }
            })
          })
          .finally(() => {
            this.setState({ loading: false })
          })
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <PageContent>
        <StyledForm onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Username'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            <StyledLoginButton
              type='primary'
              htmlType='submit'
              loading={this.state.loading}
            >
              {this.state.loading ? <span>Loading</span> : <span>Log in </span>}
            </StyledLoginButton>
            Or <a href='/register'>register now!</a>
          </Form.Item>
        </StyledForm>
      </PageContent>
    )
  }
}

LoginContainerClass.propTypes = {
  form: PropTypes.any.isRequired
}

export const LoginContainer = Form.create({ name: 'login' })(
  LoginContainerClass
)
