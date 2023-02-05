import * as Dialog from "@radix-ui/react-dialog";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";
import { deleteSupplier } from "../../../../services/supplierService";
import DialogSupplier from "../../../../components/Dialog/DialogSupplier";

export default function SupplierTable({ suppliersList, reloadList }) {
  const [open, setOpen] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    const data = {
      idSupplier: id,
    };

    await deleteSupplier(data)
      .then((response) => {
        if (response.status === 200) {
          reloadList();
        }
      })
      .catch((err) => console.log(err));
  }

  function reloadSupplierList() {
    setOpen(false);
    reloadList();
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {suppliersList.map((supplier, index) => (
          <tr key={index}>
            <td>{supplier.name}</td>
            <td>{supplier.status ? "Ativo" : "Desativado"}</td>
            <td>
              <div className="row gap-2">
                <Dialog.Root open={open} onOpenChange={setOpen}>
                  <Dialog.Trigger className="bg-blue-1 row pa-1 text-white-1 border-radius-soft">
                    <PencilSimple className="icon-sm" />
                  </Dialog.Trigger>
                  <DialogSupplier
                    supplierData={supplier}
                    reloadList={reloadSupplierList}
                  />
                </Dialog.Root>
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
        ))}
      </tbody>
    </table>
  );
}
