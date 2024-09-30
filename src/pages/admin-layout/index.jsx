import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import {admin} from '../../routes/routes'
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='min-h-[100vh]'>
      <h1 className='text-[#ffc04a] text-[30px] font-bold text-center mt-2 mb-2'>TexnoArk</h1>
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
            background: colorBgContainer,
          }}
        >
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