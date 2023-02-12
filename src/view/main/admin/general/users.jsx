import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { readUsers } from "../../../../services/usersService";
import DialogUser from "../../../../components/Dialog/DialogUser";
import UsersTable from "./Components/TablesAndRows/UsersTable";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);

  async function loadList() {
    await readUsers()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setUsersList(response.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadList();
  }, []);

  function reloadList() {
    loadList();
    setOpen(false);
  }

  return (
    <>
      <div className="flex jc-between ai-center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="action-btn font-medium font-sm pa-1 border-radius-soft">
            Adicionar novo usuário
          </Dialog.Trigger>
          <DialogUser reloadList={reloadList} />
        </Dialog.Root>
      </div>
      {usersList.length > 0 ? (
        <UsersTable usersList={usersList} reloadList={reloadList} />
      ) : null}
    </>
  );
}