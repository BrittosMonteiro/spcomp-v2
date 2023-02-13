import { PencilSimple, TrashSimple } from "phosphor-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteCustomer } from "../../../../../../services/customerService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";
import DialogCustomer from "../Dialog/DialogCustomer";

export default function CustomerRow({ customer, reload }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  async function manageRemove(id) {
    if (id) {
      const data = {
        idCustomer: id,
      };

      await deleteCustomer(data)
        .then((response) => {
          if (response.status === 200) {
            handleMessageBox("success", "Cliente removido");
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

  function closeModal() {
    setOpen(false);
  }

  return (
    <tr>
      <td>{`${customer.name}`}</td>
      <td>{customer.status ? "Ativo" : "Desativado"}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="bg-blue-1 row pa-1 text-white-1 border-radius-soft"
            onClick={() => setOpen(true)}
          >
            <PencilSimple className="icon-sm" />
          </button>
          <DialogCustomer
            customer={customer}
            reload={reload}
            onClose={closeModal}
            open={open}
          />
          <button
            type="button"
            className="row bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => manageRemove(customer.id)}
          >
            <TrashSimple className="icon-sm" />
          </button>
        </div>
      </td>
    </tr>
  );
}
