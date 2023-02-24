import { useEffect, useState } from "react";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import {
  createBrand,
  updateBrand,
} from "../../../../../../services/brandService";

export default function DialogBrand({ open, onClose, reload, title, item }) {
  const [brandName, setBrandName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setBrandName(item.description);
    } else {
      setBrandName("");
    }
  }, [item]);

  function handleBrand(e) {
    e.preventDefault();

    setIsLoading(true);

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
        setIsLoading(false);
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
        setIsLoading(false);
      });
  }

  return (
    <DialogDefault open={open} onClose={onClose} title={title}>
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
            type={"submit"}
            className="flex font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
          >
            {isLoading ? (
              <CircleNotch className="icon-default spinning" />
            ) : (
              <>{item?.id ? "Atualizar" : "Criar"}</>
            )}
          </button>
        </div>
      </form>
    </DialogDefault>
  );
}
