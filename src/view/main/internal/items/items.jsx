import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { readItems } from "../../../../services/itemService";
import DialogItem from "../../../../components/Dialog/DialogItem";
// import FilterItems from "../../../../components/Common/filterItems";
import ItemTable from "./Components/TablesAndRows/ItemTable";

export default function Items({ changeTab, brandList, encapList, typeList }) {
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [contentMessage, setContentMessage] = useState();

  async function loadList() {
    setContentMessage("Carregando informações");

    await readItems()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((response) => {
        setItems(response.data.itemsList);
      })
      .catch(() => {})
      .finally(() => {
        if (items.length > 0) {
          setContentMessage("");
        } else {
          setContentMessage("Não há itens cadastrados");
        }
      });
  }

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reloadList() {
    loadList();
    setOpen(false);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div className="column gap-4">
      {userSession.isAdmin && (
        <div className="row jc-start align-items-center">
          <button
            type="button"
            className="pa-1 border-radius-soft action-btn font-sm font-medium"
            onClick={() => setOpen(true)}
          >
            Adicionar novo item
          </button>
          <DialogItem
            open={open}
            onClose={closeModal}
            reloadList={reloadList}
            idUser={userSession.token}
            brandList={brandList}
            encapList={encapList}
            typeList={typeList}
          />
        </div>
      )}

      {items.length > 0 ? (
        <ItemTable
          list={items}
          reloadList={reloadList}
          changeTab={changeTab}
          brandList={brandList}
          encapList={encapList}
          typeList={typeList}
        />
      ) : (
        <div className="row">
          <p className="font-md font-medium">{contentMessage}</p>
        </div>
      )}
    </div>
  );
}
