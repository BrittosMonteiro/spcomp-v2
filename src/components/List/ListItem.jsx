import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Copy, PencilSimple, Share, TrashSimple } from "phosphor-react";

import DialogItem from "../Dialog/DialogItem";

import { createInquiryItem } from "../../services/inquiryItemService";
import { deleteItem } from "../../services/itemService";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function ListItem({ item, reloadList }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function createInquiry(item) {
    const data = {
      idItem: item.id,
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
      idItem: item.id,
    };
    await deleteItem(data)
      .then(() => {
        handleMessageBox("success", true, "Item removido");
        reloadList();
      })
      .catch(() => {
        handleMessageBox("failed", true, "Nao foi possível remover");
      });
  }

  function closeModal() {
    setOpen(false);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", true, "Texto copiado");
  }

  function handleMessageBox(color, display, message) {
    dispatch(displayMessageBox({ color, display, message }));

    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <li className="column py-4 gap-2">
      <div className="row justify-content-between">
        <div className="row gap-4">
          <div className="column gap-1">
            <span className="font-light font-sm">Description</span>
            <div className="row gap-2">
              {userSession.isAdmin ? (
                <Link
                  to={`/admin/inquiry/item/${item.id}`}
                  className="font-medium font-md text-dark-3"
                >
                  {item.description}
                </Link>
              ) : (
                <span className="font-medium font-md">{item.description}</span>
              )}
              <button type="button" className="bg-transparent">
                <Copy
                  alt="Copar texto"
                  className="icon-default"
                  onClick={() => copyText(item.description)}
                />
              </button>
            </div>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Type</span>
            <span className="font-medium font-md">{item.type.description}</span>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Encap</span>
            <span className="font-medium font-md">
              {item.encap.description}
            </span>
          </div>
          <div className="column gap-1">
            <span className="font-light font-sm">Brand</span>
            <span className="font-medium font-md">
              {item.brand.description}
            </span>
          </div>
        </div>
        <div className="row align-items-center gap-4">
          <div className="row gap-2">
            <button
              type="button"
              className="bg-transparent"
              onClick={() => setOpen(true)}
            >
              <PencilSimple alt="Visualizar item" className="icon-default" />
            </button>
            <DialogItem
              item={item}
              onClose={closeModal}
              reloadList={reloadList}
              open={open}
              idUser={userSession.token}
            />

            <button
              type="button"
              className="bg-transparent"
              onClick={() => createInquiry(item)}
            >
              <Share alt="Cotar item" className="icon-default" />
            </button>

            {userSession.isAdmin && (
              <button
                type="button"
                className="bg-transparent"
                onClick={() => deleteItemFromList(item)}
              >
                <TrashSimple alt="Remover item" className="icon-default" />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
