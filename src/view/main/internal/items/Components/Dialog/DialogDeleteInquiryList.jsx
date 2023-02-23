import { TrashSimple, XCircle } from "phosphor-react";
import { useDispatch } from "react-redux";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteInquiryHistory } from "../../../../../../services/inquiryHistoryService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction.js";

export default function DialogDeleteInquiryList({
  open,
  onClose,
  reload,
  inquiryHistory,
}) {
  const dispatch = useDispatch();
  async function manageRemove(idInquiryHistory, status) {
    if (status) {
      return handleMessageBox(
        "failed",
        "Não podemos excluir uma cotação ativa"
      );
    }

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
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setInterval(() => {
      dispatch(hideMessageBox());
    }, 2500);
  }
  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium text-dark-1">Remover cotação</h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <span className="font-sm font-medium">
        A cotação será removida. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(inquiryHistory.id, inquiryHistory.status)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-1 font-md font-medium border-radius-soft"
        >
          Apagar <TrashSimple className="icon-sm" />
        </button>
      </div>
    </DialogDefault>
  );
}
