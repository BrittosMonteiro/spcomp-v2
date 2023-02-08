import { PencilSimple, XCircle } from "phosphor-react";
import { useState } from "react";

import { deleteEncap } from "../../../../../services/encapService";
import DialogEncap from "../Dialog/DialogEncap";

export default function EncapsRow({ item, reload }) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  async function deleteEncapItem() {
    await deleteEncap({ idEncap: item.id })
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          reload();
        }
      })
      .catch((err) => {});
  }

  return (
    <tr>
      <td>{item.description}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="flex bg-blue-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => setOpen(true)}
          >
            <PencilSimple className="icon-default" />
          </button>
          <DialogEncap
            open={open}
            onClose={closeModal}
            item={item}
            reload={reload}
            title={"Editar encapsulamento"}
          />
          <button
            type="button"
            className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => deleteEncapItem()}
          >
            <XCircle className="icon-default" />
          </button>
        </div>
      </td>
    </tr>
  );
}
