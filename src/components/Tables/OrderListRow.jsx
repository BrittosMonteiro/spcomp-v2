import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToggleLeft, ToggleRight, TrashSimple } from "phosphor-react";
import {
  deleteOrderListItem,
  updateOrderStatus,
} from "../../services/orderListService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function OrderListRow({ order, reloadOrders, userSession }) {
  const dispatch = useDispatch();

  async function changeOrderView() {
    const data = {
      idOrder: order.idOrder,
      status: !order.status,
    };

    await updateOrderStatus(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reloadOrders();
          handleMessageBox("success", "Visualização alterada");
        } else {
          handleMessageBox("failed", "Nao foi possível alterar a visualização");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Nao foi possível alterar a visualização");
      });
  }

  async function deleteOrderList() {
    const data = {
      idOrder: order.idOrder,
    };

    await deleteOrderListItem(data)
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          reloadOrders();
          handleMessageBox("success", "Pedido removido");
        } else {
          handleMessageBox("failed", "Nao foi possível remover o pedido");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Nao foi possível remover o pedido");
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
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
