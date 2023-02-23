import { useState } from "react";
import { PencilSimple, TrashSimple } from "phosphor-react";

import DialogSupplier from "../Dialog/DialogSupplier";
import DialogDeleteSupplier from "../Dialog/DialogDeleteSupplier";

export default function SupplierRow({ supplier, reload }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function closeModal() {
    setOpen(false);
    setOpenDelete(false);
  }

  return (
    <tr>
      <td>{supplier.name}</td>
      <td>{supplier.status ? "Ativo" : "Desativado"}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="bg-blue-1 row pa-1 text-white-1 border-radius-soft"
            onClick={() => setOpen(true)}
          >
            <PencilSimple className="icon-sm" />
          </button>
          <DialogSupplier
            supplier={supplier}
            reload={reload}
            onClose={closeModal}
            open={open}
          />
          <button
            type="button"
            className="row bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => setOpenDelete(true)}
          >
            <TrashSimple className="icon-sm" />
          </button>
          <DialogDeleteSupplier
            onClose={closeModal}
            open={openDelete}
            reload={reload}
            supplier={supplier}
          />
        </div>
      </td>
    </tr>
  );
}
