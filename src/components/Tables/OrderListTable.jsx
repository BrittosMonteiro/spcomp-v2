import { useEffect, useState } from "react";
import { Receipt } from "phosphor-react";

import OrderListRow from "./OrderListRow";
import { readOrder } from "../../services/orderListService";
import DialogCreateOrder from "../Dialog/DialogCreateOrder";

export default function OrderListTable({ userSession }) {
  const [orders, setOrders] = useState([]);
  const [contentMessage, setContentMessage] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  async function loadOrders() {
    setContentMessage("Carregando informações");

    await readOrder()
      .then((responseRead) => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => {})
      .finally(() => {
        if (orders.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há pedidos");
        }
      });
  }
  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
    setOpenDialog(false);
  }

  return (
    <>
      {(userSession.isAdmin || userSession.role === 3) && (
        <div className="row">
          <button
            type="button"
            className="flex action-btn align-items-center gap-2 pa-1 border-radius-soft font-sm font-medium"
            title="Criar novo pedido"
            onClick={() => setOpenDialog(true)}
          >
            Criar novo pedido
            <Receipt className="icon-default" />
          </button>
          <DialogCreateOrder
            open={openDialog}
            onClose={closeModal}
            reloadOrders={loadOrders}
          />
        </div>
      )}
      {orders.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Supplier</th>
              <th>View</th>
              {userSession.isAdmin && (
                <>
                  <th>Status</th>
                  <th>Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <OrderListRow
                key={index}
                order={item}
                reloadOrders={loadOrders}
                userSession={userSession}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          <p className="font-md font-medium">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
