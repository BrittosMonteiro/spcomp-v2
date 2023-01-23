import { PaperPlaneTilt, XCircle } from "phosphor-react";
import { updateInquiryItemStep } from "../../services/inquiryItemService";
import {
  createOrderListItem,
  deleteOrderListItem,
} from "../../services/orderListService";

export default function ListOrder({ order, reloadOrderList, user }) {
  async function handleOrder(step, role) {
    //Send to supplier - step 5
    if (step && !role) {
      sendOrderToSupplier({ pending: order.item.idInquiry, step: step });
    }

    //Cancel item
    if (!step && role) {
      if (role === 1) {
        deleteOrderToSupplier({ pending: order.item.idInquiry, step: 9 });
      } else {
        deleteOrderToSupplier({ pending: order.item.idInquiry, step: 10 });
      }
    }
  }

  async function sendOrderToSupplier(data) {
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

  async function updateStep(data) {
    await updateInquiryItemStep(data)
      .then((responseUpdate) => {
        if (responseUpdate) {
          reloadOrderList();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
      <div className="row">
        <span className="bg-green-1 text-white-1 pa-1 font-sm font-light">
          {itemStep[order.item.step]}
        </span>
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
              onClick={() => handleOrder(5, null)}
            >
              <PaperPlaneTilt
                alt="Enviar ao fornecedor"
                className="icon-default"
              />
            </button>
          ) : null}
          {order.item.step < 9 || order.item.step > 11 ? (
            <button
              type="button"
              className="bg-red-1 text-white-1 pa-1 border-radius-soft"
              onClick={() => handleOrder(null, user.role)}
            >
              <XCircle alt="Cancelar item" className="icon-default" />
            </button>
          ) : null}
        </div>
      </div>
      <div className="row gap-4">
        <span className="font-sm font-light">
          Vendedor(a): <span className="font-bold">{order.user.username}</span>
        </span>

        <span className="font-sm font-light">
          Cliente: <span className="font-bold">{order.customer.name}</span>
        </span>

        <span className="font-sm font-light">
          Fornecedor: <span className="font-bold">{order.supplier.name}</span>
        </span>
      </div>
    </li>
  );
}
