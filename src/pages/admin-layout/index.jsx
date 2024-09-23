import React, { useState } from 'react';
import './style.scss'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label: 'Home',
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label: 'Payments',
  },
  {
    key: '3',
    icon: <ContainerOutlined />,
    label: 'Groups',
  },
  {
    key: '4',
    icon: <MailOutlined />,
    label: 'My pointers',
  },
  {
    key: '5',
    icon: <DesktopOutlined />,
    label: 'Rating',
  },
  {
    key: '5',
    icon: <ContainerOutlined />,
    label: 'Shop',
  },
  {
    key: '6',
    icon: <AppstoreOutlined/>,
    label: 'Settings'
  }
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default App;