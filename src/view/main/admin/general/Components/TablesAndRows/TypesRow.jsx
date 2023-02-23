import { useState } from "react";
import { PencilSimple, TrashSimple } from "phosphor-react";

import DialogType from "../Dialog/DialogType";
import DialogDeleteType from "../Dialog/DialogDeleteType";

export default function TypesRow({ item, reload }) {
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
          <DialogType
            open={open}
            onClose={closeModal}
            reload={reload}
            title={"Editar tipo"}
            item={item}
          />
          <button
            type="button"
            className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => setOpenDelete(true)}
          >
            <TrashSimple className="icon-sm" />
          </button>
          <DialogDeleteType
            onClose={closeModal}
            open={openDelete}
            reload={reload}
            type={item}
          />
        </div>
      </td>
    </tr>
  );
}
