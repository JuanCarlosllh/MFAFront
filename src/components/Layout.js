import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import styled from '@emotion/styled'
import { Layout as AntdLayout, Drawer, Icon, Button } from 'antd'
import { navigate } from '@reach/router'

import { logOut } from '../utils/auth'
import { getCurrentUser } from '../queries/users.queries'

const { Header, Content } = AntdLayout

const StyledLayout = styled(AntdLayout)`
  min-height: 100%;
`
const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`
const StyledContent = styled(Content)`
  padding: 1.5rem;
  margin: 0;
`
const DrawerIcon = styled(Icon)`
  color: #fff;
  font-size: 1.2rem;
`

export class Layout extends Component {
  state = {
    isDraweOpen: false
  }

  openDrawer = () => {
    this.setState({
      isDraweOpen: true
    })
  }

  closeDrawer = () => {
    this.setState({
      isDraweOpen: false
    })
  }

  onLogIn = () => {
    navigate('/login')
  }

  onLogoutClick = () => {
    navigate('/login')
    logOut()
  }

  render () {
    const { children } = this.props
    return (
      <StyledLayout>
        <Drawer
          title='Basic Drawer'
          placement='left'
          closable={false}
          onClose={this.closeDrawer}
          visible={this.state.isDraweOpen}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <StyledHeader>
          <DrawerIcon
            type='menu-unfold'
            className='trigger'
            onClick={this.openDrawer}
          />
          <Query query={getCurrentUser}>
            {({ loading, data }) => {
              if (!loading && !data) {
                return (
                  <Button ghost onClick={this.onLogoutClick}>
                    Log in
                  </Button>
                )
              } else if (!loading && data) {
                return (
                  <Button ghost type='danger' onClick={this.onLogoutClick}>
                    Log Out
                  </Button>
                )
              }
              return <p>Loading</p>
            }}
          </Query>
        </StyledHeader>
        <AntdLayout style={{ padding: '0 24px 24px' }}>
          <StyledContent>{children}</StyledContent>
        </AntdLayout>
      </StyledLayout>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
