import { useState, useEffect } from "react";

import { readUsers } from "../../../../services/usersService";
import DialogUser from "./Components/Dialog/DialogUser";
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

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <div className="flex jc-between ai-center">
        {/* <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="action-btn font-medium font-sm pa-1 border-radius-soft">
            Adicionar novo usuário
          </Dialog.Trigger>
          <DialogUser reloadList={reloadList} />
        </Dialog.Root> */}
        <button
          type="button"
          className="action-btn font-medium font-sm pa-1 border-radius-soft"
          onClick={() => setOpen(true)}
        >
          Adicionar novo usuário
        </button>
        <DialogUser onClose={closeModal} open={open} reload={loadList} />
      </div>
      {usersList.length > 0 ? (
        <UsersTable usersList={usersList} reload={loadList} />
      ) : null}
    </>
  );
}
