import { useDispatch } from "react-redux";
import { Copy, XCircle } from "phosphor-react";

import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function RequestRow({ request, userSession }) {
  const dispatch = useDispatch();

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", "Texto copiado");
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <tr>
      {userSession.isAdmin && <td>{request.supplier.name}</td>}
      <td>{request.item.quantity}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="bg-transparent"
            onClick={() => copyText(request.item.description)}
          >
            <Copy className="icon-sm" />
          </button>
          {request.item.description}
        </div>
      </td>
      <td>{request.item.type}</td>
      <td>{request.item.encap}</td>
      <td>{request.item.brand}</td>
      {userSession.isAdmin && (
        <td>{request.item.unitPurchasePrice.toFixed(4)}</td>
      )}
      <td>{request.item.unitSalePrice.toFixed(4)}</td>
      <td>{request.user.username}</td>
      <td>{request.customer.name}</td>
      <td>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => null}
          title={"Cancelar item"}
        >
          <XCircle className="icon-sm" />
        </button>
      </td>
    </tr>
  );
}
