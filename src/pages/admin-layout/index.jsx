import React, { useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { NavLink, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Divider, Space, Tooltip } from 'antd';
import {admin} from '../../routes/routes'
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const removeToken = () => {
    window.localStorage.removeItem('access_token')
    window.localStorage.removeItem("first_name")
    window.localStorage.removeItem("last_name")
    window.localStorage.removeItem("phone_number")
    window.localStorage.removeItem("email")
    window.localStorage.removeItem("password")
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='min-h-[100vh]'>
      <h1 className='text-[#ffc04a] text-[30px] font-bold text-center mt-2 mb-2'>TechnoArk</h1>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={admin.map((item, index) => ({
            key: index + 1,
            icon: item.icon,
            label: <NavLink to={item.path}>{item.content}</NavLink>,
         }))}
        />
      </Sider>
      <Layout>
        <div className='flex items-center justify-between container'>
        <Header
          style={{
            padding: 0,
            backgroundColor: colorBgContainer,
            width: "100%"
          }}
          >
            <div className='flex items-center justify-between w-[96%]'>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
            />
            <Tooltip
            title="Are you sure logout?"
            color='red'
            >
            <NavLink onClick={removeToken} to='/' className='text-[19px] h-full'>
            <LogoutOutlined />
            </NavLink>
            </Tooltip>
            </div>
        </Header>
        </div>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          >
          <Outlet/>
        </Content>
      </Layout>
      </Layout>
  );
};
export default App;