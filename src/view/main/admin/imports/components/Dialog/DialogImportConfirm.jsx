import { useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { createStockItemController } from "../../../../../../controller/stockController";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogImportConfirm({
  open,
  onClose,
  items,
  reloadList,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function confirmAllItems() {
    setIsLoading(true);

    const filteredItems = items.filter((e) => e.step === 6);

    const ids = filteredItems.map((e) => {
      return { idInquiryItem: e.idInquiryItem };
    });

    await createStockItemController(ids)
      .then(() => {
        onClose();
        reloadList();
        handleMessageBox("success", "Itens atualizados");
      })
      .catch(() => {
        handleMessageBox("failed", "Houve um problema ao atualizar os itens");
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
    <DialogDefault open={open} onClose={onClose} title={"Confirmar importação"}>
      <span className="font-md font-regular">
        Ao confirmar, todos os itens serão atualizados e alocados no estoque
      </span>
      <div className="row">
        <button
          type="type"
          className="flex ai-center bg-green-1 text-white-1 pa-2 border-radius-soft font-md font-medium"
          onClick={() => confirmAllItems()}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircleNotch className="icon-default spinning" />
          ) : (
            "Confirmar"
          )}
        </button>
      </div>
    </DialogDefault>
  );
}
