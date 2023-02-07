import React from "react";
import { useState } from "react";
import Card from "../../../components/Common/Card";
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
    },
    {
      label: "Clientes",
      component: <Customers changeTab={changeTab} />,
    },
    {
      label: "Fornecedores",
      component: <Suppliers changeTab={changeTab} />,
    },
    {
      label: "Tipos",
      component: null,
    },
    {
      label: "Encapsulamentos",
      component: null,
    },
    {
      label: "Marcas",
      component: null,
    },
  ];

  function changeTab(index) {
    setTabView(index);
  }
  return (
    <div className="column w-full gap-4">
      <TabList tab={tabView} tabList={tabList} changeTab={changeTab} />
      <Card>{tabList[tabView].component}</Card>
    </div>
  );
}
