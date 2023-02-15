import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PaperPlaneTilt } from "phosphor-react";

import DialogInquiry from "../../../../components/Dialog/DialogInquiryList";
// import FilterItems from "../../../../components/Common/filterItems";
import InquiryTable from "./Components/TablesAndRows/InquiryTable";
import { readInquiryItems } from "../../../../services/inquiryItemService";

export default function Inquiries({ changeTab, suppliersList }) {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [items, setItems] = useState([]);
  // const [originalItems, setOriginalItems] = useState([]);
  const [pending, setPending] = useState([]);
  const [open, setOpen] = useState(false);

  async function loadList() {
    await readInquiryItems()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setItems(res.data.items);
        // setOriginalItems(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadList();
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

  function reloadList() {
    loadList();
  }

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
      {/* {originalItems.length > 0 ? (
        <FilterItems setItems={setItems} originalItems={originalItems} />
      ) : null} */}
      {items.length > 0 ? (
        <InquiryTable
          list={items}
          reloadList={reloadList}
          userSession={userSession}
        />
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">Não há itens em cotação</p>
        </div>
      )}
    </>
  );
}
