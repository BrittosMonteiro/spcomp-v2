import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../../components/Common/Card";

import PageTitle from "../../../components/Common/PageTitle";
import DialogAddNewItemToOrder from "../../../components/Dialog/DialogAddNewItemToOrder";
import OrderTable from "./Components/TablesAndRows/OrderTable";
import { readOrderList } from "../../../services/orderListService";
import { readRequestBySupplier } from "../../../services/requestService";

export default function Order() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const { idOrder } = useParams();
  const [order, setOrder] = useState([]);
  const [openPendingItems, setOpenPendingItems] = useState(false);
  const [idSupplier, setIdSupplier] = useState("");
  const [pendingItems, setPendingItems] = useState([]);

  let title = "Pedido";

  if (userSession.role === 4) {
    title = "Order";
  }

  async function loadOrder() {
    await readOrderList(idOrder)
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setOrder(response.data);
        setIdSupplier(response.data.supplier.idSupplier);
      })
      .catch((err) => {});
  }

  async function loadRequestBySupplier() {
    await readRequestBySupplier(idSupplier)
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setPendingItems(response.data);
      })
      .catch((err) => {});
  }

  useEffect(() => {
    if (idSupplier) {
      loadRequestBySupplier();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSupplier]);

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
    setOpenPendingItems(false);
  }

  return (
    <div className="column gap-4">
      <PageTitle title={title} />
      <Card>
        {userSession.isAdmin && pendingItems.length > 0 && (
          <div className="row">
            <button
              type="type"
              className="action-btn border-radius-soft pa-1 font-sm font-medium"
              title="Incluir itens pendentes"
              onClick={() => setOpenPendingItems(true)}
            >
              Incluir itens pendentes
            </button>
            <DialogAddNewItemToOrder
              open={openPendingItems}
              onClose={closeModal}
              idOrder={order.idOrder}
              idSupplier={idSupplier}
              pendingItems={pendingItems}
              reloadOrderList={loadOrder}
            />
          </div>
        )}
        {order?.items?.length > 0 ? (
          <OrderTable
            list={order}
            userSession={userSession}
            reloadOrderList={loadOrder}
          />
        ) : (
          <div className="row">
            <p className="font-md font-medium">Não há itens neste pedido</p>
          </div>
        )}
      </Card>
    </div>
  );
}
