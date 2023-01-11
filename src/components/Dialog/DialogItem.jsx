import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrandList } from "../../services/brandService";
import { getEncapList } from "../../services/encapService";
import { updateInquiryItem } from "../../services/inquiryItemService";
import { createItem, updateItem } from "../../services/itemService";
import { getTypeList } from "../../services/typeService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function DialogItemDefault({ item, open, onClose, reloadList }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [brandList, setBrandList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [encapList, setEncapList] = useState([]);
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [encap, setEncap] = useState("");
  const [ipi, setIpi] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitSalePrice, setUnitSalePrice] = useState(0);
  const [unitPurchasePrice, setUnitPurchasePrice] = useState(0);

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setBrand(item.brand);
      setType(item.type);
      setEncap(item.encap);
      setIpi(item.ipi);
      setWeight(item.weight);
      setNote(item.note);
      setStep(item.step);
      setStatus(item.status);
      setQuantity(item.quantity);
      setUnitSalePrice(item.unitSalePrice);
      setUnitPurchasePrice(item.unitPurchasePrice);
    }
  }, [item]);

  useEffect(() => {
    getBrandList()
      .then((res) => res.json())
      .then((res) => setBrandList(res))
      .catch(() =>
        handleMessageBox("failed", true, "As marcas não foram carregadas")
      );

    getTypeList()
      .then((res) => res.json())
      .then((res) => setTypeList(res))
      .catch(() =>
        handleMessageBox("failed", true, "Os tipos não foram carregados")
      );

    getEncapList()
      .then((res) => res.json())
      .then((res) => setEncapList(res))
      .catch((err) =>
        handleMessageBox(
          "failed",
          true,
          "Os encapsulamentos não foram carregados"
        )
      );
  }, []);

  function handleItem(e) {
    e.preventDefault();

    if (!description || !brand || !type || !encap || !ipi || !weight || !note) {
      handleMessageBox("failed", true, "Preencha o formulário");
      return;
    }

    let data = {
      description: description,
      brand: brand,
      type: type,
      encap: encap,
      ipi: ipi,
      weight: weight,
      note: note,
      step: step,
      status: status,
    };

    manageItem(data);
  }

  function manageItem(data) {
    if (item?.id) {
      let additional = {
        id: item.id,
        quantity: quantity,
        unitPurchasePrice: unitPurchasePrice,
        unitSalePrice: unitSalePrice,
      };

      data = { ...data, ...additional };

      switch (step) {
        case 0 || undefined:
          updateItemOnList(data);
          break;
        case 1:
          updateInquiryItemOnList(data);
          break;
        case 2:
          updatePurchaseItemOnList(data);
          break;
        default:
          break;
      }
    } else {
      create(data);
    }
  }

  async function create(data) {
    createItem(data)
      .then(() => {
        onClose();
        reloadList();
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

  async function updateInquiryItemOnList(data) {
    await updateInquiryItem(data)
      .then(() => {
        handleMessageBox("success", true, "Item atualizado");
        onClose();
        reloadList();
      })
      .catch(() => {
        handleMessageBox("faile", true, "Não foi possível atualizar o item");
      });
  }

  async function updatePurchaseItemOnList(data) {
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

  function handleMessageBox(color, display, message) {
    dispatch(displayMessageBox({ color, display, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  function closeModal(e) {
    const elementId = e.target.id === "overlay";
    if (elementId) onClose();
  }

  return (
    <>
      {open && (
        <div className="overlay" id="overlay" onClick={(e) => closeModal(e)}>
          <div className="dialog">
            <h1 className="font-medium font-lg">
              {item?.id ? "Informações do" : "Adicionar"} item
            </h1>
            <form onSubmit={handleItem}>
              <div className="row align-item-center gap-4 mt-4">
                <div className="column gap-2 text-dark-3 font-medium font-sm">
                  <label htmlFor="item_description">Descrição</label>
                  <input
                    type={"text"}
                    name="item_description"
                    id="item_description"
                    defaultValue={description}
                    disabled={step > 0}
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
                    defaultValue={brand}
                    disabled={step > 0}
                    className="border-default pa-2 border-radius-soft font-medium font-md"
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    {brandList.length > 0 ? (
                      <>
                        <option>Escolher marca do item</option>
                        {brandList.map((brand, index) => (
                          <option value={brand.description} key={index}>
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
                    defaultValue={type}
                    disabled={step > 0}
                    className="border-default pa-2 border-radius-soft font-medium font-md"
                    onChange={(e) => setType(e.target.value)}
                  >
                    {typeList.length > 0 ? (
                      <>
                        <option>Escolher tipo do item</option>
                        {typeList.map((type, index) => (
                          <option value={type.description} key={index}>
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
                    defaultValue={encap}
                    disabled={step > 0}
                    className="border-default pa-2 border-radius-soft font-medium font-md"
                    onChange={(e) => setEncap(e.target.value)}
                  >
                    {encapList.length > 0 ? (
                      <>
                        <option>Escolher encapsulamento do item</option>
                        {encapList.map((encap, index) => (
                          <option value={encap.description} key={index}>
                            {encap.description}
                          </option>
                        ))}
                      </>
                    ) : null}
                  </select>
                </div>
              </div>

              {step >= 1 ? (
                <div className="row align-items-center gap-4 mt-8">
                  <div className="column gap-2 text-dark-3 font-medium font-sm">
                    <label htmlFor="item_quantity">Quantidade</label>
                    <input
                      type={"text"}
                      name="item_quantity"
                      id="item_quantity"
                      defaultValue={quantity}
                      placeholder="Quantidade"
                      className="border-default pa-2 border-radius-soft font-medium font-md"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  {userSession.isAdmin && (
                    <div className="column gap-2 text-dark-3 font-medium font-sm">
                      <label htmlFor="item_unit_sale_price">
                        Preço de compra unitário
                      </label>
                      <input
                        type={"text"}
                        name="item_unit_sale_price"
                        id="item_unit_sale_price"
                        defaultValue={unitSalePrice}
                        placeholder="Preço de compra unitário"
                        className="border-default pa-2 border-radius-soft font-medium font-md"
                        onChange={(e) => setUnitSalePrice(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="column gap-2 text-dark-3 font-medium font-sm">
                    <label htmlFor="item_unit_purchase_price">
                      Preço de venda unitário
                    </label>
                    <input
                      type={"text"}
                      name="item_unit_purchase_price"
                      id="item_unit_purchase_price"
                      defaultValue={unitPurchasePrice}
                      placeholder="Preço de venda unitário"
                      className="border-default pa-2 border-radius-soft font-medium font-md"
                      onChange={(e) => setUnitPurchasePrice(e.target.value)}
                    />
                  </div>
                </div>
              ) : null}

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

              <div className="row justify-content-between align-items-center">
                <button
                  type={"submit"}
                  className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
                >
                  {item?.id ? "Atualizar" : "Concluir"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
