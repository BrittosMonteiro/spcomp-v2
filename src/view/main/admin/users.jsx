import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { readUsers } from "../../../services/usersService";
import DialogUser from "../../../components/Dialog/DialogUser";
import UsersTable from "./Components/UsersTable";

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
      <div className="row justify-content-between align-items-center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="font-medium font-sm bg-transparent pa-2 bg-green-1 border-radius-soft text-white-1">
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
