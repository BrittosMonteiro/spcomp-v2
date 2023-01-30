import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowCircleRight, PaperPlaneTilt } from "phosphor-react";

import PageTitle from "../../../components/Common/PageTitle";
import DialogInquiry from "../../../components/Dialog/DialogInquiryList";
import FilterItems from "../../../components/Common/filterItems";
import InquiryTable from "../../../components/Tables/InquiryTable";
import { readInquiryItems } from "../../../services/inquiryItemService";

export default function Inquiry() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
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
        setOriginalItems(res.data.items);
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
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Cotações"} />
        <div className="row gap-2">
          {userSession.isAdmin && pending.length > 0 ? (
            <button
              type="button"
              className="row bg-green-1 text-white-1 align-items-center gap-2 pa-2"
              onClick={() => setOpen(true)}
            >
              <span className="font-medium font-sm">
                Enviar pendentes ({pending.length})
              </span>
              <PaperPlaneTilt className="icon-default" />
            </button>
          ) : null}
          <DialogInquiry open={open} onClose={closeModal} pending={pending} />
          <Link
            to={"/inquiry/list"}
            className="font-sm font-medium text-white-1 row align-items-center gap-2 bg-green-1 text-white-1 pa-2"
          >
            <span>Cotações enviadas</span>
            <ArrowCircleRight className="icon-default" />
          </Link>
        </div>
      </div>

      {originalItems.length > 0 ? (
        <FilterItems setItems={setItems} originalItems={originalItems} />
      ) : null}
      {items.length > 0 ? (
        // <List
        //   list={items}
        //   reloadList={reloadList}
        //   customers={customers}
        //   level={level}
        // />
        <InquiryTable list={items} reloadList={reloadList} />
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">Não há itens em cotação</p>
        </div>
      )}
    </>
  );
}
