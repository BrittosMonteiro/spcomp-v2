import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TabList from "../../../../components/Common/tabList";
import Items from "./items";
import Inquiries from "./inquiries";
import SupplierResponse from "../../external/supplierInquiryList";
import Card from "../../../../components/Common/Card";

import { readBrands } from "../../../../services/brandService";
import { readEncap } from "../../../../services/encapService";
import { readType } from "../../../../services/typeService";
import { readSuppliersSimple } from "../../../../services/supplierService";

export default function ItemsView() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [tabView, setTabView] = useState(0);
  const [brandList, setBrandList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [encapList, setEncapList] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);

  const tabList = [
    {
      label: "Itens",
      component: (
        <Items
          changeTab={changeTab}
          brandList={brandList}
          encapList={encapList}
          typeList={typeList}
        />
      ),
      isAdmin: false,
    },
    {
      label: "Cotação",
      component: (
        <Inquiries changeTab={changeTab} suppliersList={suppliersList} />
      ),
      isAdmin: false,
    },
    {
      label: "Cotações enviadas",
      component: <SupplierResponse />,
      isAdmin: true,
    },
  ];

  async function loadBrands() {
    await readBrands()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => setBrandList(res.data))
      .catch(() => {});
  }

  async function loadEncaps() {
    await readEncap()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => setEncapList(res.data))
      .catch(() => {});
  }

  async function loadTypes() {
    await readType()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => setTypeList(res.data))
      .catch(() => {});
  }

  async function loadSuppliers() {
    await readSuppliersSimple()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setSuppliersList(response.data);
      })
      .catch((err) => {});
  }

  function changeTab(index) {
    setTabView(index);
  }

  useEffect(() => {
    loadBrands();
    loadEncaps();
    loadTypes();
    if (userSession.isAdmin) {
      loadSuppliers();
    }
  }, [userSession]);

  return (
    <div className="column w-full gap-4">
      <TabList tab={tabView} tabList={tabList} changeTab={changeTab} />
      <Card>{tabList[tabView].component}</Card>
    </div>
  );
}
