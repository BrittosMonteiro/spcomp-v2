import { Receipt } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PageTitle from "../../../components/Common/PageTitle";
import DialogCreateOrder from "../../../components/Dialog/DialogCreateOrder";
import OrderListTable from "../../../components/Tables/OrderListTable";
import RequestTable from "../../../components/Tables/RequestTable";
import { readOrder } from "../../../services/orderListService";
import { readRequest } from "../../../services/requestService";

export default function OrderRequest() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [tab, setTab] = useState(1);
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
    setTab(tab);
  }

  function closeModal() {
    setOpenDialog(false);
  }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Solicitações"} />
        {(userSession.isAdmin || userSession.role === 3) && (
          <>
            <button
              type="button"
              className="row align-items-center gap-2 bg-green-1 text-white-1 pa-2 font-md font-medium"
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
          </>
        )}
      </div>
      <div className="row gap-2 mb-4">
        <button
          type="button"
          className={`${
            tab === 1 ? "bg-green-1 text-white-1" : "text-green-1"
          } pa-2 font-md font-medium`}
          onClick={() => setTab(1)}
          title="Aba de itens"
        >
          Itens
        </button>
        <button
          type="button"
          className={`${
            tab === 2 ? "bg-green-1 text-white-1" : "text-green-1"
          } pa-2 font-md font-medium`}
          onClick={() => setTab(2)}
          title="Aba de pedidos"
        >
          Pedidos
        </button>
      </div>
      {tab === 1 && (
        <>
          {requests.length > 0 ? (
            <RequestTable
              list={requests}
              reloadRequestList={reloadRequestList}
            />
          ) : null}
        </>
      )}

      {tab === 2 && (userSession.isAdmin || userSession.role === 4) && (
        <>
          {orders.length > 0 ? (
            <OrderListTable
              list={orders}
              reloadOrdersList={reloadOrdersList}
              userSession={userSession}
            />
          ) : null}
        </>
      )}
    </>
  );
}
