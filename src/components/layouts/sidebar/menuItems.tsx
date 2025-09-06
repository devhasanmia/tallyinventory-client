import { AiFillDashboard, AiFillProduct } from "react-icons/ai";
import {
  HiSquare3Stack3D,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { TbReportAnalytics } from "react-icons/tb";
import { LuSettings, LuUserPlus } from "react-icons/lu";
import {
  MdManageAccounts,
  MdMenuBook,
  MdOutlineWorkspacePremium,
} from "react-icons/md";
import { IoBagAdd, IoPeopleSharp } from "react-icons/io5";
import { ImQrcode } from "react-icons/im";

export const getMenuItems = (t: (key: string) => string) => [
  {
    icon: <AiFillDashboard />,
    label: t("sidebarMenu.dashboard"),
    link: "/dashboard",
  },
  // {
  //   icon: <AiFillDashboard />,
  //   label: t("sidebarMenu.pos"),
  //   link: "/pos",
  // },
  {
    icon: <AiFillProduct />,
    label: t("sidebarMenu.productManagement.label"),
    subItems: [
      {
        label: t("sidebarMenu.productManagement.subItems.addProduct"),
        icon: <IoBagAdd />,
        link: "/product-management/add-product",
      },
      {
        label: t("sidebarMenu.productManagement.subItems.productList"),
        icon: <HiSquare3Stack3D />,
        link: "/product-management",
      },
      {
        label: t("sidebarMenu.productManagement.subItems.printLabels"),
        icon: <ImQrcode />,
        link: "/print-labels",
      },
      {
        label: t("sidebarMenu.productManagement.subItems.trendingProduct"),
        icon: <MdOutlineWorkspacePremium />,
        link: "/print-labels",
      },
    ],
  },
  {
    icon: <MdManageAccounts />,
    label: t("sidebarMenu.customerManagement.label"),
    subItems: [
      {
        label: t("sidebarMenu.customerManagement.subItems.addCustomer"),
        icon: <LuUserPlus />,
        link: "/add-customer",
      },
      {
        label: t("sidebarMenu.customerManagement.subItems.customerList"),
        icon: <IoPeopleSharp />,
        link: "/customer-list",
      },
      {
        label: t("sidebarMenu.customerManagement.subItems.customerDueReport"),
        icon: <MdMenuBook />,
        link: "/customer-due",
      },
    ],
  },
  {
    icon: <HiOutlineClipboardDocumentList />,
    label: t("sidebarMenu.categories"),
    subItems: [
      {
        label: "Add Category",
        icon: <LuUserPlus />,
        link: "/category/add-category",
      },
      {
        label: "Category List",
        icon: <LuUserPlus />,
        link: "/category",
      },
      {
        label: t("sidebarMenu.customerManagement.subItems.customerList"),
        icon: <IoPeopleSharp />,
        link: "/customer-list",
      },
      {
        label: t("sidebarMenu.customerManagement.subItems.customerDueReport"),
        icon: <MdMenuBook />,
        link: "/customer-due",
      },
    ],
  },
  {
    label: t("sidebarMenu.categories"),
    icon: <HiOutlineClipboardDocumentList />,
    link: "/category-management/add-category",
  },
  {
    label: t("sidebarMenu.brands"),
    icon: <HiSquare3Stack3D />,
    link: "/brand",
  },
  {
    label: t("sidebarMenu.units"),
    icon: <HiSquare3Stack3D />,
    link: "/unit",
  },
  {
    icon: <TbReportAnalytics />,
    label: t("sidebarMenu.report"),
    link: "/report",
  },
  {
    icon: <LuSettings />,
    label: t("sidebarMenu.settings"),
    link: "/settings",
  },
];
