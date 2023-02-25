import { useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteEncap } from "../../../../../../services/encapService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogDeleteEncap({ open, onClose, reload, encap }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoadin] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    setIsLoadin(true);

    await deleteEncap({ idEncap: id })
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          reload();
          onClose();
          handleMessageBox("success", "Encapsulamento removido");
        } else {
          handleMessageBox(
            "failed",
            "Não foi possível remover o encapsulamento"
          );
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível remover o encapsulamento");
      })
      .finally(() => {
        setIsLoadin(false);
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <DialogDefault
      open={open}
      onClose={onClose}
      title={"Remover encapsulamento"}
    >
      <span className="font-sm font-medium">
        O encapsulamento{" "}
        <span className="bg-red-1 text-white-1 pa-1">{encap.description}</span>{" "}
        será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(encap.id)}
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
