import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PageTitle from "../../../components/Common/PageTitle";
import DialogAddNewItemToOrder from "../../../components/Dialog/DialogAddNewItemToOrder";
import OrderTable from "../../../components/Tables/OrderTable";
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

  useEffect(() => {
    loadOrder();
  }, []);

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
  }, [idSupplier]);

  function reloadOrderList() {
    loadOrder();
  }

  function closeModal() {
    setOpenPendingItems(false);
  }

  return (
    <div className="column gap-4">
      <div className="row align-items-center justify-content-between">
        <PageTitle title={title} />
        {userSession.isAdmin && pendingItems.length > 0 && (
          <>
            <button
              type="type"
              className="bg-green-1 text-white-1 pa-2 align-items-center font-md font-medium"
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
              reloadOrderList={reloadOrderList}
            />
          </>
        )}
      </div>
      {order.idOrder ? (
        <OrderTable list={order} userSession={userSession} />
      ) : (
        <p className="ma-auto font-lg font-light">Não há itens neste pedido</p>
      )}
    </div>
  );
}
