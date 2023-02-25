import { useState } from "react";
import { CircleNotch } from "phosphor-react";
import { useDispatch } from "react-redux";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteType } from "../../../../../../services/typeService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogDeleteType({ open, onClose, reload, type }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    setIsLoading(true);

    await deleteType({ idType: id })
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          reload();
          onClose();
          handleMessageBox("success", "Tipo removido");
        } else {
          handleMessageBox("failed", "Não foi possível remover o tipo");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível remover o tipo");
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
    <DialogDefault open={open} onClose={onClose} title={"Remover tipo"}>
      <span className="font-sm font-medium">
        O tipo{" "}
        <span className="bg-red-1 text-white-1 pa-1">{type.description}</span>{" "}
        será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(type.id)}
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
