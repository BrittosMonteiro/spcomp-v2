import { CircleNotch } from "phosphor-react";
import { useState } from "react";
import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteUser } from "../../../../../../services/usersService";

export default function DialogDeleteUser({ open, onClose, user, reload }) {
  const [isLoading, setIsLoading] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    setIsLoading(true);

    const data = {
      idUser: id,
    };

    await deleteUser(data)
      .then((response) => {
        if (response.status === 200) {
          reload();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <DialogDefault open={open} onClose={onClose} title={"Remover usuário"}>
      <span className="font-sm font-medium">
        O usuário{" "}
        <span className="bg-red-1 text-white-1 pa-1">
          {user.name} {user.surname}
        </span>{" "}
        será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(user.id)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-2 font-md font-medium border-radius-soft"
        >
          {isLoading ? (
            <CircleNotch className="icon-default spinning" />
          ) : (
            "Apagar"
          )}
        </button>
      </div>
    </DialogDefault>
  );
}
