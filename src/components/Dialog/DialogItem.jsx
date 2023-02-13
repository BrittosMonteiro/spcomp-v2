import { XCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createItem, updateItem } from "../../services/itemService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import DialogDefault from "./DialogDefault";

export default function DialogItemDefault({
  item,
  open,
  onClose,
  reloadList,
  brandList,
  encapList,
  typeList,
}) {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [idEncap, setIdEncap] = useState("");
  const [idType, setIdType] = useState("");
  const [ipi, setIpi] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setIdBrand(item.brand.id);
      setIdType(item.type.id);
      setIdEncap(item.encap.id);
      setIpi(item.ipi);
      setWeight(item.weight);
      setNote(item.note);
    }
  }, [item]);

  function handleItem(e) {
    e.preventDefault();

    if (!description || !idBrand || !idType || !idEncap) {
      handleMessageBox("failed", true, "Preencha o formulário");
      return;
    }

    let data = {
      description,
      idBrand,
      idType,
      idEncap,
      ipi,
      weight,
      note,
    };

    if (item?.id) {
      data = { data, idItem: item.id };
      updateItemOnList(data);
    } else {
      create(data);
    }
  }

  async function create(data) {
    createItem(data)
      .then(() => {
        handleMessageBox("success", true, "Item cadastrado");
        onClose();
        reloadList();
        clearFields();
      })
      .catch(() => {
        handleMessageBox("failed", true, "Erro ao tentar criar um novo item");
      });
  }

  async function updateItemOnList(data) {
    await updateItem(data)
      .then(() => {
        handleMessageBox("success", true, "Item atualizado");
        onClose();
        reloadList();
      })
      .catch(() => {
        handleMessageBox("faile", true, "Não foi possível atualizar o item");
      });
  }

  function clearFields() {
    setDescription("");
    setIdBrand("");
    setIdType("");
    setIdEncap("");
    setIpi("");
    setWeight("");
    setNote("");
  }

  function handleMessageBox(color, display, message) {
    dispatch(displayMessageBox({ color, display, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <>
      <DialogDefault open={open} onClose={onClose}>
        <div className="row jc-between ai-start">
          <h1 className="font-medium font-lg">
            {item?.id ? "Informações do" : "Adicionar"} item
          </h1>
          <button
            type="button"
            className="flex bg-red-1 text-white-1 pa-1 border-radius-soft"
            onClick={() => onClose()}
          >
            <XCircle className="icon-default" />
          </button>
        </div>
        <form onSubmit={handleItem}>
          <div className="row align-item-center gap-4 mt-4">
            <div className="column gap-2 text-dark-3 font-medium font-sm">
              <label htmlFor="item_description">Descrição</label>
              <input
                type={"text"}
                name="item_description"
                id="item_description"
                defaultValue={description}
                placeholder="Descrição"
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm">
              <label htmlFor="item_brand">Marca</label>
              <select
                name="item_brand"
                id="item_brand"
                defaultValue={idBrand}
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setIdBrand(e.target.value)}
              >
                {brandList.length > 0 ? (
                  <>
                    <option>Escolher marca do item</option>
                    {brandList.map((brand, index) => (
                      <option value={brand.id} key={index}>
                        {brand.description}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>
          </div>

          <div className="row align-items-center gap-4 mt-8">
            <div className="column gap-2 text-dark-3 font-medium font-sm">
              <label htmlFor="item_type">Tipo</label>
              <select
                name="item_type"
                id="item_type"
                defaultValue={idType}
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setIdType(e.target.value)}
              >
                {typeList.length > 0 ? (
                  <>
                    <option>Escolher tipo do item</option>
                    {typeList.map((type, index) => (
                      <option value={type.id} key={index}>
                        {type.description}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm">
              <label htmlFor="item_encap">Encapsulamento</label>
              <select
                name="item_encap"
                id="item_encap"
                defaultValue={idEncap}
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setIdEncap(e.target.value)}
              >
                {encapList.length > 0 ? (
                  <>
                    <option>Escolher encapsulamento do item</option>
                    {encapList.map((encap, index) => (
                      <option value={encap.id} key={index}>
                        {encap.description}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>
          </div>

          <div className="row align-items-center gap-4 mt-8">
            <div className="column gap-2 text-dark-3 font-medium font-sm">
              <label htmlFor="item_ipi">IPI</label>
              <input
                type={"text"}
                name="item_ipi"
                id="item_ipi"
                defaultValue={ipi}
                placeholder="IPI do item"
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setIpi(e.target.value)}
              />
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm">
              <label htmlFor="item_weight">Peso</label>
              <input
                type={"text"}
                name="item_weight"
                id="item_weight"
                defaultValue={weight}
                placeholder="Peso do item"
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <div className="column gap-2 text-dark-3 font-medium font-sm mt-8">
            <label htmlFor="item_note">Observações</label>
            <textarea
              name="item_note"
              id="item_note"
              defaultValue={note}
              placeholder="Informações importantes sobre o item"
              className="border-default pa-2 border-radius-soft font-medium font-md"
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>

          <hr className="my-4" />

          <div className="row jc-between ai-center">
            <button
              type={"submit"}
              className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
            >
              {item?.id ? "Atualizar" : "Concluir"}
            </button>
          </div>
        </form>
      </DialogDefault>
    </>
  );
}
