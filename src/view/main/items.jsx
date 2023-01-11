import PageTitle from "../../components/Common/PageTitle";
import List from "../../components/List/List";
import { MagnifyingGlass } from "phosphor-react";
import { useState, useEffect } from "react";
import { getAllItems } from "../../services/itemService";
import DialogItem from "../../components/Dialog/DialogItem";
import { useDispatch } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function Items() {
  const dispatch = useDispatch();

  const [textSearch, setTextSearch] = useState("");
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  function loadList() {
    getAllItems()
      .then((res) => res.json())
      .then((res) => {
        setItems(res || []);
      })
      .catch(() => {
        handleMessageBox("Faile", true, "Não foi possível carregar os itens");
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

  function closeModal() {
    setOpen(false);
  }

  function handleMessageBox(color, display, message) {
    dispatch(displayMessageBox({ color, display, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Itens cadastrados"} />
        <span onClick={() => setOpen(true)}>Adicionar novo item</span>
        <DialogItem open={open} onClose={closeModal} reloadList={reloadList} />
      </div>
      {1 + 1 === 3 && (
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
      )}
      {items.length > 0 ? (
        <List list={items} reloadList={reloadList} />
      ) : (
        <div className="mx-auto">
          <p className="font-lg font-light">Não há itens cadastrados</p>
        </div>
      )}
    </>
  );
}
