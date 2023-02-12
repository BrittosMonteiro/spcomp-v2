import { Receipt } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../../../components/Common/Card";

import TabList from "../../../../components/Common/tabList";
import DialogCreateOrder from "../../../../components/Dialog/DialogCreateOrder";
import OrderListTable from "../../../../components/Tables/OrderListTable";
import RequestTable from "./Components/TablesAndRows/RequestTable";
import { readOrder } from "../../../../services/orderListService";
import { readRequest } from "../../../../services/requestService";

export default function OrderRequest() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [tabView, setTabView] = useState(0);
  const [requests, setRequest] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  async function loadRequests() {
    await readRequest()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadOrders() {
    await readOrder()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    loadRequests();
    loadOrders();
  }, []);

  function reloadRequestList() {
    loadRequests();
  }

  function reloadOrdersList(tab) {
    loadOrders();
    setTabView(tab);
  }

  function closeModal() {
    setOpenDialog(false);
  }

  const tabList = [
    {
      label: "Solicitações",
      component: (
        <RequestTable
          list={requests}
          reloadRequestList={reloadRequestList}
          userSession={userSession}
        />
      ),
      isAdmin: false,
    },
    {
      label: "Pedidos",
      component: (
        <OrderListTable
          list={orders}
          reloadOrdersList={reloadOrdersList}
          userSession={userSession}
        />
      ),
      isAdmin: true,
    },
  ];

  function changeTab(index) {
    setTabView(index);
  }

  return (
    <div className="column w-full gap-4">
      <TabList tabList={tabList} changeTab={changeTab} tab={tabView} />
      <Card className="column gap-4">
        {(userSession.isAdmin || userSession.role === 3) && (
          <div className="row">
            <button
              type="button"
              className="flex action-btn align-items-center gap-2 pa-1 border-radius-soft font-md font-medium"
              title="Criar novo pedido"
              onClick={() => setOpenDialog(true)}
            >
              Criar novo pedido
              <Receipt className="icon-default" />
            </button>
            <DialogCreateOrder
              open={openDialog}
              onClose={closeModal}
              reloadOrdersList={reloadOrdersList}
            />
          </div>
        )}
        {tabList[tabView].component}
      </Card>
    </div>
  );
}
