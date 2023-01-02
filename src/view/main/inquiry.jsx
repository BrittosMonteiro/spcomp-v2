import PageTitle from "../../components/Common/PageTitle";
import { useEffect, useState } from "react";
import List from "../../components/List/List";
import { getAllItemsFromInquiryList } from "../../services/inquiryService";

export default function Inquiry() {
  const [items, setItems] = useState([]);

  function loadList() {
    getAllItemsFromInquiryList()
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

  function reloadList() {
    loadList();
  }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Cotações"} />
      </div>
      <List list={items} reloadList={reloadList} />
    </>
  );
}
