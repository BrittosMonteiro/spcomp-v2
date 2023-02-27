import { useEffect, useState } from "react";

import TabList from "../../../../../../components/Common/tabList";
import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import {
  readOrderByImportHistory,
  readOrderNotAttached,
} from "../../../../../../services/orderListService";
import OrdersTable from "../TablesAndRows/OrdersTable";

export default function DialogImportHistoryOrders({
  idImportHistory,
  open,
  onClose,
}) {
  const [tabView, setTabView] = useState(0);
  const [attachedOrders, setAttachedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  async function loadAttachedOrders() {
    await readOrderByImportHistory(idImportHistory)
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setAttachedOrders(response.data);
      })
      .catch((err) => {});
  }

  async function loadPendingOrders() {
    await readOrderNotAttached()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setPendingOrders(response.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    loadAttachedOrders();
    loadPendingOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reload() {
    loadAttachedOrders();
    loadPendingOrders();
  }

  function changeTab(index) {
    setTabView(index);
  }

  const tabList = [
    {
      isAdmin: false,
      label: "Pedidos atrelados",
      component: (
        <OrdersTable
          list={attachedOrders}
          emptyMessage={"Não há pedidos atrelados"}
          isAttached={true}
          idImportHistory={idImportHistory}
          reload={reload}
        />
      ),
    },
    {
      isAdmin: false,
      label: "Pedidos pendentes",
      component: (
        <OrdersTable
          list={pendingOrders}
          emptyMessage={"Não há pedidos pendentes"}
          isAttached={false}
          idImportHistory={idImportHistory}
          reload={reload}
        />
      ),
    },
  ];
  return (
    <>
      <DialogDefault open={open} onClose={onClose} title={"Importação"}>
        <TabList changeTab={changeTab} tab={tabView} tabList={tabList} />
        {tabList[tabView].component}
      </DialogDefault>
    </>
  );
}
