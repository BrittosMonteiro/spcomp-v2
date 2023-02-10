import { XCircle } from "phosphor-react";
import { useEffect, useState } from "react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { createType, updateType } from "../../../../../../services/typeService";

export default function DialogType({ reload, open, onClose, title, item }) {
  const [typeName, setTypeName] = useState("");

  useEffect(() => {
    if (item) {
      setTypeName(item.description);
    } else {
      setTypeName("");
    }
  }, [item]);

  function handleType(e) {
    e.preventDefault();
    if (item?.id) {
      updateTypeItem();
    } else {
      createTypeItem();
    }
  }

  async function updateTypeItem() {
    const data = { idType: item.id, data: { description: typeName } };
    await updateType(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reload();
          onClose();
        }
      })
      .catch((err) => {});
  }

  async function createTypeItem() {
    const data = { description: typeName };
    await createType(data)
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
          reload();
          onClose();
        }
      })
      .catch((err) => {});
  }

  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium">{title}</h1>
        <button
          type="button"
          className="bg-red-1 flex text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <form onSubmit={handleType} className="column gap-4">
        <div className="row">
          <div className="column gap-2">
            <label htmlFor="typeName" className="font-sm font-light">
              Tipo
            </label>
            <input
              type={"text"}
              placeholder="Tipo"
              className="border-default border-radius-soft pa-2 font-md font-medium"
              defaultValue={typeName}
              onChange={(e) => setTypeName(e.target.value)}
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
