import PageTitle from "../../components/Common/PageTitle";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { getUsersList } from "../../services/users";
import DialogUser from "../../components/Dialog/DialogUser";
import ListUser from "../../components/List/ListUser";

export default function Users() {
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);

  function loadList() {
    getUsersList()
      .then((res) => res.json())
      .then((res) => {
        setUsersList(res || []);
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
        <PageTitle title={"Usuários"} />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="font-medium font-sm bg-transparent">
            Adicionar novo usuário
          </Dialog.Trigger>
          <DialogUser reloadList={reloadList} />
        </Dialog.Root>
      </div>
      <ListUser usersList={usersList} reloadList={reloadList} />
    </>
  );
}
