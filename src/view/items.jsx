import PageTitle from "../components/Common/PageTitle";
import DialogItem from "../components/Dialog/DialogItem";
import List from "../components/List/List";
import * as Dialog from "@radix-ui/react-dialog";
// import { MagnifyingGlass } from "phosphor-react";
import { useState, useEffect } from "react";

export default function Items() {
  // const [textSearch, setTextSearch] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("itemsRegistered")) || []);
  }, []);

  // function search(txt) {
  //   setTextSearch(txt);
  // }

  return (
    <>
      <div className="row justify-content-between">
        <PageTitle title={"Itens cadastrados"} />

        <Dialog.Root>
          <Dialog.Trigger className="font-medium font-sm">
            Adicionar novo item
          </Dialog.Trigger>
          <DialogItem />
        </Dialog.Root>
      </div>
      {/* <div className="filter column mt-4">
        <div className="row gap-2 py-2">
          <MagnifyingGlass className="icon-default" />
          <input
            type={"text"}
            name="item_description"
            id="item_description"
            placeholder="Pesquisar"
            className="font-medium font-md"
            defaultValue={textSearch}
            onChange={(e) => search(e.target.value)}
          />
        </div>
        <span className="font-medium font-md mt-4">Filtrar</span>
        <div className="row gap-8 mt-4"></div>
      </div> */}
      <List list={items} />
    </>
  );
}
