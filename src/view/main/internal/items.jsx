import PageTitle from "../../../components/Common/PageTitle";
import List from "../../../components/List/List";
import { useState, useEffect } from "react";
import { readItems } from "../../../services/itemService";
import DialogItem from "../../../components/Dialog/DialogItem";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../store/actions/messageBoxAction";
import FilterItems from "../../../components/Common/filterItems";

export default function Items() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [open, setOpen] = useState(false);

  async function loadList() {
    await readItems()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setItems(response.data || []);
        setOriginalItems(response.data || []);
      })
      .catch(() => {
        handleMessageBox("Faile", true, "Não foi possível carregar os itens");
      });
  }

  useEffect(() => {
    loadList();
  }, []);

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
        <DialogItem
          open={open}
          onClose={closeModal}
          reloadList={reloadList}
          idUser={userSession.token}
        />
      </div>
      {originalItems.length > 0 ? (
        <FilterItems setItems={setItems} originalItems={originalItems} />
      ) : null}
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
