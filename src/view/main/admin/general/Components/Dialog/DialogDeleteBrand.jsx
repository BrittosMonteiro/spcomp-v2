import { useState } from "react";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteBrand } from "../../../../../../services/brandService";

export default function DialogDeleteBrand({ open, onClose, reload, brand }) {
  const [isLoading, setIsLoading] = useState(false);

  async function manageRemove(id) {
    setIsLoading(true);

    await deleteBrand({ idBrand: id })
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
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
    <DialogDefault open={open} onClose={onClose} title={"Remover marca"}>
      <span className="font-sm font-medium">
        A marca{" "}
        <span className="bg-red-1 text-white-1 pa-1">{brand.description}</span>{" "}
        será removida. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(brand.id)}
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
