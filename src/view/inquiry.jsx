import PageTitle from "../components/Common/PageTitle";
import { useEffect, useState } from "react";
import List from "../components/List/List";

export default function Inquiry() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("inquiryList")) || []);
  }, []);

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Cotações"} />
      </div>
      <List list={items} />
    </>
  );
}
