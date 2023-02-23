import { useState } from "react";
import { PencilSimple, TrashSimple } from "phosphor-react";

import DialogCustomer from "../Dialog/DialogCustomer";
import DialogDeleteCustomer from "../Dialog/DialogDeleteCustomer";

export default function CustomerRow({ customer, reload }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function closeModal() {
    setOpen(false);
    setOpenDelete(false);
  }

  return (
    <tr>
      <td>{`${customer.name}`}</td>
      <td>{customer.status ? "Ativo" : "Desativado"}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="bg-blue-1 row pa-1 text-white-1 border-radius-soft"
            onClick={() => setOpen(true)}
          >
            <PencilSimple className="icon-sm" />
          </button>
          <DialogCustomer
            customer={customer}
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
          <DialogDeleteCustomer
            customer={customer}
            onClose={closeModal}
            open={openDelete}
            reload={reload}
          />
        </div>
      </td>
    </tr>
  );
}
