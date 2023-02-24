import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PaperPlaneTilt } from "phosphor-react";

import DialogInquiry from "../../../../components/Dialog/DialogInquiryList";
// import FilterItems from "../../../../components/Common/filterItems";
import InquiryTable from "./Components/TablesAndRows/InquiryTable";
import {
  readInquiryItems,
  readInquiryItemsAdmin,
} from "../../../../services/inquiryItemService";

export default function Inquiries({ changeTab, suppliersList }) {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState([]);
  const [open, setOpen] = useState(false);
  const [contentMessage, setContentMessage] = useState();

  async function loadListNonAdmin() {
    setContentMessage("Carregando informações");

    await readInquiryItems()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (items.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há itens em cotação");
        }
      });
  }

  async function loadInquiryListAdmin() {
    setContentMessage("Carregando informações");

    await readInquiryItemsAdmin()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (items.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há itens em cotação");
        }
      });
  }

  function reloadList() {
    if (userSession.isAdmin) {
      loadInquiryListAdmin();
    } else {
      loadListNonAdmin();
    }
  }

  useEffect(() => {
    reloadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (items) {
      let pendingInquiryItems = [];
      const pending = items.filter((item) => item.item.item.step === 1);

      for (let item of pending) {
        pendingInquiryItems.push(item.item.idInquiryItem);
      }
      setPending(pendingInquiryItems);
    }
  }, [items]);

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      {userSession.isAdmin && pending.length > 0 ? (
        <>
          <div className="row justify-content-between align-items-center">
            <div className="row gap-2">
              <button
                type="button"
                className="row action-btn ai-center gap-2 pa-1 border-radius-soft"
                onClick={() => setOpen(true)}
              >
                <span className="font-medium font-sm">
                  Enviar pendentes ({pending.length})
                </span>
                <PaperPlaneTilt className="icon-sm" />
              </button>
            </div>
          </div>
          <DialogInquiry
            open={open}
            onClose={closeModal}
            pending={pending}
            changeTab={changeTab}
            suppliersList={suppliersList}
          />
        </>
      ) : null}

      {items.length > 0 ? (
        <InquiryTable
          list={items}
          reloadList={reloadList}
          userSession={userSession}
        />
      ) : (
        <div className="row">
          <p className="font-md font-medium">{contentMessage}</p>
        </div>
      )}
    </>
  );
}
