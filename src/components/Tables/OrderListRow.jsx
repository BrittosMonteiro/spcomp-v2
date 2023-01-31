import { ToggleLeft, ToggleRight } from "phosphor-react";
import { Link } from "react-router-dom";
import { updateOrderStatus } from "../../services/orderListService";

export default function OrderListRow({ order, reloadOrdersList, userSession }) {
  async function changeOrderView() {
    const data = {
      idOrder: order.idOrder,
      status: !order.status,
    };

    await updateOrderStatus(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reloadOrdersList(2);
        }
      })
      .catch((err) => {});
  }

  return (
    <tr>
      <td>{order.date}</td>
      <td>{order.supplier}</td>
      {userSession.isAdmin && (
        <td>
          {order.status ? (
            <button
              type="button"
              className="bg-transparent"
              onClick={() => changeOrderView()}
            >
              <ToggleLeft className="icon-md text-green-1" />
            </button>
          ) : (
            <button
              type="button"
              className="bg-transparent"
              onClick={() => changeOrderView()}
            >
              <ToggleRight className="icon-md text-red-1" />
            </button>
          )}
        </td>
      )}
      <td>
        <Link to={`/supplier/order/${order.idOrder}`} className="text-dark-1">
          {userSession.role === 4 ? "Order details" : "Detalhes do pedido"}
        </Link>
      </td>
    </tr>
  );
}
