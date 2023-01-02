import PageTitle from "../../components/Common/PageTitle";
import DialogItem from "../../components/Dialog/DialogItem";
import List from "../../components/List/List";
import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlass } from "phosphor-react";
import { useState, useEffect } from "react";
import { getAllItems } from "../../services/itemService";

export default function Items() {
  const [textSearch, setTextSearch] = useState("");
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  function loadList() {
    getAllItems()
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

  function search(txt) {
    setTextSearch(txt);
  }

  function reloadList() {
    loadList();
    setOpen(false);
  }

  return (
    <>
      <div className="row justify-content-between">
        <PageTitle title={"Itens cadastrados"} />

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="font-medium font-sm bg-transparent">
            Adicionar novo item
          </Dialog.Trigger>
          <DialogItem reloadList={reloadList} />
        </Dialog.Root>
      </div>
      <div className="filter column mt-4">
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
      </div>
      <List list={items} reloadList={reloadList} />
    </>
  );
}
