import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { Form, Icon, Input, Button } from 'antd'

import { register } from '../../utils/auth'

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

const StyledRegisterButton = styled(Button)`
  margin-right: 1rem;
`

class RegisterContainerClass extends Component {
  state = {
    loading: false,
    loginError: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (values.password !== values.passwordAgain) {
        this.props.form.setFields({
          passwordAgain: {
            value: values.passwordAgain,
            errors: [new Error('Passwords must match')]
          }
        })
        return
      }
      if (!err) {
        this.setState({
          loading: true
        })
        register(values)
          .then(() => {
            navigate('/login')
          })
          .catch(e => {
            console.log('Error:', e)
            this.props.form.setFields({
              username: {
                errors: [new Error('Invalid user name')]
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
              rules: [{ required: true, message: 'Password' }]
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
            {getFieldDecorator('passwordAgain', {
              rules: [{ required: true, message: 'Re-enter password' }]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                placeholder='Re-enter password'
              />
            )}
          </Form.Item>
          <Form.Item>
            <StyledRegisterButton
              type='primary'
              htmlType='submit'
              loading={this.state.loading}
            >
              {this.state.loading ? (
                <span>Loading</span>
              ) : (
                <span>Register </span>
              )}
            </StyledRegisterButton>
            Already registered? <a href='/login'> Sign in!</a>
          </Form.Item>
        </StyledForm>
      </PageContent>
    )
  }
}

RegisterContainerClass.propTypes = {
  form: PropTypes.any.isRequired
}

export const RegisterContainer = Form.create({ name: 'register' })(
  RegisterContainerClass
)
