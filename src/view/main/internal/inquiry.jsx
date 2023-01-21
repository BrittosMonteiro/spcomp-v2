import PageTitle from "../../../components/Common/PageTitle";
import { useEffect, useState } from "react";
import List from "../../../components/List/List";
import { readInquiryItems } from "../../../services/inquiryItemService";
import DialogInquiry from "../../../components/Dialog/DialogInquiryList";
import FilterItems from "../../../components/Common/filterItems";
import { useSelector } from "react-redux";
import { readCustomerToItem } from "../../../services/customerService";
import { PaperPlaneTilt } from "phosphor-react";

export default function Inquiry() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [level, setLevel] = useState("");
  const [customers, setCustomers] = useState([]);
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
        setLevel(res.data.level);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadCustomers() {
    await readCustomerToItem()
      .then((response) => {
        if (response.status !== 200) {
          console.log("Não pôde carregar");
        } else {
          return response.json();
        }
      })
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadList();
    loadCustomers();
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
        {userSession.isAdmin && pending.length > 0 ? (
          <button
            type="button"
            className="row bg-green-1 text-white-1 align-items-center gap-2 pa-2 border-radius-soft"
            onClick={() => setOpen(true)}
          >
            <PaperPlaneTilt className="icon-default" />
            <span className="font-medium font-sm">
              Enviar pendentes ({pending.length})
            </span>
          </button>
        ) : null}
        <DialogInquiry open={open} onClose={closeModal} pending={pending} />
      </div>

      {originalItems.length > 0 ? (
        <FilterItems setItems={setItems} originalItems={originalItems} />
      ) : null}
      {items.length > 0 ? (
        <List
          list={items}
          reloadList={reloadList}
          customers={customers}
          level={level}
        />
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">Não há itens em cotação</p>
        </div>
      )}
    </>
  );
}
