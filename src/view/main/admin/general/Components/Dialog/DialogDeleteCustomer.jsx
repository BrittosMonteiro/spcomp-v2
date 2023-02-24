import { CircleNotch } from "phosphor-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteCustomer } from "../../../../../../services/customerService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogDeleteCustomer({
  open,
  onClose,
  reload,
  customer,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoadin] = useState(false);

  async function manageRemove(id) {
    if (!id) return;

    setIsLoadin(true);

    const data = {
      idCustomer: id,
    };

    await deleteCustomer(data)
      .then((response) => {
        if (response.status === 200) {
          handleMessageBox("success", "Cliente removido");
          onClose();
          reload();
        } else {
          handleMessageBox("failed", "Não foi possível remover o cliente");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível remover o cliente");
      })
      .finally(() => {
        setIsLoadin(false);
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }
  return (
    <DialogDefault open={open} onClose={onClose} title={"Remover cliente"}>
      <span className="font-sm font-medium">
        O cliente{" "}
        <span className="bg-red-1 text-white-1 pa-1">{customer.name}</span> será
        removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(customer.id)}
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
