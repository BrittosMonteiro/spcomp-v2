import { ToggleLeft, ToggleRight, TrashSimple } from "phosphor-react";
import { Link } from "react-router-dom";
import {
  deleteOrderListItem,
  updateOrderStatus,
} from "../../services/orderListService";

export default function OrderListRow({ order, reloadOrdersList, userSession }) {
  async function changeOrderView() {
    const data = {
      idOrder: order.idOrder,
      status: !order.status,
    };

    await updateOrderStatus(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reloadOrdersList(1);
        }
      })
      .catch((err) => {});
  }

  async function deleteOrderList() {
    const data = {
      idOrder: order.idOrder,
    };

    await deleteOrderListItem(data)
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          reloadOrdersList(2);
        }
      })
      .catch((err) => {});
  }

  return (
    <tr>
      <td>{order.date}</td>
      <td>{order.supplier}</td>
      <td>
        <Link to={`/supplier/order/${order.idOrder}`} className="text-dark-1">
          {userSession.role === 4 ? "Order details" : "Detalhes do pedido"}
        </Link>
      </td>
      {userSession.isAdmin && (
        <>
          <td>
            {order.status ? (
              <button
                type="button"
                className="flex bg-green-1 text-white-1 pa-1 border-radius-soft"
                onClick={() => changeOrderView()}
              >
                <ToggleLeft className="icon-default" />
              </button>
            ) : (
              <button
                type="button"
                className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
                onClick={() => changeOrderView()}
              >
                <ToggleRight className="icon-default" />
              </button>
            )}
          </td>
          <td>
            <div className="row">
              <button
                type="button"
                className="row bg-red-1 text-white-1 pa-1 border-radius-soft"
                title="Delete order"
                onClick={() => deleteOrderList()}
              >
                <TrashSimple className="icon-sm" />
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
