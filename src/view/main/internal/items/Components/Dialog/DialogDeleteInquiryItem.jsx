import { useDispatch } from "react-redux";
import { XCircle } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteInquiryItem } from "../../../../../../services/inquiryItemService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function DialogDeleteInquiryItem({
  open,
  onClose,
  reload,
  item,
}) {
  const dispatch = useDispatch();
  async function manageRemove(idInquiryItem) {
    await deleteInquiryItem({ idInquiryItem })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Item removido");
        reload();
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível remover o item");
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));

    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }
  return (
    <DialogDefault open={open} onClose={onClose}>
      <div className="row jc-between ai-start">
        <h1 className="font-lg font-medium text-dark-1">
          Remover item da cotação
        </h1>
        <button
          type="button"
          className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
          onClick={() => onClose()}
        >
          <XCircle className="icon-default" />
        </button>
      </div>
      <span className="font-sm font-medium">
        O item {item.description} será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(item.idInquiryItem)}
          className="flex gap-1 ai-center bg-red-1 text-white-1 pa-1 font-md font-medium border-radius-soft"
        >
          Apagar
        </button>
      </div>
    </DialogDefault>
  );
}
