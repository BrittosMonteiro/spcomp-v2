import PageTitle from "../components/Common/PageTitle";
import { useState, useEffect } from "react";
import List from "../components/List/List";

export default function Stock() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("purchaseList")) || []);
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
