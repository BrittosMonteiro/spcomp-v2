import { Check, CircleNotch, XCircle } from "phosphor-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createStockItemController,
  deleteImportStockItemController,
} from "../../../../../../controller/stockController";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function ImportDetailRow({ item, userSession, reloadList }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function confirmItem(idInquiryItem) {
    setIsLoading(true);
    await createStockItemController([{ idInquiryItem }])
      .then(() => {
        handleMessageBox("success", "Item atualizado");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Houve um problema ao atualizar o item");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function cancelItem(idInquiryItem) {
    await deleteImportStockItemController({ idInquiryItem })
      .then(() => {
        handleMessageBox("success", "Item removido do estoque");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Houve um problema ao remover o item");
      })
      .finally(() => {
        setIsLoading(false);
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
      <td>{item.supplier}</td>
      <td>{item.description}</td>
      <td>{item.qty}</td>
      <td>{item.encap}</td>
      <td>{item.type}</td>
      <td>{item.brand}</td>
      {userSession.isAdmin && <td>{item.unitPurchasePrice.toFixed(4)}</td>}
      <td>{item.user}</td>
      <td>
        <div className="row ai-center">
          {item.step === 6 && (
            <button
              type="button"
              className="flex bg-green-1 text-white-1 pa-1 border-radius-soft"
              onClick={() => confirmItem(item.idInquiryItem)}
              title={"Item recebido"}
            >
              {isLoading ? (
                <CircleNotch className="icon-sm spinning" />
              ) : (
                <Check className="icon-sm" />
              )}
            </button>
          )}
          {userSession.isAdmin && item.step === 7 && (
            <button
              type="button"
              className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
              onClick={() => cancelItem(item.idInquiryItem)}
              title={"Cancelar recebimento"}
            >
              {isLoading ? (
                <CircleNotch className="icon-sm spinning" />
              ) : (
                <XCircle className="icon-sm" />
              )}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
