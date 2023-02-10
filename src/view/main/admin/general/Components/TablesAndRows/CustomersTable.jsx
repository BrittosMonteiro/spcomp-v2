import { useState } from "react";
import { useDispatch } from "react-redux";
import { PencilSimple, TrashSimple } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import DialogCustomer from "../../../../../../components/Dialog/DialogCustomer";
import { deleteCustomer } from "../../../../../../services/customerService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function CustomersTable({ customersList, reloadList }) {
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
            reloadList();
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

  function reloadCustomersList() {
    setOpen(false);
    reloadList();
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {customersList.map((customer, index) => (
          <tr key={index}>
            <td>{`${customer.name}`}</td>
            <td>{customer.status ? "Ativo" : "Desativado"}</td>
            <td>
              <div className="row gap-2">
                <Dialog.Root open={open} onOpenChange={setOpen}>
                  <Dialog.Trigger className="bg-blue-1 row pa-1 text-white-1 border-radius-soft">
                    <PencilSimple className="icon-sm" />
                  </Dialog.Trigger>
                  <DialogCustomer
                    customerData={customer}
                    reloadList={reloadCustomersList}
                  />
                </Dialog.Root>
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
        ))}
      </tbody>
    </table>
  );
}
