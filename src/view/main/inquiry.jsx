import PageTitle from "../../components/Common/PageTitle";
import { useEffect, useState } from "react";
import List from "../../components/List/List";
import { readInquiryItems } from "../../services/inquiryItemService";
import DialogInquiry from "../../components/Dialog/DialogInquiry";

export default function Inquiry() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  function loadList() {
    readInquiryItems()
      .then((res) => res.json())
      .then((res) => {
        setItems(res || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadList();
  }, []);

  function pendingItems() {
    if (items) {
      const pending = items.filter(
        (item) => item.quantity > 0 && item.unitPurchasePrice === 0
      );
      return pending;
    }
    return 0;
  }

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
        <span className="font-light font-md" onClick={() => setOpen(true)}>
          Cotar itens pendentes ({pendingItems().length})
        </span>
        <DialogInquiry
          open={open}
          onClose={closeModal}
          pending={pendingItems}
        />
      </div>
      <List list={items} reloadList={reloadList} hasLink={true} />
    </>
  );
}
