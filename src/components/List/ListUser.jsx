import { PencilSimple, Trash, UserCircleGear } from "phosphor-react";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { removeUser } from "../../services/users";
import DialogUser from "../Dialog/DialogUser";

export default function ListUser(props) {
  const [open, setOpen] = useState(false);

  function manageRemove(id) {
    if (!id) return;

    const data = {
      id: id,
    };

    removeUser(data)
      .then((res) => res.json())
      .then(() => props.reloadList())
      .catch((err) => console.log(err));
  }

  function reloadList() {
    setOpen(false);
    props.reloadList();
  }

  return (
    <>
      {props.usersList.length > 0 ? (
        <ol className="gap-4 column">
          {props.usersList.map((user, index) => (
            <React.Fragment key={user.id}>
              <li className="row align-items-center justify-content-between py-2">
                <div className="row align-items-center gap-2">
                  <span className="font-md font-medium">{`${user.name} ${user.surname}`}</span>
                  {user.isAdmin ? (
                    <UserCircleGear
                      alt={user.isAdmin && "Administrador"}
                      className="icon-default"
                    />
                  ) : null}
                </div>
                <div className="row gap-2">
                  <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger className="bg-transparent">
                      <PencilSimple className="icon-default" />
                    </Dialog.Trigger>
                    <DialogUser userData={user} reloadList={reloadList} />
                  </Dialog.Root>
                  <Trash
                    className="icon-default btn-icon"
                    onClick={() => manageRemove(user.id)}
                  />
                </div>
              </li>

              {index < props.usersList.length - 1 ? <hr /> : null}
            </React.Fragment>
          ))}
        </ol>
      ) : null}
    </>
  );
}
