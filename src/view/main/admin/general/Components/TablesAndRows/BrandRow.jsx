import { useState } from "react";
import { PencilSimple, TrashSimple } from "phosphor-react";

import DialogBrand from "../Dialog/DialogBrand";
import DialogDeleteBrand from "../Dialog/DialogDeleteBrand";

export default function BrandRow({ item, reload }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function closeModal() {
    setOpen(false);
    setOpenDelete(false);
  }

  return (
    <tr>
      <td>{item.description}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="flex bg-blue-1 text-white-1 border-radius-soft pa-1"
            onClick={() => setOpen(true)}
          >
            <PencilSimple alt="Editar marca" className="icon-sm" />
          </button>
          <DialogBrand
            item={item}
            onClose={closeModal}
            open={open}
            reload={reload}
            title={"Editar marca"}
          />
          <button
            type="button"
            className="flex bg-red-1 text-white-1 border-radius-soft pa-1"
            onClick={() => setOpenDelete(true)}
          >
            <TrashSimple alt="Remover marca" className="icon-sm" />
          </button>
          <DialogDeleteBrand
            brand={item}
            onClose={closeModal}
            open={openDelete}
            reload={reload}
          />
        </div>
      </td>
    </tr>
  );
}
