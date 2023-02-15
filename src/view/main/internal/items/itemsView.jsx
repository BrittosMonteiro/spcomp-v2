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
import { useNavigate } from "react-router-dom";

export default function ItemsView() {
  const navigate = useNavigate();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const searchParams = new URLSearchParams(document.location.search);

  const [tabView, setTabView] = useState(searchParams.get("tab"));
  const [brandList, setBrandList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [encapList, setEncapList] = useState([]);
  const [suppliersList, setSuppliersList] = useState([]);

  const tabList = [
    {
      label: "Itens",
      component: (
        <Card>
          <Items
            changeTab={changeTab}
            brandList={brandList}
            encapList={encapList}
            typeList={typeList}
          />
        </Card>
      ),
      isAdmin: false,
    },
    {
      label: "Cotação",
      component: (
        <Card>
          <Inquiries changeTab={changeTab} suppliersList={suppliersList} />
        </Card>
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
        const activeSuppliers = response.data.filter((e) => e.status === true);
        setSuppliersList(activeSuppliers);
      })
      .catch((err) => {});
  }

  function changeTab(index) {
    setTabView(index);
    navigate(`/main/items?tab=${index}`);
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
      {tabList[tabView].component}
    </div>
  );
}
