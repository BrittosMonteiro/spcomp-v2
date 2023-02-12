import { Check, Copy, XCircle } from "phosphor-react";
import { updateInquiryItemStep } from "../../../../../services/inquiryItemService";

export default function OrderRow({ item, userSession, reloadOrderList }) {
  async function cancelRequestedItem() {
    const data = {
      pending: [item.idInquiryItem],
      step: 9,
    };
    updateItemStep(data);
  }
  async function confirmRequestedItem() {
    const data = {
      pending: [item.idInquiryItem],
      step: 6,
    };
    updateItemStep(data);
  }

  async function updateItemStep(data) {
    await updateInquiryItemStep(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reloadOrderList();
        }
      })
      .catch((err) => {});
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
            <Copy className="icon-sm" />
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
      <td>
        <div className="row">
          {userSession.isAdmin && (item.step === 5 || item.step === 6) && (
            <button
              type="button"
              className="row align-items-center bg-red-1 text-white-1 pa-1 border-radius-soft"
              onClick={() => cancelRequestedItem()}
              title={"Cancelar item"}
            >
              <XCircle className="icon-sm" />
            </button>
          )}
          {userSession.role === 4 && item.step === 5 && (
            <button
              type="button"
              className="row align-items-center bg-green-1 text-white-1 pa-1 border-radius-soft"
              onClick={() => confirmRequestedItem()}
              title={"Confirm item"}
            >
              <Check className="icon-sm" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
