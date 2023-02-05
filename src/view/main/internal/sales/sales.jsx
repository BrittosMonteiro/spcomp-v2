import { useState, useEffect } from "react";

import PageTitle from "../../../../components/Common/PageTitle";
import List from "../../../../components/List/List";

export default function Sales() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("purchaseList")) || []);
  }, []);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Vendas"} />
      </div>
      <List list={items} />
    </>
  );
}
