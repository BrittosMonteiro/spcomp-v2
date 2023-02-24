import { CircleNotch } from "phosphor-react";
import { useState } from "react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteSupplier } from "../../../../../../services/supplierService";

export default function DialogDeleteSupplier({
  open,
  onClose,
  reload,
  supplier,
}) {
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
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
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
