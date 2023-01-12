import { useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function FilterItems({
  setItems,
  originalItems,
  reloadPendingItems,
}) {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [descriptionSearch, setDescriptionSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [encapSearch, setEncapSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [salesPersonSearch, setSalesPersonSearch] = useState("");

  function filter(
    description = "",
    type = "",
    encap = "",
    brand = "",
    salesPerson = ""
  ) {
    let newItems = [];
    if (description || type || encap || brand || salesPerson) {
      newItems = originalItems.filter(
        (item) =>
          item.description.toLowerCase() === description.toLowerCase() ||
          item.type.toLowerCase() === type.toLowerCase() ||
          item.encap.toLowerCase() === encap.toLowerCase() ||
          item.brand.toLowerCase() === brand.toLowerCase() ||
          item.nameUser.toLowerCase() === salesPerson.toLowerCase()
      );
      setItems(newItems);
    } else {
      setItems(originalItems);
    }
    reloadPendingItems();
  }

  useEffect(() => {
    if (userSession) {
      setSalesPersonSearch(userSession.username);
    }
  }, [userSession]);

  return (
    <div className="filter column mt-4 gap-2">
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

        <div className="column gap-2">
          <label htmlFor="txt_salesPerson" className="font-sm font-light">
            Vendedor
          </label>
          <input
            type={"text"}
            name="txt_salesPerson"
            id="txt_salesPerson"
            placeholder="Vendedor"
            className="font-medium font-md border-default border-radius-soft pa-2"
            defaultValue={salesPersonSearch}
            onChange={(e) => {
              setSalesPersonSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="row">
        <button
          type="button"
          className="row align-items-center gap-2 font-md font-light pa-2 bg-green-1 text-white-1 border-radius-soft"
          onClick={() =>
            filter(
              descriptionSearch,
              typeSearch,
              encapSearch,
              brandSearch,
              salesPersonSearch
            )
          }
        >
          <MagnifyingGlass /> Filtrar
        </button>
      </div>
    </div>
  );
}
