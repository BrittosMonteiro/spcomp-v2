import { useEffect, useState } from "react";
import PageTitle from "../../../components/Common/PageTitle";
import List from "../../../components/List/List";
// import { getPurchaseList } from "../../../services/purchaseService";

export default function Imports() {
  const [items, setItems] = useState([]);

  // function loadList() {
  //   getPurchaseList()
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setItems(res || []);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // useEffect(() => {
  //   loadList();
  // }, []);

  // function reloadList() {
  //   loadList();
  // }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Compras"} />
      </div>
      {/* <List list={items} reloadList={reloadList} /> */}
    </>
  );
}
