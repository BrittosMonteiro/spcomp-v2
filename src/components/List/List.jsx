import {
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
import { useState } from "react";

export default function List(props) {
  const navigate = useNavigate();
  const [inquiryPending, setInquiryPending] = useState(false);
  const [orderPending, setOrderPending] = useState(false);
  const [pendingItems, setPendingItems] = useState([]);

  // function setInquiry(item) {
  //   let inquiryList = JSON.parse(localStorage.getItem("inquiryList")) || [];
  //   inquiryList.push(item);
  //   localStorage.setItem("inquiryList", JSON.stringify(inquiryList));
  //   navigate("/inquiry");
  // }

  // function setImport(item) {
  //   navigate("/imports");
  // }

  function setSale(item) {
    navigate("/sales");
  }

  function removeItem(item) {
    console.log(item);
  }

  function manageRequest(item) {
    setPendingItems([...pendingItems, item]);
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
                  {inquiryPending || orderPending ? (
                    <input
                      type={"checkbox"}
                      onClick={() => manageRequest(item)}
                    />
                  ) : null}
                  <div className="column gap-2">
                    <div className="row gap-2">
                      <span className="font-medium font-md">
                        {item.description}
                      </span>
                      -<span className="font-medium font-md">{item.brand}</span>
                    </div>
                    <div className="row gap-4">
                      <span className="font-medium font-md">
                        Quantidade: {item.quantity}
                      </span>
                      <span className="font-medium font-md">
                        Tipo: {item.type}
                      </span>
                      <span className="font-medium font-md">
                        Enc.: {item.encap}
                      </span>
                      <span className="font-medium font-md">
                        IPI: {item.ipi}
                      </span>
                      <span className="font-medium font-md">
                        Peso: {item.weight}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row gap-2">
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <PencilSimple className="icon-default" />
                    </Dialog.Trigger>
                    <DialogItem itemData={item} teste={"teste"} />
                  </Dialog.Root>

                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <DotsThreeVertical className="icon-default" />
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="bg-white-1 border-default border-radius-soft pa-2 gap-4 column font-medium font-md">
                        {!inquiryPending && !orderPending ? (
                          <>
                            <DropdownMenu.Item
                              className="row align-items-center gap-2"
                              onClick={() => setInquiryPending(true)}
                            >
                              <Question className="icon-default" /> Cotar
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="row align-items-center gap-2"
                              onClick={() => setOrderPending(true)}
                            >
                              <ShoppingCart className="icon-default" />{" "}
                              Solicitar compra
                            </DropdownMenu.Item>
                          </>
                        ) : null}
                        <DropdownMenu.Item
                          className="row align-items-center gap-2"
                          onClick={() => setSale(item)}
                        >
                          <Tag className="icon-default" /> Criar pedido
                        </DropdownMenu.Item>
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
