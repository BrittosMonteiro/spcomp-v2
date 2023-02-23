import { TrashSimple, XCircle } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteBrand } from "../../../../../../services/brandService";

export default function DialogDeleteBrand({ open, onClose, reload, brand }) {
  async function manageRemove(id) {
    await deleteBrand({ idBrand: id })
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
        <h1 className="font-lg font-medium text-dark-1">Remover marca</h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <span className="font-sm font-medium">
        A marca {brand.description} será removida. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(brand.id)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-1 font-md font-medium border-radius-soft"
        >
          Apagar <TrashSimple className="icon-sm" />
        </button>
      </div>
    </DialogDefault>
  );
}
