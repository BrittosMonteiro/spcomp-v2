import { Link } from "react-router-dom";
import { Link as LinkIcon, LinkBreak } from "phosphor-react";

import { updateOrderImportHistoryId } from "../../../../../../services/orderListService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";
import { useDispatch } from "react-redux";

export default function OrdersRow({
  item,
  isAttached,
  idImportHistory,
  reload,
}) {
  const dispatch = useDispatch();

  async function changeOrderToHistory() {
    const data = {
      idImportHistory: "",
      idOrder: item._id.toString(),
    };
    if (isAttached) {
      updateOrderToHistory(data);
    } else {
      data.idImportHistory = idImportHistory;
      updateOrderToHistory(data);
    }
  }

  async function updateOrderToHistory(data) {
    await updateOrderImportHistoryId(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reload();
          if (isAttached) {
            handleMessageBox("success", "Pedido não atrelado");
          } else {
            handleMessageBox("success", "Pedido atrelado");
          }
        } else {
          handleMessageBox("success", "Não foi possível atualizar");
        }
      })
      .catch(() => {
        handleMessageBox("success", "Não foi possível atualizar");
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <>
      <tr>
        <td>{item.idSupplier.name}</td>
        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
        <td>
          <Link
            to={`/supplier/order/${item._id.toString()}`}
            className="text-dark-1"
          >
            Ver pedido
          </Link>
        </td>
        <td>
          <button
            type="button"
            className={`${
              isAttached ? "bg-red-1" : "bg-green-1"
            } text-white-1 pa-1 border-radius-soft`}
            title={`${
              isAttached
                ? "Desatrelar pedido desta importação"
                : "Atrelar pedido à importação"
            }`}
            onClick={() => changeOrderToHistory()}
          >
            {isAttached ? (
              <LinkBreak className="icon-sm" />
            ) : (
              <LinkIcon className="icon-sm" />
            )}
          </button>
        </td>
      </tr>
    </>
  );
}
