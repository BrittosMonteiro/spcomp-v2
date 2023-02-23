import { useState } from "react";
import { PencilSimple, TrashSimple } from "phosphor-react";

import DialogUser from "../Dialog/DialogUser";
import DialogDeleteUser from "../Dialog/DialogDeleteUser";

export default function UserRow({ user, reload }) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function closeModal() {
    setOpen(false);
    setOpenDelete(false);
  }

  return (
    <tr>
      <td>{`${user.name} ${user.surname}`}</td>
      <td>{user.isAdmin ? "Sim" : "Não"}</td>
      <td>{user.status ? "Ativo" : "Desativado"}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="bg-blue-1 row pa-1 text-white-1 border-radius-soft"
            onClick={() => setOpen(true)}
          >
            <PencilSimple className="icon-sm" />
          </button>
          <DialogUser
            user={user}
            reload={reload}
            open={open}
            onClose={closeModal}
          />
          <button
            type="button"
            className="row bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => {setOpenDelete(true);}}
          >
            <TrashSimple className="icon-sm" />
          </button>
          <DialogDeleteUser
            open={openDelete}
            onClose={closeModal}
            reload={reload}
            user={user}
          />
        </div>
      </td>
    </tr>
  );
}
