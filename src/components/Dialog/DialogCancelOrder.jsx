import { useState } from "react";
import { updateInquiryItemStep } from "../../services/inquiryItemService";
import { deleteOrderListItem } from "../../services/orderListService";
import { updateRequestItem } from "../../services/requestService";

export default function DialogCancel({
  open,
  onClose,
  item,
  role,
  reloadRequestList,
}) {
  function closeModal(e) {
    const elementId = e.target.id === "overlay";
    if (elementId) onClose();
  }

  async function cancelItem() {
    if (!reason) return;

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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateStep(data) {
    await updateInquiryItemStep(data)
      .then((responseUpdate) => {
        if (responseUpdate) {
          setReasonToCancelOrder();
        }
      })
      .catch((err) => {
        console.log(err);
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
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {open && (
        <div className="overlay" id="overlay" onClick={(e) => closeModal(e)}>
          <div className="dialog gap-4">
            <h1 className="font-medium font-lg">Cancelar o item</h1>
            <p className="font-md font-regular">
              Você está prestes a{" "}
              <span className="bg-red-1 text-white-1 pa-1">cancelar</span> o
              item <strong>{item.item.description}</strong>. Deseja continuar?
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
            <div className="row align-items-center justify-content-between">
              <button
                className="bg-transparent text-red-1 border-radius-soft pa-2 font-sm font-medium"
                onClick={() => onClose()}
              >
                Fechar
              </button>
              <button
                className="bg-green-1 text-white-1 border-radius-soft pa-2"
                onClick={() => cancelItem()}
              >
                Cancelar item
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
