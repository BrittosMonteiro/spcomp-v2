import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";
import { deleteSupplier } from "../../../../../../services/supplierService";
import DialogSupplier from "../Dialog/DialogSupplier";

export default function SupplierRow({ supplier, reload }) {
  const [open, setOpen] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    const data = {
      idSupplier: id,
    };

    await deleteSupplier(data)
      .then((response) => {
        if (response.status === 200) {
          reload();
        }
      })
      .catch((err) => {});
  }

  function closeModal() {
    setOpen(false);
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
            onClick={() => manageRemove(supplier.id)}
          >
            <TrashSimple className="icon-sm" />
          </button>
        </div>
      </td>
    </tr>
  );
}
