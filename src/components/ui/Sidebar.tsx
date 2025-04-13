import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { BsPersonLinesFill, BsPersonFillCheck } from "react-icons/bs";
const items = [
    {
      key: "dashboard",
      label: `Dashboard`,
      icon: <TbLayoutDashboardFilled/>
    },
    {
      key: "People",
      label: `People`,
      icon: <IoPeople/>,
      children: [
        {
          key: "Customer",
          label: "Customer",
          icon: <BsPersonFillCheck/>
        },
        {
          key: "dealer",
          label: "Dealer",
          icon: <BsPersonLinesFill/>
        },
      ],
    },
    {
      key: "settings",
      label: `Settings`,
      icon:  <IoMdSettings/>
      
    },
  ];
const Sidebar = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0" style={{ height: "100vh" }}>
      <div
        style={{
          height: "32px",
          margin: "16px",
          textAlign: "center",
          color: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Tally Inv.
      </div>
      <Menu theme="dark" mode="inline" items={items} />
    </Sider>
  );
};

export default Sidebar;
