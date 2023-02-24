import { CircleNotch } from "phosphor-react";
import { useState } from "react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteEncap } from "../../../../../../services/encapService";

export default function DialogDeleteEncap({ open, onClose, reload, encap }) {
  const [isLoading, setIsLoadin] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    setIsLoadin(true);

    await deleteEncap({ idEncap: id })
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          reload();
          onClose();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadin(false);
      });
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
