import React, { useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import moment from 'moment'

import { Layout, Menu, AutoComplete, Input, Space, Badge, Avatar, Typography, Tooltip, Button } from 'antd'
import { AppstoreOutlined, CloudDownloadOutlined, NotificationOutlined, TableOutlined, IdcardOutlined, SignalFilled, ControlOutlined, OrderedListOutlined, BellOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Logo } from './components/Logo'
import { Dashboard } from './Scenes/Dashboard'
import { Pending } from './Scenes/Requests/Pending'
import PageNotFound from './Scenes/PageNotFound'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const { Search } = Input
const { Text } = Typography

const links = [
  {
    value: 'Dashboard',
    path: "/"
  },
  {
    value: 'Pending Requests',
    path: "/requests/pending"
  },
  {
    value: 'Approved Requests',
    path: "/requests/approved"
  },
  {
    value: 'Declined Requests',
    path: "/requests/declined"
  },
  {
    value: 'Recent Campaigns',
    path: "/campaigns/recent"
  },
  {
    value: 'Pending Campaigns',
    path: "/campaigns/pending"
  },
  {
    value: 'All Campaigns',
    path: "/campaigns/all"
  },
  {
    value: 'Monitoring',
    path: "/monitoring"
  },
  {
    value: 'Reporting',
    path: "/reporting"
  },
  {
    value: 'Profiling',
    path: "/profiling"
  },
  {
    value: 'Maintenance',
    path: "/maintenance"
  },
  {
    value: 'Auditing',
    path: "/auditing"
  },
]

function App() {
  // Sider Hook
  const [collapsed, setCollapse] = useState(false)

  // Autocomplete Hooks
  const [value, setValue] = useState('')
  const [options, setOptions] = useState([])

  // Menu Hooks
  const rootSubmenuKeys = ['sub1', 'sub2']
  const [openKeys, setOpenKeys] = useState([])

  // Router hooks
  const history = useHistory()

  // Autocomplete handlers
  const onSelect = (value, link) => {
    history.push(link.path)
  };

  const onSearch = searchText => {
    setOptions(!searchText ? [] : links.filter(link => link.value.toUpperCase().indexOf(searchText.toUpperCase()) !== -1))
  }

  const onChange = data => {
    setValue(data)
  };

  // Sider handlers
  const onCollapse = collapsed => {
    setCollapse(collapsed)
  }

  // Menu Handlers
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="sider-logo">
          <Logo style={{ fontSize: '20px', color: 'white' }} /> {!collapsed ? <span style={{ marginLeft: '10px' }}>Ecran</span> : null}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['/']}
          selectedKeys={[history.location.pathname]}
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={({ item, key }) => history.push(key)}
        >
          <Menu.Item key="/" icon={<AppstoreOutlined />}>Dashboard</Menu.Item>
          <SubMenu key="sub1" icon={<CloudDownloadOutlined />} title="Requests">
            <Menu.Item key="/requests/pending">Pending</Menu.Item>
            <Menu.Item key="/requests/approved">Approved</Menu.Item>
            <Menu.Item key="/requests/declined">Declined</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<NotificationOutlined />} title="Campaigns">
            <Menu.Item key="/campaigns/recent">Recent</Menu.Item>
            <Menu.Item key="/campaigns/pending">Pending</Menu.Item>
            <Menu.Item key="/campaigns/all">View All</Menu.Item>
          </SubMenu>
          <Menu.Item key="/monitoring" icon={<SignalFilled />}>Monitoring</Menu.Item>
          <Menu.Item key="/reporting" icon={<TableOutlined />}>Reporting</Menu.Item>
          <Menu.Item key="/profiling" icon={<IdcardOutlined />}>Profiling</Menu.Item>
          <Menu.Item key="/maintenance" icon={<ControlOutlined />}>Maintenance</Menu.Item>
          <Menu.Item key="/auditing" icon={<OrderedListOutlined />}>Auditing</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-header">
          <AutoComplete
            value={value}
            options={options}
            onSelect={onSelect}
            onChange={onChange}
            onSearch={onSearch}
          >
            <Search placeholder="Search" />
          </AutoComplete>
          <Space size="large" style={{ marginRight: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Badge dot>
                <BellOutlined style={{ fontSize: '20px' }} />
              </Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={40} icon={<UserOutlined />} />
            </div>
            <div style={{ lineHeight: '14px' }}>
              <Text strong style={{ fontSize: '12px' }}>User12345</Text>
              <br />
              <Text style={{ fontSize: '11px' }}>Administrator</Text>
            </div>
            <Tooltip title="Logout">
              <Button icon={<LogoutOutlined />} />
            </Tooltip>
          </Space>
        </Header>

        <Content style={{ margin: '30px 50px' }}>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/requests/pending" component={Pending} />
            <Route component={PageNotFound} />
          </Switch>
        </Content>

        <Footer className="site-footer">Ecran ATM Software ©{moment().year()} Created by&nbsp;<a rel="noopener noreferrer" target="_blank" href="https://elvisduru.com">Elvis Duru</a></Footer>
      </Layout>
    </Layout>
  );
}

export default App
