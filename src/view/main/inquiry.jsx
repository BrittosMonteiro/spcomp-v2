import PageTitle from "../../components/Common/PageTitle";
import { useEffect, useState } from "react";
import List from "../../components/List/List";
import { readInquiryItems } from "../../services/inquiryItemService";
import DialogInquiry from "../../components/Dialog/DialogInquiry";

export default function Inquiry() {
  const [items, setItems] = useState([]);
  const [pending, setPending] = useState([]);
  const [open, setOpen] = useState(false);

  async function loadList() {
    await readInquiryItems()
      .then((res) => res.json())
      .then((res) => {
        setItems(res || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function pendingItems() {
    if (items) {
      let pendingInquiryItems = [];

      const pending = items.filter(
        (item) => item.quantity > 0 && item.unitPurchasePrice === 0
      );

      for (let item of pending) {
        const data = {
          idItem: item.idItem,
          idInquiryItem: item.id,
          description: item.description,
          brand: item.brand,
          encap: item.encap,
          quantity: item.quantity,
          type: item.type,
          unitPurchasePrice: item.unitPurchasePrice,
        };
        pendingInquiryItems.push(data);
      }
      setPending(pendingInquiryItems);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  useEffect(() => {
    pendingItems();
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
        {pending.length > 0 ? (
          <span className="font-light font-md" onClick={() => setOpen(true)}>
            Cotar itens pendentes ({pending.length})
          </span>
        ) : null}
        <DialogInquiry open={open} onClose={closeModal} pending={pending} />
      </div>
      {items.length > 0 ? (
        <List list={items} reloadList={reloadList} hasLink={true} />
      ) : (
        <div className="mx-auto">
          <p className="font-lg font-light">Não há itens em cotação</p>
        </div>
      )}
    </>
  );
}
