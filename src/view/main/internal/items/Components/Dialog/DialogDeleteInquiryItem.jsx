import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import DialogDefault from "../../../../../../components/Dialog/DialogDefault";
import { deleteInquiryItem } from "../../../../../../services/inquiryItemService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";
import { useState } from "react";

export default function DialogDeleteInquiryItem({
  open,
  onClose,
  reload,
  item,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  async function manageRemove(idInquiryItem) {
    if (!idInquiryItem) return;

    setIsLoading(true);

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
    <DialogDefault
      open={open}
      onClose={onClose}
      title={"Remover item da cotação"}
    >
      <span className="font-sm font-medium">
        O item{" "}
        <span className="bg-red-1 text-white-1 pa-1">
          {item.item.description}
        </span>{" "}
        será removido. Você confirma esta ação?
      </span>
      <div className="row">
        <button
          type="button"
          onClick={() => manageRemove(item.idInquiryItem)}
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
