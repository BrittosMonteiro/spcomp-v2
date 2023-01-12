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

  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [descriptionSearch, setDescriptionSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [encapSearch, setEncapSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  function loadList() {
    getAllItems()
      .then((res) => res.json())
      .then((res) => {
        setItems(res || []);
        setOriginalItems(res || []);
      })
      .catch(() => {
        handleMessageBox("Faile", true, "Não foi possível carregar os itens");
      });
  }

  useEffect(() => {
    loadList();
  }, []);

  function filter(description = "", type = "", encap = "", brand = "") {
    let newItems = [];
    if (description || type || encap || brand) {
      newItems = originalItems.filter(
        (item) =>
          item.description.toLowerCase().indexOf(description.toLowerCase()) >=
            0 ||
          item.type.toLowerCase() === type.toLowerCase() ||
          item.encap.toLowerCase() === encap.toLowerCase() ||
          item.brand.toLowerCase() === brand.toLowerCase()
      );
      setItems(newItems);
    }
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
      {1 + 1 === 2 && (
        <div className="column mt-4 gap-2">
          <div className="row gap-2">
            <div className="column gap-2">
              <label htmlFor="txt_description" className="font-sm font-light">
                Descrição
              </label>
              <input
                type={"text"}
                name="txt_description"
                id="txt_description"
                placeholder="Descrição"
                className="font-medium font-md border-default border-radius-soft pa-2"
                defaultValue={descriptionSearch}
                onChange={(e) => {
                  setDescriptionSearch(e.target.value);
                }}
              />
            </div>

            <div className="column gap-2">
              <label htmlFor="txt_type" className="font-sm font-light">
                Tipo
              </label>
              <input
                type={"text"}
                name="txt_type"
                id="txt_type"
                placeholder="Tipo"
                className="font-medium font-md border-default border-radius-soft pa-2"
                defaultValue={typeSearch}
                onChange={(e) => {
                  setTypeSearch(e.target.value);
                }}
              />
            </div>

            <div className="column gap-2">
              <label htmlFor="txt_encap" className="font-sm font-light">
                Encapsulamento
              </label>
              <input
                type={"text"}
                name="txt_encap"
                id="txt_encap"
                placeholder="Encapsulamento"
                className="font-medium font-md border-default border-radius-soft pa-2"
                defaultValue={encapSearch}
                onChange={(e) => {
                  setEncapSearch(e.target.value);
                }}
              />
            </div>

            <div className="column gap-2">
              <label htmlFor="txt_brand" className="font-sm font-light">
                Marca
              </label>
              <input
                type={"text"}
                name="txt_brand"
                id="txt_brand"
                placeholder="Marca"
                className="font-medium font-md border-default border-radius-soft pa-2"
                defaultValue={brandSearch}
                onChange={(e) => {
                  setBrandSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <button
              type="button"
              className="row align-items-center gap-2 font-md font-light pa-2 bg-green-1 text-white-1 border-radius-soft"
              onClick={() =>
                filter(descriptionSearch, typeSearch, encapSearch, brandSearch)
              }
            >
              <MagnifyingGlass /> Filtrar
            </button>
          </div>
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
