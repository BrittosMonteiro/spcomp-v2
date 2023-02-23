import { XCircle } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteEncap } from "../../../../../../services/encapService";

export default function DialogDeleteEncap({ open, onClose, reload, encap }) {
  async function manageRemove(id) {
    await deleteEncap({ idEncap: id })
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          reload();
          onClose();
        }
      })
      .catch((err) => {});
  }
  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium text-dark-1">
          Remover encapsulamento
        </h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <span className="font-sm font-medium">
        O encapsulamento {encap.name} será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(encap.id)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-1 font-md font-medium border-radius-soft"
        >
          Apagar
        </button>
      </div>
    </DialogDefault>
  );
}
