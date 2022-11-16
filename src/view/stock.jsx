import PageTitle from "../components/Common/PageTitle";
import { useState, useEffect } from "react";
import List from "../components/List/List";
import { getStockItemList } from "../services/stockService";

export default function Stock() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getStockItemList()
      .then((res) => res.json())
      .then((res) => setItems(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Estoque"} />
      </div>
      <List list={items} />
    </>
  );
}
