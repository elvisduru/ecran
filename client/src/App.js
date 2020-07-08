import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import moment from "moment";

import {
  Layout,
  Menu,
  AutoComplete,
  Input,
  Space,
  Badge,
  Avatar,
  Typography,
  Tooltip,
  Button,
  Affix,
} from "antd";
import {
  AppstoreOutlined,
  CloudDownloadOutlined,
  NotificationOutlined,
  TableOutlined,
  IdcardOutlined,
  SignalFilled,
  ControlOutlined,
  OrderedListOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Logo from "./images/logo-white.png";
import { Dashboard } from "./Scenes/Dashboard";
import { Pending } from "./Scenes/Requests/Pending";
import PageNotFound from "./Scenes/PageNotFound";
import { Approved } from "./Scenes/Requests/Approved";
import { Declined } from "./Scenes/Requests/Declined";
import { Monitoring } from "./Scenes/Monitoring";
import { Reporting } from "./Scenes/Reporting";
import { Profiling } from "./Scenes/Profiling";
import { Auditing } from "./Scenes/Auditing";
import { Maintenance } from "./Scenes/Maintenance/Maintenance";
import { Campaigns } from "./Scenes/Campaigns/Campaigns";
import { Internal } from "./Scenes/Requests/New/Internal";
import { ThirdParty } from "./Scenes/Requests/New/ThirdParty";
import { EditRequest } from "./Scenes/Requests/EditRequest";
import { AddCampaign } from "./Scenes/Campaigns/AddCampaign";
import Axios from "axios";

import HBLogo from "./images/hb-logo.png";
import { useDispatch } from "react-redux";
import { fetchRequests } from "./Scenes/Requests/requestsSlice";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;
const { Text } = Typography;

const links = [
  {
    value: "Dashboard",
    path: "/",
  },
  {
    value: "Pending Requests",
    path: "/requests/pending",
  },
  {
    value: "Approved Requests",
    path: "/requests/approved",
  },
  {
    value: "Declined Requests",
    path: "/requests/declined",
  },
  {
    value: "Campaigns",
    path: "/campaigns",
  },
  {
    value: "Monitoring",
    path: "/monitoring",
  },
  {
    value: "Reporting",
    path: "/reporting",
  },
  {
    value: "Profiling",
    path: "/profiling",
  },
  {
    value: "Maintenance",
    path: "/maintenance",
  },
  {
    value: "Auditing",
    path: "/auditing",
  },
];

function App({ username }) {
  const dispatch = useDispatch();
  // Fetch State
  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  // Sider Hook
  const [collapsed, setCollapse] = useState(false);

  // Autocomplete Hooks
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  // Menu Hooks
  const rootSubmenuKeys = ["sub1", "sub2"];
  const [openKeys, setOpenKeys] = useState([]);

  // Router hooks
  const history = useHistory();

  // Autocomplete handlers
  const onSelect = (value, link) => {
    history.push(link.path);
  };

  const onSearch = (searchText) => {
    setOptions(
      !searchText
        ? []
        : links.filter(
            (link) =>
              link.value.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
          )
    );
  };

  const onChange = (data) => {
    setValue(data);
  };

  // Sider handlers
  const onCollapse = (collapsed) => {
    setCollapse(collapsed);
  };

  // Menu Handlers
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleLogout = () => {
    Axios.get("/logout")
      .then((res) => history.push("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="sider-logo">
          {collapsed ? (
            <span
              style={{
                marginLeft: "9px",
                fontSize: "35px",
                textTransform: "lowercase",
              }}
            >
              &#233;
            </span>
          ) : (
            <img width={150} src={Logo} alt="" />
          )}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["/"]}
          selectedKeys={[history.location.pathname]}
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={({ item, key }) => {
            if (!key.startsWith("/requests") && !key.startsWith("/campaigns")) {
              setOpenKeys([]);
            }
            history.push(key);
          }}
        >
          <Menu.Item key="/" icon={<AppstoreOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="sub1" icon={<CloudDownloadOutlined />} title="Requests">
            <SubMenu key="sub11" title="New Request">
              <Menu.Item key="/requests/new/internal">Internal</Menu.Item>
              <Menu.Item key="/requests/new/3rd-party">3rd Party</Menu.Item>
            </SubMenu>
            <Menu.Item key="/requests/pending">Pending</Menu.Item>
            <Menu.Item key="/requests/approved">Approved</Menu.Item>
            <Menu.Item key="/requests/declined">Declined</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title="Campaigns" icon={<NotificationOutlined />}>
            <Menu.Item key="/campaigns/add">Upload Screen</Menu.Item>
            <Menu.Item key="/campaigns">Campaigns</Menu.Item>
          </SubMenu>
          <Menu.Item key="/monitoring" icon={<SignalFilled />}>
            Monitoring
          </Menu.Item>
          <Menu.Item key="/reporting" icon={<TableOutlined />}>
            Reporting
          </Menu.Item>
          <Menu.Item key="/profiling" icon={<IdcardOutlined />}>
            Profiling
          </Menu.Item>
          <Menu.Item key="/maintenance" icon={<ControlOutlined />}>
            Maintenance
          </Menu.Item>
          <Menu.Item key="/auditing" icon={<OrderedListOutlined />}>
            Auditing
          </Menu.Item>
          <Menu.Item key="#" icon={<QuestionCircleOutlined />}>
            <Tooltip title="Work in progress!">User Guide</Tooltip>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout
        className="site-layout"
        style={{ marginLeft: `${collapsed ? "80px" : "200px"}` }}
      >
        <Affix>
          <Header className="site-header">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 1,
                alignItems: "center",
                borderRight: "1px solid #ddd",
                paddingRight: "30px",
                marginRight: "30px",
              }}
            >
              <AutoComplete
                value={value}
                options={options}
                onSelect={onSelect}
                onChange={onChange}
                onSearch={onSearch}
              >
                <Search placeholder="Search" />
              </AutoComplete>
              <Typography.Text strong>369 Active ATMs</Typography.Text>
              <img height={30} src={HBLogo} alt="" />
            </div>

            <Space size="large" style={{ marginRight: "30px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Badge dot>
                  <BellOutlined style={{ fontSize: "20px" }} />
                </Badge>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar size={40} icon={<UserOutlined />} />
              </div>
              <div style={{ lineHeight: "14px" }}>
                <Text strong style={{ fontSize: "12px" }}>
                  {username}
                </Text>
                <br />
                <Text style={{ fontSize: "11px" }}>Administrator</Text>
              </div>
              <Tooltip title="Logout">
                <Button icon={<LogoutOutlined />} onClick={handleLogout} />
              </Tooltip>
            </Space>
          </Header>
        </Affix>
        <Content style={{ margin: "30px 50px" }}>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/requests/new/internal" component={Internal} />
            <Route path="/requests/new/3rd-party" component={ThirdParty} />
            <Route path="/requests/pending" component={Pending} />
            <Route path="/requests/approved" component={Approved} />
            <Route path="/requests/declined" component={Declined} />
            <Route path="/requests/edit/:id" component={EditRequest} />
            <Route path="/campaigns/add" component={AddCampaign} />
            <Route path="/campaigns" component={Campaigns} />
            <Route path="/monitoring" component={Monitoring} />
            <Route path="/reporting" component={Reporting} />
            <Route path="/profiling" component={Profiling} />
            <Route path="/maintenance" component={Maintenance} />
            <Route path="/auditing" component={Auditing} />
            <Route component={PageNotFound} />
          </Switch>
        </Content>

        <Affix offsetBottom={0}>
          <Footer className="site-footer">
            Ecran ATM Software ©{moment().year()} Created by&nbsp;
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://elvisduru.com"
            >
              Elvis Duru
            </a>
          </Footer>
        </Affix>
      </Layout>
    </Layout>
  );
}

export default App;
