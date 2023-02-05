import React from "react";
import { useState } from "react";

import TabList from "../../../../components/Common/tabList";
import Items from "./items";
import Inquiries from "./inquiries";
import SupplierResponse from "../../external/supplierInquiryList";

export default function ItemsView() {
  const [tabView, setTabView] = useState(0);
  const tabList = [
    {
      label: "Itens",
      component: <Items changeTab={changeTab} />,
      isAdmin: false,
    },
    {
      label: "Cotação",
      component: <Inquiries changeTab={changeTab} />,
      isAdmin: false,
    },
    {
      label: "Cotações enviadas",
      component: <SupplierResponse />,
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
