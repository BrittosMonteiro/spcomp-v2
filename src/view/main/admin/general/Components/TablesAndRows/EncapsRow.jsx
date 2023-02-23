import { useState } from "react";
import { PencilSimple, TrashSimple } from "phosphor-react";

import DialogEncap from "../Dialog/DialogEncap";
import DialogDeleteEncap from "../Dialog/DialogDeleteEncap";

export default function EncapsRow({ item, reload }) {
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
            className="flex bg-blue-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => setOpen(true)}
          >
            <PencilSimple className="icon-sm" />
          </button>
          <DialogEncap
            open={open}
            onClose={closeModal}
            item={item}
            reload={reload}
            title={"Editar encapsulamento"}
          />
          <button
            type="button"
            className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => setOpenDelete(true)}
          >
            <TrashSimple className="icon-sm" />
          </button>
          <DialogDeleteEncap
            encap={item}
            onClose={closeModal}
            open={openDelete}
            reload={reload}
          />
        </div>
      </td>
    </tr>
  );
}
