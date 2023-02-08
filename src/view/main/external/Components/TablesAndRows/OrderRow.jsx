import { Check, Copy, XCircle } from "phosphor-react";

export default function OrderRow({ item, userSession }) {
  async function cancelRequestedItem() {
    console.dir(item);
  }
  async function confirmRequestedItem() {
    console.dir(item);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    // handleMessageBox("success", "Text copied to clipboard");
  }

  return (
    <tr>
      <td>{item.quantity}</td>

      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="bg-transparent"
            onClick={() => copyText(item.description)}
          >
            <Copy className="icon-default" />
          </button>
          {item.description}
        </div>
      </td>
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
      </td>
    </tr>
  );
}
