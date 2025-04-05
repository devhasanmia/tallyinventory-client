import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: "s",
        label: `Dashboard`,

    }
]

const AdminLayout: React.FC = () => {
  return (
    <Layout  style={{height:"100vh"}}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div style={{
          height: "32px",
          margin: "16px",
          textAlign: "center",
          color: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
        }}>Tally Inv.</div>
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            content
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Tally Inventory ©{new Date().getFullYear()} Created by MD. HASAN MIA
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;