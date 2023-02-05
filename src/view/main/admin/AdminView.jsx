import React from "react";
import { useState } from "react";
import TabList from "../../../components/Common/tabList";
import Customers from "./customers";
import Suppliers from "./suppliers";
import Users from "./users";

export default function AdminView() {
  const [tabView, setTabView] = useState(0);
  const tabList = [
    {
      label: "Usuários",
      component: <Users changeTab={changeTab} />,
      isAdmin: false,
    },
    {
      label: "Clientes",
      component: <Customers changeTab={changeTab} />,
      isAdmin: false,
    },
    {
      label: "Fornecedores",
      component: <Suppliers />,
      isAdmin: true,
    },
  ];

  function changeTab(index) {
    setTabView(index);
  }
  return (
    <div className="column w-full gap-4">
      <TabList tabList={tabList} changeTab={changeTab} />
      {tabList[tabView].component}
    </div>
  );
}
