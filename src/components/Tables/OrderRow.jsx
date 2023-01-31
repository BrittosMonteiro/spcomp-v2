import { Check, XCircle } from "phosphor-react";

export default function OrderRow({ item, userSession }) {
  async function cancelRequestedItem() {}
  async function confirmRequestedItem() {}

  return (
    <tr>
      <td>{item.quantity}</td>
      <td>{item.description}</td>
      <td>{item.type}</td>
      <td>{item.encap}</td>
      <td>{item.brand}</td>
      <td>{item.unitPurchasePrice}</td>
      <td>{item.leadtime}</td>
      <td>{item.datacode}</td>
      <td>{item.condition}</td>
      <td>{item.step}</td>
      <td>
        <div className="row">
          <div className="row ma-auto">
            {userSession.isAdmin && (
              <button
                type="button"
                className="row align-items-center bg-red-1 text-white-1 pa-1 border-radius-soft"
                onClick={() => cancelRequestedItem()}
                title={"Cancelar item"}
              >
                <XCircle className="icon-default" />
              </button>
            )}
            {userSession.role === 4 && (
              <button
                type="button"
                className="row align-items-center bg-green-1 text-white-1 pa-1 border-radius-soft"
                onClick={() => confirmRequestedItem()}
                title={"Confirm item"}
              >
                <Check className="icon-default" />
              </button>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
