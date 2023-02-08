import { useState } from "react";
import { PencilSimple, TrashSimple } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { deleteUser } from "../../../../../services/usersService";
import DialogUser from "../../../../../components/Dialog/DialogUser";

export default function UsersTable({ usersList, reloadList }) {
  const [open, setOpen] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    const data = {
      idUser: id,
    };

    await deleteUser(data)
      .then((response) => {
        if (response.status === 200) {
          reloadList();
        }
      })
      .catch((err) => console.log(err));
  }

  function reloadUsersList() {
    setOpen(false);
    reloadList();
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Admin</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user, index) => (
          <tr key={index}>
            <td>{`${user.name} ${user.surname}`}</td>
            <td>{user.isAdmin ? "Sim" : "Não"}</td>
            <td>{user.status ? "Ativo" : "Desativado"}</td>
            <td>
              <div className="row gap-2">
                <Dialog.Root open={open} onOpenChange={setOpen}>
                  <Dialog.Trigger className="bg-blue-1 row pa-1 text-white-1 border-radius-soft">
                    <PencilSimple className="icon-sm" />
                  </Dialog.Trigger>
                  <DialogUser userData={user} reloadList={reloadUsersList} />
                </Dialog.Root>
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
        ))}
      </tbody>
    </table>
  );
}
