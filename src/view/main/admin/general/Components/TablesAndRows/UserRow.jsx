import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";
import { deleteUser } from "../../../../../../services/usersService";
import DialogUser from "../Dialog/DialogUser";

export default function UserRow({ user, reload }) {
  const [open, setOpen] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    const data = {
      idUser: id,
    };

    await deleteUser(data)
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
            onClick={() => manageRemove(user.id)}
          >
            <TrashSimple className="icon-sm" />
          </button>
        </div>
      </td>
    </tr>
  );
}
