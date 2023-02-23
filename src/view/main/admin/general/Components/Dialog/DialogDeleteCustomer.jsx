import { TrashSimple, XCircle } from "phosphor-react";
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

  async function manageRemove(id) {
    if (id) {
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
        });
    }
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }
  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium text-dark-1">Remover cliente</h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <span className="font-sm font-medium">
        O cliente{" "}
        <span className="bg-red-1 text-white-1 pa-1">{customer.name}</span> será
        removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(customer.id)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-1 font-md font-medium border-radius-soft"
        >
          Apagar <TrashSimple className="icon-sm" />
        </button>
      </div>
    </DialogDefault>
  );
}
