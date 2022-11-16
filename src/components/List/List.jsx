import {
  ArchiveBox,
  DotsThreeVertical,
  PencilSimple,
  Question,
  ShoppingCart,
  Tag,
  TrashSimple,
} from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import DialogItem from "../Dialog/DialogItem";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";

import { deleteItem } from "../../services/itemService";
import {
  addItemToInquiryList,
  deleteItemFromInquiryList,
} from "../../services/inquiryService";
import { deleteItemFromPurchaseList } from "../../services/purchaseService";
import { addItemToPurchaseList } from "../../services/purchaseService";
import { deleteStockItem, postStockItem } from "../../services/stockService";
import { useState } from "react";

export default function List(props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  function setInquiryItem(item) {
    item.status = "Pendente";
    item.step = 1;
    item.quantity = 0;
    item.unitPrice = 0;
    item.unitSalePrice = 0;
    item.unitPurchasePrice = 0;

    addItemToInquiryList(item)
      .then(() => {
        navigate("/main/inquiry");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function setPurchaseItem(item) {
    if (!item.quantity || !item.unitPurchasePrice || !item.unitSalePrice)
      return;

    item.step = 2;

    await addItemToPurchaseList(item)
      .then(() => {
        navigate("/main/purchase");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function moveToStock(item) {
    item.step = 3;
    item.status = "Reservado";
    await postStockItem(item)
      .then(() => {
        navigate("/stock");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeItem(item) {
    const data = {
      id: item.id,
    };
    switch (item.step) {
      case 1:
        deleteFromItemInquiry(data);
        break;
      case 2:
        deleteFromItemPurchase(data);
        break;
      case 3:
        deleteFromItemStock(data);
        break;
      default:
        deleteFromItemList(data);
        break;
    }
  }

  async function deleteFromItemList(data) {
    await deleteItem(data)
      .then(() => {
        props.reloadList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteFromItemInquiry(data) {
    await deleteItemFromInquiryList(data)
      .then(() => {
        props.reloadList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteFromItemPurchase(data) {
    await deleteItemFromPurchaseList(data)
      .then(() => {
        props.reloadList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function deleteFromItemStock(data) {
    await deleteStockItem(data)
      .then(() => {
        props.reloadList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function reloadList() {
    setOpen(false);
    props.reloadList();
  }

  return (
    <>
      {props.list.length > 0 ? (
        <ul
          className="gap-4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {props.list.map((item) => (
            <li key={item.id}>
              <div className="row justify-content-between align-items-center pa-2 border-radius-soft border-default">
                <div className="row gap-4">
                  <div className="column gap-2">
                    <div className="row gap-2">
                      <span className="font-medium font-md">
                        {item.description}
                      </span>
                      -<span className="font-medium font-md">{item.brand}</span>
                    </div>
                    <div className="row gap-4">
                      {item.quantity ? (
                        <>
                          <span className="font-medium font-md">
                            Quantidade: {item.quantity}
                          </span>{" "}
                          -{" "}
                        </>
                      ) : null}
                      <span className="font-medium font-md">
                        Tipo: {item.type}
                      </span>
                      -
                      <span className="font-medium font-md">
                        Enc.: {item.encap}
                      </span>
                      -
                      <span className="font-medium font-md">
                        IPI: {item.ipi ? item.ipi : "-"}
                      </span>
                      -
                      <span className="font-medium font-md">
                        Peso: {item.weight ? item.weight : "-"}
                      </span>
                      {item.status ? (
                        <>
                          -
                          <span className="font-medium font-md">
                            Status: {item.status}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row gap-2">
                  <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger className="bg-transparent">
                      <PencilSimple className="icon-default" />
                    </Dialog.Trigger>
                    <DialogItem itemData={item} reloadList={reloadList} />
                  </Dialog.Root>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger className="bg-transparent">
                      <DotsThreeVertical className="icon-default" />
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="bg-white-1 border-default border-radius-soft pa-2 gap-4 column font-medium font-md">
                        {item.step !== 1 ? (
                          <DropdownMenu.Item
                            className="row align-items-center gap-2"
                            onClick={() => setInquiryItem(item)}
                          >
                            <Question className="icon-default" /> Cotar
                          </DropdownMenu.Item>
                        ) : null}
                        {item.step >= 1 ? (
                          <DropdownMenu.Item
                            className="row align-items-center gap-2"
                            onClick={() => setPurchaseItem(item)}
                          >
                            <ShoppingCart className="icon-default" /> Solicitar
                            compra
                          </DropdownMenu.Item>
                        ) : null}

                        {item.step === 2 && item.status === "Concluído" ? (
                          <DropdownMenu.Item
                            className="row align-items-center gap-2"
                            onClick={() => moveToStock(item)}
                          >
                            <ArchiveBox className="icon-default" /> Mover para
                            estoque
                          </DropdownMenu.Item>
                        ) : null}

                        {item.step === 3 ? (
                          <DropdownMenu.Item className="row align-items-center gap-2">
                            <Tag className="icon-default" /> Criar pedido
                          </DropdownMenu.Item>
                        ) : null}
                        <DropdownMenu.Item
                          className="row align-items-center gap-2"
                          onClick={() => removeItem(item)}
                        >
                          <TrashSimple className="icon-default" /> Remover
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
