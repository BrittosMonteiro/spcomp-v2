import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Copy,
  ListPlus,
  PencilSimple,
  RepeatOnce,
  TrashSimple,
} from "phosphor-react";

import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";
import {
  createInquiryItem,
  deleteInquiryItem,
  updateInquiryItemStep,
} from "../../../../../../services/inquiryItemService";
import { createRequestItem } from "../../../../../../services/requestService.js";
import DialogInquiry from "../../../../../../components/Dialog/DialogInquiry";

export default function InquiryTableRow({ item, reloadList, customers }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [open, setOpen] = useState(false);

  async function duplicateInquiryItem(item) {
    const data = {
      idItem: item.item.id,
      idUser: userSession.token,
    };
    await createInquiryItem(data)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Item duplicado");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível duplicar o item");
      });
  }

  async function deleteItemFromList(idInquiryItem) {
    await deleteInquiryItem({ idInquiryItem })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Item removido");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível remover o item");
      });
  }

  async function createPurchase() {
    const idInquiryItem = item.item.idInquiryItem;

    await createRequestItem({ idInquiryItem })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Pedido criado");
        updateItemStep(idInquiryItem);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateItemStep(item) {
    const data = {
      pending: item,
      step: 4,
    };
    await updateInquiryItemStep(data)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        reloadList();
      })
      .catch(() => {});
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));

    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", "Texto copiado");
  }

  function closeModal() {
    setOpen(false);
  }

  const itemStep = [
    "Aguardando quantidade/cliente",
    "Pronto para cotar",
    "Enviado para cotar",
    "Cotado",
    "Pedido colocado",
    "Pedido enviado",
    "Pedido confirmado pelo fornecedor",
    "Item em estoque",
    "Pedido de venda",
    "Cancelado pelo administrador",
    "Cancelado pelo vendedor",
    "Cancelado pelo fornecedor",
  ];

  return (
    <tr>
      <td>{item.item.createdAt}</td>
      <td>{item.item.item.quantity}</td>
      <td>
        <div className="row">
          <div className="row gap-2">
            <button
              type="button"
              className="bg-transparent"
              onClick={() => copyText(item.item.item.description)}
              title="Copiar texto"
            >
              <Copy className="icon-sm" />
            </button>
            {userSession.isAdmin ? (
              <Link
                to={`/admin/inquiry/item/${item.item.idInquiryItem}`}
                className="text-dark-1"
              >
                {item.item.item.description}
              </Link>
            ) : (
              item.item.item.description
            )}
          </div>
        </div>
      </td>
      <td>{item.item.item.type.description}</td>
      <td>{item.item.item.encap.description}</td>
      <td>{item.item.item.brand.description}</td>
      <td>{item.item.customer.name}</td>
      <td>{item.item.user.username}</td>
      <td>{itemStep[item.item.item.step]}</td>
      <td>
        <div className="row">
          <div className="row align-items-center gap-2">
            <>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="row bg-blue-1 text-white-1 pa-1 border-radius-soft"
                title="Alterar item"
              >
                <PencilSimple className="icon-sm" />
              </button>
              <DialogInquiry
                item={item.item}
                onClose={closeModal}
                open={open}
                reloadList={reloadList}
                customers={customers}
                userSession={userSession}
              />
            </>
            <button
              type="button"
              onClick={() => duplicateInquiryItem(item.item)}
              className="row bg-orange-1 text-white-1 pa-1 border-radius-soft"
              title="Repetir item"
            >
              <RepeatOnce className="icon-sm" />
            </button>
            {item.item.item.unitPurchasePrice &&
            item.item.item.unitSalePrice &&
            item.item.item.step === 3 &&
            item.item.user.id === userSession.token ? (
              <button
                type="button"
                onClick={() => createPurchase()}
                className="row bg-green-1 text-white-1 pa-1 border-radius-soft"
                title="Realizar pedido"
              >
                <ListPlus className="icon-sm" />
              </button>
            ) : null}

            {(userSession.isAdmin || item.item.user.id === userSession.token) &&
              item.item.item.step <= 1 && (
                <button
                  type="button"
                  onClick={() => deleteItemFromList(item.item.idInquiryItem)}
                  className="row bg-red-1 text-white-1 pa-1 border-radius-soft"
                  title="Apagar item"
                >
                  <TrashSimple className="icon-sm" />
                </button>
              )}
          </div>
        </div>
      </td>
    </tr>
  );
}
