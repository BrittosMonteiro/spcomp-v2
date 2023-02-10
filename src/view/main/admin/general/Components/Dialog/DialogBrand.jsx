import { XCircle } from "phosphor-react";
import { useEffect, useState } from "react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { createBrand, updateBrand } from "../../../../../../services/brandService";

export default function DialogBrand({ open, onClose, reload, title, item }) {
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    if (item) {
      setBrandName(item.description);
    } else {
      setBrandName("");
    }
  }, [item]);

  function handleBrand(e) {
    e.preventDefault();
    if (item?.id) {
      updateBrandName();
    } else {
      createNewBrand();
    }
  }

  async function updateBrandName() {
    const data = {
      idBrand: item.id,
      data: {
        description: brandName,
      },
    };
    await updateBrand(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reload();
          onClose();
        }
      })
      .catch((err) => {})
      .finally(() => {
        setBrandName("");
      });
  }

  async function createNewBrand() {
    const data = {
      description: brandName,
    };
    await createBrand(data)
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
          reload();
          onClose();
        }
      })
      .catch((err) => {})
      .finally(() => {
        setBrandName("");
      });
  }

  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium">{title}</h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <form onSubmit={handleBrand} className="column gap-4">
        <div className="row">
          <div className="column gap-2">
            <label htmlFor="brandName" className="font-sm font-light">
              Nome da marca
            </label>
            <input
              type={"text"}
              placeholder="Marca"
              className="border-default border-radius-soft pa-2 font-md font-medium"
              defaultValue={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>
        </div>
        <div className="row jc-start">
          <button
            type="submit"
            className="bg-green-1 text-white-1 font-md font-medium pa-1 border-radius-soft"
          >
            Criar
          </button>
        </div>
      </form>
    </DialogDefault>
  );
}
