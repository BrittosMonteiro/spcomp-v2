import { useState, useEffect } from "react";

import { readUsers } from "../../../../services/usersService";
import DialogUser from "./Components/Dialog/DialogUser";
import UsersTable from "./Components/TablesAndRows/UsersTable";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [contentMessage, setContentMessage] = useState("");

  async function loadList() {
    setContentMessage("Carregando informações");

    await readUsers()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setUsersList(response.data || []);
      })
      .catch(() => {
        setContentMessage("Não foi possível carregar. Tente mais tarde");
      })
      .finally(() => {
        if (usersList.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há usuários cadastrados");
        }
      });
  }

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <div className="flex jc-between ai-center">
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
      ) : (
        <div className="row">
          <p className="font-md font-medium">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
