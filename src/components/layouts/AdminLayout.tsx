import React from "react";
import { Layout} from "antd";
import Sidebar from "../ui/Sidebar";
const { Header, Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar/>
      <Layout>
        <Header></Header>
        <Content className="p-5">
          <div>content</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
