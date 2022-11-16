import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { getBrandList } from "../../services/brandService";
import { getEncapList } from "../../services/encapService";
import { updateItemInInquiryList } from "../../services/inquiryService";
import { createItem, updateItem } from "../../services/itemService";
import { getTypeList } from "../../services/typeService";

export default function DialogItem(props) {
  const [brandList, setBrandList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [encapList, setEncapList] = useState([]);

  const [id, setId] = useState("");
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
    if (props.itemData) {
      setId(props.itemData.id);
      setDescription(props.itemData.description);
      setBrand(props.itemData.brand);
      setType(props.itemData.type);
      setEncap(props.itemData.encap);
      setIpi(props.itemData.ipi);
      setWeight(props.itemData.weight);
      setNote(props.itemData.note);
      setStep(props.itemData.step);
      setStatus(props.itemData.status);
      setQuantity(props.itemData.quantity);
      setUnitSalePrice(props.itemData.unitSalePrice);
      setUnitPurchasePrice(props.itemData.unitPurchasePrice);
    }
  }, [props.itemData]);

  useEffect(() => {
    getBrandList()
      .then((res) => res.json())
      .then((res) => setBrandList(res))
      .catch((err) => console.log(err));

    getTypeList()
      .then((res) => res.json())
      .then((res) => setTypeList(res))
      .catch((err) => console.log(err));

    getEncapList()
      .then((res) => res.json())
      .then((res) => setEncapList(res))
      .catch((err) => console.log(err));
  }, []);

  function handleItem(e) {
    e.preventDefault();

    if (!description || !brand || !type || !encap || !ipi || !weight || !note) {
      console.log("Preencha o formulário");
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
    };

    if (id) {
      let additional = {
        id: id,
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
      createItem(data)
        .then(() => {
          props.reloadList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async function updateItemOnList(data) {
    await updateItem(data)
      .then(() => {
        props.reloadList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updateInquiryItemOnList(data) {
    await updateItemInInquiryList(data)
      .then(() => {
        props.reloadList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function updatePurchaseItemOnList(data) {
    await updateItem(data)
      .then(() => {
        props.reloadList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay">
          <Dialog.Content className="dialog">
            <Dialog.Title className="font-medium font-lg">
              {id ? "Informações do" : "Adicionar"} item
            </Dialog.Title>
            <hr className="mt-4" />
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
                        {brandList.map((brand) => (
                          <option value={brand.description} key={brand.id}>
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
                        {typeList.map((type) => (
                          <option value={type.description} key={type.id}>
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
                        {encapList.map((encap) => (
                          <option value={encap.description} key={encap.id}>
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
                <Dialog.Close className="font-medium font-md text-red-1 bg-transparent">
                  Fechar
                </Dialog.Close>
                <button
                  type={"submit"}
                  className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
                >
                  {id ? "Atualizar" : "Concluir"}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </>
  );
}
