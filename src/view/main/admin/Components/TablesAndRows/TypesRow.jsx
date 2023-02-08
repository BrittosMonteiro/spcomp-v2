import { PencilSimple, XCircle } from "phosphor-react";
import { useState } from "react";
import { deleteType } from "../../../../../services/typeService";
import DialogType from "../Dialog/DialogType";

export default function TypesRow({ item, reload }) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  async function deleteTypeItem() {
    await deleteType({ idType: item.id })
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
          <DialogType
            open={open}
            onClose={closeModal}
            reload={reload}
            title={"Editar tipo"}
            item={item}
          />
          <button
            type="button"
            className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => deleteTypeItem()}
          >
            <XCircle className="icon-default" />
          </button>
        </div>
      </td>
    </tr>
  );
}
