import { useEffect, useState } from "react";
import PageTitle from "../components/Common/PageTitle";
import List from "../components/List/List";

export default function Imports() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("purchaseList")) || []);
  }, []);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Compras"} />
      </div>
      <List list={items} />
    </>
  );
}
