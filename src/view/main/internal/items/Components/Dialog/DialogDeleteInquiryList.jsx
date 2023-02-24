import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteInquiryHistory } from "../../../../../../services/inquiryHistoryService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction.js";
import { useState } from "react";

export default function DialogDeleteInquiryList({
  open,
  onClose,
  reload,
  inquiryHistory,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function manageRemove(idInquiryHistory, status) {
    if (status) {
      return handleMessageBox(
        "failed",
        "Não podemos excluir uma cotação ativa"
      );
    }

    setIsLoading(true);

    const data = {
      idInquiryHistory,
    };

    await deleteInquiryHistory(data)
      .then((response) => {
        if (response.status === 200) {
          handleMessageBox("success", "Cotação excluída!");
          reload();
          onClose();
        } else {
          handleMessageBox("failed", "Não foi possível excluir!");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível excluir!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setInterval(() => {
      dispatch(hideMessageBox());
    }, 2500);
  }
  return (
    <DialogDefault open={open} onClose={onClose} title={"Remover cotação"}>
      <span className="font-sm font-medium">
        A cotação será removida. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(inquiryHistory.id, inquiryHistory.status)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-2 font-md font-medium border-radius-soft"
        >
          {isLoading ? (
            <CircleNotch className="icon-default spinning" />
          ) : (
            "Apagar"
          )}
        </button>
      </div>
    </DialogDefault>
  );
}
