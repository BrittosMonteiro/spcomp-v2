import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../../../../components/Common/Card";
import TabList from "../../../../components/Common/tabList";
import OrderListTable from "../../../../components/Tables/OrderListTable";
import RequestTable from "./Components/TablesAndRows/RequestTable";

export default function OrderRequest() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [tabView, setTabView] = useState(0);

  const tabList = [
    {
      label: "Solicitações",
      component: <RequestTable userSession={userSession} />,
      isAdmin: false,
    },
    {
      label: "Pedidos",
      component: <OrderListTable userSession={userSession} />,
      isAdmin: true,
    },
  ];

  function changeTab(index) {
    setTabView(index);
  }

  return (
    <div className="column w-full gap-4">
      <TabList tabList={tabList} changeTab={changeTab} tab={tabView} />
      <Card className="column gap-4">{tabList[tabView].component}</Card>
    </div>
  );
}
