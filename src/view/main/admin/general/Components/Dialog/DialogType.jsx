import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { createType, updateType } from "../../../../../../services/typeService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogType({ reload, open, onClose, title, item }) {
  const dispatch = useDispatch();

  const [typeName, setTypeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setTypeName(item.description);
    } else {
      setTypeName("");
    }
  }, [item]);

  function handleType(e) {
    e.preventDefault();

    setIsLoading(true);

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
          handleMessageBox("success", "Item alterado");
        } else {
          handleMessageBox("failed", "Não foi possível alterar o item");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível alterar o item");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <DialogDefault open={open} onClose={onClose} title={title}>
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
            className="flex bg-green-1 text-white-1 font-md font-medium pa-2 border-radius-soft"
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
