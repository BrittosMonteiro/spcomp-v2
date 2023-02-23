import { XCircle } from "phosphor-react";
import { useDispatch } from "react-redux";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteItem } from "../../../../../../services/itemService.js";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogDeleteItem({ open, onClose, reload, item }) {
  const dispatch = useDispatch();

  async function manageRemove(id) {
    const data = {
      idItem: id,
    };
    await deleteItem(data)
      .then(() => {
        handleMessageBox("success", "Item removido");
        reload();
        onClose();
      })
      .catch(() => {
        handleMessageBox("failed", "Nao foi possível remover");
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));

    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }
  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium text-dark-1">Remover item</h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <span className="font-sm font-medium">
        O item {item.description} será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(item.id)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-1 font-md font-medium border-radius-soft"
        >
          Apagar
        </button>
      </div>
    </DialogDefault>
  );
}
