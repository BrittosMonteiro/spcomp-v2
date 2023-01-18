import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readBrands } from "../../services/brandService";
import { readEncap } from "../../services/encapService";
import { readType } from "../../services/typeService";
import { updateInquiryItem } from "../../services/inquiryItemService";
import { createItem, updateItem } from "../../services/itemService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";

export default function DialogItemDefault({
  item,
  open,
  onClose,
  reloadList,
  idUser,
  customers,
}) {
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
  const [idCustomer, setIdCustomer] = useState("");
  const [nameCustomer, setNameCustomer] = useState("");

  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setBrand(item.brand.id);
      setType(item.type.id);
      setEncap(item.encap.id);
      setIpi(item.ipi);
      setWeight(item.weight);
      setNote(item.note);
      setQuantity(item.quantity);
      setUnitSalePrice(item.unitSalePrice);
      setUnitPurchasePrice(item.unitPurchasePrice);
      setIdCustomer(item.customer.id);
    }
  }, [item]);

  useEffect(() => {
    readBrands()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          handleMessageBox("failed", true, "As marcas não foram carregadas 1");
        }
      })
      .then((res) => setBrandList(res.data))
      .catch(() => {
        handleMessageBox("failed", true, "As marcas não foram carregadas 2");
      });

    readType()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          handleMessageBox("failed", true, "Os tipos não foram carregados");
        }
      })
      .then((res) => setTypeList(res.data))
      .catch(() =>
        handleMessageBox("failed", true, "Os tipos não foram carregados")
      );

    readEncap()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          handleMessageBox(
            "failed",
            true,
            "Os encapsulamentos não foram carregados 2"
          );
        }
      })
      .then((res) => setEncapList(res.data))
      .catch(() =>
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
        idCustomer: idCustomer,
        nameCustomer: nameCustomer,
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

  function clearFields() {
    setDescription("");
    setBrand("");
    setType("");
    setEncap("");
    setIpi("");
    setWeight("");
    setNote("");
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
                <>
                  <div className="row align-items-center mt-8">
                    <div className="column gap-2 text-dark-3 font-medium font-sm">
                      <label htmlFor="item_customer">Atrelar cliente</label>
                      <select
                        name="item_customer"
                        id="item_customer"
                        defaultValue={idCustomer}
                        className="border-default pa-2 border-radius-soft font-medium font-md"
                        onChange={(e) => {
                          setIdCustomer(e.target.value);
                        }}
                        disabled={
                          idUser !== item.idUser && !userSession.isAdmin
                        }
                      >
                        {customers.length > 0 ? (
                          <>
                            {!idCustomer || !nameCustomer ? (
                              <option>Escolher cliente</option>
                            ) : null}
                            {customers.map((customer) => (
                              <option value={customer.id} key={customer.id}>
                                {customer.name}
                              </option>
                            ))}
                          </>
                        ) : null}
                      </select>
                    </div>
                  </div>
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
                        disabled={
                          idUser !== item.idUser && !userSession.isAdmin
                        }
                      />
                    </div>

                    {userSession.isAdmin && (
                      <div className="column gap-2 text-dark-3 font-medium font-sm">
                        <label htmlFor="item_unit_sale_price">
                          Preço de compra unitário
                        </label>
                        <div className="row border-default pa-2 gap-2 border-radius-soft">
                          <span className="font-medium font-md">USD</span>
                          <input
                            type={"text"}
                            name="item_unit_sale_price"
                            id="item_unit_sale_price"
                            defaultValue={unitPurchasePrice}
                            className="font-medium font-md"
                            placeholder="Preço de compra unitário"
                            onChange={(e) => setUnitSalePrice(e.target.value)}
                            disabled={true}
                          />
                        </div>
                      </div>
                    )}
                    <div className="column gap-2 text-dark-3 font-medium font-sm">
                      <label htmlFor="item_unit_purchase_price">
                        Preço de venda unitário
                      </label>
                      <div className="row border-default pa-2 gap-2 border-radius-soft">
                        <span className="font-medium font-md">R$</span>
                        <input
                          type={"text"}
                          name="item_unit_purchase_price"
                          id="item_unit_purchase_price"
                          defaultValue={unitSalePrice}
                          className="font-medium font-md"
                          placeholder="Preço de venda unitário"
                          onChange={(e) => setUnitPurchasePrice(e.target.value)}
                          disabled={
                            idUser !== item?.idUser && !userSession.isAdmin
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
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
                    disabled={
                      item?.idUser &&
                      item?.idUser !== idUser &&
                      !userSession.isAdmin
                    }
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
                    disabled={
                      item?.idUser &&
                      item?.idUser !== idUser &&
                      !userSession.isAdmin
                    }
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
                  disabled={
                    item?.idUser &&
                    item?.idUser !== idUser &&
                    !userSession.isAdmin
                  }
                ></textarea>
              </div>

              <hr className="my-4" />

              <div className="row justify-content-between align-items-center">
                <button
                  type="button"
                  className="font-medium font-md bg-red-1 pa-2 text-white-1 border-radius-soft"
                  onClick={() => onClose()}
                >
                  Fechar
                </button>
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
