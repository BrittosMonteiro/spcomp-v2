import { Copy, PencilSimple, Share, TrashSimple } from "phosphor-react";
import { deleteItem } from "../../services/itemService.js";
import { createInquiryItem } from "../../services/inquiryItemService";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DialogItem from "../Dialog/DialogItem.jsx";

export default function ListItemTableRow({ item, reloadList }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function createInquiry(item) {
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
        handleMessageBox("success", "Item enviado para cotação");
        navigate("/main/inquiry");
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível enviar para cotação");
      });
  }

  async function deleteItemFromList(item) {
    const data = {
      idItem: item.item.id,
    };
    await deleteItem(data)
      .then(() => {
        handleMessageBox("success", "Item removido");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", "Nao foi possível remover");
      });
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", "Texto copiado");
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));

    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }
  function closeModal() {
    setOpen(false);
  }
  return (
    <tr>
      <td>
        <div className="row">
          <div className="row mx-auto gap-2">
            <span>{item.item.description}</span>
            <button
              type="button"
              onClick={() => copyText(item.item.description)}
              className="row align-items-center bg-transparent"
            >
              <Copy className="icon-default" />
            </button>
          </div>
        </div>
      </td>
      <td>{item.item.type.description}</td>
      <td>{item.item.encap.description}</td>
      <td>{item.item.brand.description}</td>
      <td className="gap-2">
        <div className="row">
          <div className="row mx-auto align-items-center justify-content-between gap-1">
            <>
              <button
                className="row align-items-center bg-blue-1 text-white-1 pa-1 border-radius-soft"
                type="button"
                title="Editar item"
                onClick={() => setOpen(true)}
              >
                <PencilSimple className="icon-sm" />
              </button>
              <DialogItem
                item={item.item}
                onClose={closeModal}
                reloadList={reloadList}
                open={open}
                idUser={userSession.token}
              />
            </>

            <button
              className="row align-items-center bg-green-1 text-white-1 pa-1 border-radius-soft"
              type="button"
              title="Cotar item"
              onClick={() => createInquiry(item)}
            >
              <Share className="icon-sm" />
            </button>
            <button
              className="row align-items-center bg-red-1 text-white-1 pa-1 border-radius-soft"
              type="button"
              title="Apagar item"
              onClick={() => deleteItemFromList(item)}
            >
              <TrashSimple className="icon-sm" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}
