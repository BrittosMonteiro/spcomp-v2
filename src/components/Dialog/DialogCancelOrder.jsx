import { useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import { updateInquiryItemStep } from "../../services/inquiryItemService";
import { deleteOrderListItem } from "../../services/orderListService";
import { updateRequestItem } from "../../services/requestService";
import DialogDefault from "./DialogDefault";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function DialogCancel({
  open,
  onClose,
  item,
  role,
  reloadRequestList,
}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  async function cancelItem() {
    if (!reason) return;

    setIsLoading(true);

    if (role === 1) {
      deleteOrderToSupplier({
        pending: item.item.idInquiry,
        step: 9,
        reason: reason,
      });
    } else {
      deleteOrderToSupplier({
        pending: item.item.idInquiry,
        step: 10,
        reason: reason,
      });
    }
  }
  const [reason, setReason] = useState("");

  async function deleteOrderToSupplier(data) {
    await deleteOrderListItem({ idInquiryItem: data.pending })
      .then((responseDelete) => {
        if (responseDelete.status === 200) {
          updateStep(data);
          handleMessageBox("success", "Pedido cancelado");
        } else {
          handleMessageBox("failed", "Não foi possível cancelar o pedido");
        }
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível cancelar o pedido");
      })
      .finally(() => {
        onClose();
        setIsLoading(false);
      });
  }

  async function updateStep(data) {
    await updateInquiryItemStep(data)
      .then((responseUpdate) => {
        if (responseUpdate) {
          setReasonToCancelOrder();
        }
      })
      .catch(() => {})
      .finally(() => {
        onClose();
        setIsLoading(false);
      });
  }

  async function setReasonToCancelOrder() {
    const data = {
      idOrder: item.idOrder,
      reason,
    };

    await updateRequestItem(data)
      .then((responseUpdate) => {
        if (responseUpdate) {
          reloadRequestList();
        }
      })
      .catch(() => {})
      .finally(() => {
        onClose();
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
    <DialogDefault open={open} onClose={onClose} title={"Cancelar o item"}>
      <p className="font-md font-regular">
        Você está prestes a cancelar o item{" "}
        <span className="bg-red-1 text-white-1 pa-1">
          {item.item.description}
        </span>
        . Deseja continuar?
      </p>
      <div className="column gap-2">
        <label htmlFor="text_reason" className="font-md font-regular">
          Descreva abaixo o motivo do cancelamento
        </label>
        <textarea
          id="text_reason"
          name="text_reason"
          defaultValue={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border-default border-radius-soft pa-2 font-md font-medium"
        ></textarea>
      </div>
      <div className="row jc-between ai-center">
        <button
          className="flex ai-center font-md font-medium bg-red-1 text-white-1 border-radius-soft pa-2"
          onClick={() => cancelItem()}
        >
          {isLoading ? (
            <CircleNotch className="icon-default spinning" />
          ) : (
            "Cancelar item"
          )}
        </button>
      </div>
    </DialogDefault>
  );
}
