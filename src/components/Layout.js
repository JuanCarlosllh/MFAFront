import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import styled from '@emotion/styled'
import { Layout as AntdLayout, Drawer, Icon, Button, Menu } from 'antd'
import { navigate } from '@reach/router'

import { logOut } from '../utils/auth'
import { getCurrentUser } from '../queries/users.queries'

const { Header, Content } = AntdLayout

const StyledLayout = styled(AntdLayout)`
  margin-top: 4rem;
  min-height: 100%;
`
const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  z-index: 5;
`
const StyledContent = styled(Content)`
  padding: 1.5rem;
  margin: 0;
`
const DrawerIcon = styled(Icon)`
  color: #fff;
  font-size: 1.2rem;
`

const StyledDrawer = styled(Drawer)`
  padding: 0;
  margin-top: 1rem;
  .ant-drawer-body {
    padding: 0;
    margin-top: 2rem;
  }
`

const LoginInfo = styled.div`
  display: flex;
  align-items: center;
`

const LoginInfoName = styled.span`
  color: #fff;
  margin-right: 1rem;
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

  onLogoutClick = refetch => {
    navigate('/login')
    logOut()
    if (refetch) refetch()
  }

  onLoginClick = () => {
    navigate('/login')
  }

  onMenuItemClick = page => {
    this.closeDrawer()
    navigate(page)
  }

  render () {
    const { children } = this.props
    return (
      <StyledLayout>
        <StyledDrawer
          title='MyFavouriteAppliances'
          placement='left'
          closable={false}
          onClose={this.closeDrawer}
          visible={this.state.isDraweOpen}
        >
          <Menu mode='inline'>
            <Menu.Item
              key='Products'
              onClick={() => {
                this.onMenuItemClick('products')
              }}
            >
              <Icon type='shop' />
              <span>Products</span>
            </Menu.Item>
            <Menu.Item
              key='Favorites'
              onClick={() => {
                this.onMenuItemClick('favorites')
              }}
            >
              <Icon type='heart' />
              <span>Favorites</span>
            </Menu.Item>
          </Menu>
        </StyledDrawer>
        <StyledHeader>
          <DrawerIcon
            type='menu-unfold'
            className='trigger'
            onClick={this.openDrawer}
          />
          <Query query={getCurrentUser}>
            {({ loading, data, refetch, error }) => {
              if ((!loading && !data) || error) {
                return (
                  <Button ghost onClick={this.onLoginClick}>
                    Log in
                  </Button>
                )
              } else if (!loading && data) {
                return (
                  <LoginInfo>
                    <LoginInfoName>Hi, {data.me.username}</LoginInfoName>
                    <Button
                      ghost
                      type='danger'
                      onClick={() => this.onLogoutClick(refetch)}
                    >
                      Log Out
                    </Button>
                  </LoginInfo>
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
