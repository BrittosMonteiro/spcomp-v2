import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PageTitle from "../../../components/Common/PageTitle";
import { readItems } from "../../../services/itemService";
import DialogItem from "../../../components/Dialog/DialogItem";
import FilterItems from "../../../components/Common/filterItems";
import ItemTable from "../../../components/Tables/ItemTable";

export default function Items() {
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
        setItems(response.data.itemsList);
        setOriginalItems(response.data.itemsList);
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
        <ItemTable list={items} reloadList={reloadList} />
      ) : (
        <div className="ma-auto">
          <p className="font-lg font-light">Não há itens cadastrados</p>
        </div>
      )}
    </>
  );
}
