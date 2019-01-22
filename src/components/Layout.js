import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Layout as AntdLayout, Drawer, Icon } from 'antd'

const { Header, Content } = AntdLayout

const StyledLayout = styled(AntdLayout)`
  min-height: 100%;
`

const StyledHeader = styled(Header)`
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
          <div className='logo' />
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
