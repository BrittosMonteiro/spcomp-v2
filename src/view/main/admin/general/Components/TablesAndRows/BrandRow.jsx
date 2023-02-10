import { PencilSimple, XCircle } from "phosphor-react";
import { useState } from "react";
import { deleteBrand } from "../../../../../../services/brandService";
import DialogBrand from "../Dialog/DialogBrand";

export default function BrandRow({ item, reload }) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  async function deleteBrandItem(id) {
    await deleteBrand({ idBrand: id }).then((responseDelete) => {
      if (responseDelete.status === 200) {
        reload();
      }
    });
  }

  return (
    <tr>
      <td>{item.description}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="flex bg-blue-1 text-white-1 border-radius-soft pa-1"
            onClick={() => setOpen(true)}
          >
            <PencilSimple alt="Editar marca" className="icon-default" />
          </button>
          <DialogBrand
            item={item}
            onClose={closeModal}
            open={open}
            reload={reload}
            title={"Editar marca"}
          />
          <button
            type="button"
            className="flex bg-red-1 text-white-1 border-radius-soft pa-1"
            onClick={() => deleteBrandItem(item.id)}
          >
            <XCircle alt="Remover marca" className="icon-default" />
          </button>
        </div>
      </td>
    </tr>
  );
}
