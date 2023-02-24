import { CircleNotch } from "phosphor-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteItem } from "../../../../../../services/itemService.js";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogDeleteItem({ open, onClose, reload, item }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    setIsLoading(true);

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
    <DialogDefault open={open} onClose={onClose} title={"Remover item"}>
      <span className="font-sm font-medium">
        O item{" "}
        <span className="bg-red-1 text-white-1 pa-1">
          {item.item.description}
        </span>{" "}
        será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(item.item.id)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-2 font-md font-medium border-radius-soft"
        >
          {isLoading ? (
            <CircleNotch className="icon-default spinning" />
          ) : (
            "Apagar"
          )}
        </button>
      </div>
    </DialogDefault>
  );
}
