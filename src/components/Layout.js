import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Layout as AntdLayout, Menu } from 'antd'

const { Header, Content, Sider } = AntdLayout

const StyledLayout = styled(AntdLayout)`
  height: 100%;
`

const StyledContent = styled(Content)`
  background-color: '#fff';
  padding: 1.5rem;
  margin: 0;
`

export const Layout = ({ children }) => (
  <StyledLayout>
    <Header className='header'>
      <div className='logo' />
    </Header>
    <AntdLayout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key='1'>Small Appliances</Menu.Item>
          <Menu.Item key='2'>Dishwashers</Menu.Item>
        </Menu>
      </Sider>
      <AntdLayout style={{ padding: '0 24px 24px' }}>
        <StyledContent
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          {children}
        </StyledContent>
      </AntdLayout>
    </AntdLayout>
  </StyledLayout>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
