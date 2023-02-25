import { useState } from "react";
import { CircleNotch } from "phosphor-react";
import { useDispatch } from "react-redux";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteSupplier } from "../../../../../../services/supplierService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogDeleteSupplier({
  open,
  onClose,
  reload,
  supplier,
}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    setIsLoading(true);

    const data = {
      idSupplier: id,
    };

    await deleteSupplier(data)
      .then((response) => {
        if (response.status === 200) {
          reload();
          onClose();
          handleMessageBox("success", "Fornecedor removido");
        } else {
          handleMessageBox("failed", "Não foi possível remover o fornecedor");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível remover o fornecedor");
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
    <DialogDefault open={open} onClose={onClose} title={"Remover fornecedor"}>
      <span className="font-sm font-medium">
        O fornecedor{" "}
        <span className="bg-red-1 text-white-1 pa-1">{supplier.name}</span> será
        removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(supplier.id)}
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
