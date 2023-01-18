import PageTitle from "../../../components/Common/PageTitle";
import List from "../../../components/List/List";
import { useState, useEffect } from "react";
import { readItems } from "../../../services/itemService";
import DialogItem from "../../../components/Dialog/DialogItem";
import { useSelector } from "react-redux";
import FilterItems from "../../../components/Common/filterItems";

export default function Items() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [level, setLevel] = useState("");
  const [open, setOpen] = useState(false);

  async function loadList() {
    await readItems()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setItems(response.data.itemsList);
        setOriginalItems(response.data.itemsList);
        setLevel(response.data.level);
      })
      .catch(() => {});
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

  return (
    <>
      <div className="row justify-content-between align-items-center">
        <PageTitle title={"Itens cadastrados"} />
        {userSession.isAdmin && (
          <>
            <button
              type="button"
              className="bg-green-1 pa-2 border-radius-soft"
              onClick={() => setOpen(true)}
            >
              <span className="font-sm font-medium text-white-1">
                Adicionar novo item
              </span>
            </button>
            <DialogItem
              open={open}
              onClose={closeModal}
              reloadList={reloadList}
              idUser={userSession.token}
            />
          </>
        )}
      </div>
      {originalItems.length > 0 ? (
        <FilterItems setItems={setItems} originalItems={originalItems} />
      ) : null}
      {items.length > 0 ? (
        <List list={items} level={level} reloadList={reloadList} />
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">Não há itens cadastrados</p>
        </div>
      )}
    </>
  );
}
