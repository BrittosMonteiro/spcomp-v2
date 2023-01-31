import { CheckCircle, PaperPlaneTilt, XCircle } from "phosphor-react";
import { useState } from "react";
import { updateInquiryItemStep } from "../../services/inquiryItemService";
import { createOrderListItem } from "../../services/orderListService";
import { createStockItem } from "../../services/stockService";
import DialogCancel from "../Dialog/DialogCancelOrder";

export default function ListOrder({ order, reloadRequestList, user }) {
  const [open, setOpen] = useState(false);

  async function sendOrderToSupplier(step) {
    const data = { pending: order.item.idInquiry, step: step };
    await createOrderListItem({ idInquiryItem: data.pending })
      .then((responseCreate) => {
        if (responseCreate.status === 200) {
          updateStep(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function setItemToStock(step) {
    const data = { pending: order.item.idInquiry, step };
    await createStockItem({ idInquiryItem: data.pending })
      .then((responseCreate) => {
        if (responseCreate.status === 201) {
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
          reloadRequestList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeModal() {
    setOpen(false);
  }

  const itemStep = [
    "",
    "",
    "",
    "",
    "Aguardando envio ao fornecedor",
    "Pedido enviado",
    "Pedido confirmado pelo fornecedor",
    "Item recebido",
    "Pedido de venda",
    "Cancelado pelo administrador",
    "Cancelado pelo vendedor",
    "Cancelado pelo fornecedor",
  ];

  return (
    <li className="column gap-4">
      <div className="column gap-2">
        <div className="row">
          <span className="bg-green-1 text-white-1 pa-1 font-sm font-light">
            {`${itemStep[order.item.step]}`}
            {order.item.step >= 9 &&
              order.item.step <= 11 &&
              order.item.reason && (
                <span>&nbsp;-&nbsp;{order.item.reason}</span>
              )}
          </span>
        </div>
      </div>
      <div className="row justify-content-between align-items-start">
        <div className="row gap-4">
          <div className="column gap-1">
            <span className="font-sm font-light">Qtd.</span>
            <span className="font-md font-medium">{order.item.quantity}</span>
          </div>
          <div className="column gap-1">
            <span className="font-sm font-light">Descrição</span>
            <span className="font-md font-medium">
              {order.item.description}
            </span>
          </div>
          <div className="column gap-1">
            <span className="font-sm font-light">Tipo</span>
            <span className="font-md font-medium">{order.item.type}</span>
          </div>
          <div className="column gap-1">
            <span className="font-sm font-light">Encap.</span>
            <span className="font-md font-medium">{order.item.encap}</span>
          </div>
          <div className="column gap-1">
            <span className="font-sm font-light">Marca</span>
            <span className="font-md font-medium">{order.item.brand}</span>
          </div>
          <div className="column gap-1">
            <span className="font-sm font-light">Compra</span>
            <span className="font-md font-medium">
              USD {order.item.unitPurchasePrice}
            </span>
          </div>
          <div className="column gap-1">
            <span className="font-sm font-light">Venda</span>
            <span className="font-md font-medium">
              R$ {order.item.unitSalePrice}
            </span>
          </div>
        </div>
        <div className="row gap-4">
          {order.item.step < 5 ? (
            <button
              type="button"
              className="text-white-1 pa-1 border-radius-soft bg-green-1"
              onClick={() => sendOrderToSupplier(5)}
            >
              <PaperPlaneTilt
                alt="Enviar ao fornecedor"
                className="icon-default"
              />
            </button>
          ) : null}
          {(order.item.step < 9 || order.item.step > 11) &&
          order.item.step !== 7 &&
          order.item.step !== 8 &&
          user.isAdmin ? (
            <>
              <button
                type="button"
                className="bg-red-1 text-white-1 pa-1 border-radius-soft"
                onClick={() => setOpen(true)}
                title="Cancelar item"
              >
                <XCircle className="icon-default" />
              </button>
              <DialogCancel
                item={order}
                onClose={closeModal}
                open={open}
                role={user.role}
                reloadRequestList={reloadRequestList}
              />
            </>
          ) : null}
          {order.item.step === 5 && !user.isAdmin ? (
            <button
              title="Accept order"
              type="button"
              className="row bg-green-1 pa-1 border-radius-soft text-white-1 align-items-center gap-1"
              onClick={() =>
                updateStep({ pending: order.item.idInquiry, step: 6 })
              }
            >
              <CheckCircle className="icon-default" /> <span>Accept item</span>
            </button>
          ) : null}
          {order.item.step === 6 && user.isAdmin ? (
            <button
              title="Accept order"
              type="button"
              className="row bg-green-1 pa-1 border-radius-soft text-white-1 align-items-center gap-1"
              onClick={() => setItemToStock(7)}
            >
              <CheckCircle className="icon-default" />{" "}
              <span>Item recebido</span>
            </button>
          ) : null}
        </div>
      </div>
      <div className="row gap-4">
        {order?.user ? (
          <span className="font-sm font-light">
            Vendedor(a):{" "}
            <span className="font-bold">{order.user.username}</span>
          </span>
        ) : null}

        {order?.customer ? (
          <span className="font-sm font-light">
            Cliente: <span className="font-bold">{order.customer.name}</span>
          </span>
        ) : null}

        {order?.supplier ? (
          <span className="font-sm font-light">
            Fornecedor: <span className="font-bold">{order.supplier.name}</span>
          </span>
        ) : null}
      </div>
    </li>
  );
}
