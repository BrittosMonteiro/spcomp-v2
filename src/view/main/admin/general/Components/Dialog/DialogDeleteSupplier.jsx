import { TrashSimple, XCircle } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteSupplier } from "../../../../../../services/supplierService";

export default function DialogDeleteSupplier({
  open,
  onClose,
  reload,
  supplier,
}) {
  async function manageRemove(id) {
    if (!id) return;

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
      .catch((err) => {});
  }
  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium text-dark-1">Remover usuário</h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <span className="font-sm font-medium">
        O fornecedor {supplier.name} será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(supplier.id)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-1 font-md font-medium border-radius-soft"
        >
          Apagar <TrashSimple className="icon-sm" />
        </button>
      </div>
    </DialogDefault>
  );
}
