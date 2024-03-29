import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import {
  createEncap,
  updateEncap,
} from "../../../../../../services/encapService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogEncap({ item, reload, onClose, open, title }) {
  const dispatch = useDispatch();

  const [encapName, setEncapName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setEncapName(item.description);
    } else {
      setEncapName("");
    }
  }, [item]);

  function handleEncap(e) {
    e.preventDefault();

    setIsLoading(true);

    if (item?.id) {
      updateEncapItem();
    } else {
      createEncapItem();
    }
  }

  async function updateEncapItem() {
    const data = { idEncap: item.id, data: { description: encapName } };
    await updateEncap(data)
      .then((responseUpdate) => {
        if (responseUpdate.status === 200) {
          reload();
          onClose();
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }
  async function createEncapItem() {
    const data = { description: encapName };
    await createEncap(data)
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
          reload();
          onClose();
          handleMessageBox("success", "Encapsulamento criado");
        } else {
          handleMessageBox("failed", "Não foi possível criar o encapsulamento");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível criar o encapsulamento");
      })
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
      <form onSubmit={handleEncap} className="column gap-4">
        <div className="row">
          <div className="column gap-2">
            <label htmlFor="encapName" className="font-sm font-light">
              Encapsulamento
            </label>
            <input
              type="text"
              className="border-default border-radius-soft pa-2 font-md font-medium"
              defaultValue={encapName}
              placeholder="Encapsulamento"
              onChange={(e) => setEncapName(e.target.value)}
            />
          </div>
        </div>
        <div className="row jc-start">
          <button className="flex bg-green-1 text-white-1 pa-2 font-medium font-md border-radius-soft">
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
