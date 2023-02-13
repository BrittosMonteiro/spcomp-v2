import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { readBrands } from "../../services/brandService";
import { readEncap } from "../../services/encapService";
import { readType } from "../../services/typeService";
import { updateInquiryItem } from "../../services/inquiryItemService";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { readCustomerToItem } from "../../services/customerService";
import DialogDefault from "./DialogDefault";
import { XCircle } from "phosphor-react";

export default function DialogInquiry({
  item,
  open,
  onClose,
  reloadList,
  userSession,
}) {
  const dispatch = useDispatch();

  const [brandList, setBrandList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [encapList, setEncapList] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [idInquiryItem, setIdInquiryItem] = useState("");
  const [description, setDescription] = useState("");
  const [idBrand, setIdBrand] = useState("");
  const [idEncap, setIdEncap] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [idType, setIdType] = useState("");
  const [ipi, setIpi] = useState("");
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState("");
  const [salePrice, setSalePrice] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);

  async function loadCustomers() {
    await readCustomerToItem()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (item) {
      setIdInquiryItem(item.idInquiryItem);
      setDescription(item.item.description);
      setIdBrand(item.item.brand.id);
      setIdType(item.item.type.id);
      setIdEncap(item.item.encap.id);
      setIpi(item.item.ipi);
      setWeight(item.item.weight);
      setNote(item.item.note);
      setIdCustomer(item.customer.id);
      setQuantity(item.item.quantity);
      setSalePrice(item.item.unitSalePrice);
      setPurchasePrice(item.item.unitPurchasePrice);
    }
  }, [item]);

  useEffect(() => {
    loadBrands();
    loadEncaps();
    loadTypes();
    loadCustomers();
  }, []);

  function handleItem(e) {
    e.preventDefault();

    if (!description || !idBrand || !idType || !idEncap) {
      handleMessageBox("failed", true, "Preencha o formulário");
      return;
    }

    let data = {
      idInquiryItem,
      data: {
        quantity,
        salePrice,
        ipi,
        weight,
        note,
        step: idCustomer && quantity ? 1 : 0,
      },
    };

    if (idCustomer) {
      data.data.idCustomer = idCustomer;
    }

    updateItemOnList(data);
  }

  async function loadBrands() {
    await readBrands()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => setBrandList(res.data))
      .catch(() => {});
  }

  async function loadEncaps() {
    await readEncap()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => setEncapList(res.data))
      .catch(() => {});
  }

  async function loadTypes() {
    await readType()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((res) => setTypeList(res.data))
      .catch(() => {});
  }

  async function updateItemOnList(data) {
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
          <h1 className="font-medium font-lg">Informações do item</h1>
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
              <label htmlFor="item_customer">Atrelar cliente</label>
              <select
                name="item_customer"
                id="item_customer"
                defaultValue={idCustomer}
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setIdCustomer(e.target.value)}
                disabled={
                  (!userSession.isAdmin &&
                    userSession.token !== item.user.id) ||
                  (item.item.step >= 2 &&
                    item.item.step !== 9 &&
                    item.item.step !== 10 &&
                    item.item.step !== 11)
                }
              >
                {customers.length > 0 ? (
                  <>
                    <option>Escolher cliente</option>
                    {customers.map((customer, index) => (
                      <option value={customer.id} key={index}>
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
                  (!userSession.isAdmin &&
                    userSession.token !== item.user.id) ||
                  (item.item.step >= 2 &&
                    item.item.step !== 9 &&
                    item.item.step !== 10 &&
                    item.item.step !== 11)
                }
              />
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm">
              <label htmlFor="item_sale_price">Preço de venda</label>
              <input
                type={"text"}
                name="item_sale_price"
                id="item_sale_price"
                defaultValue={salePrice}
                placeholder="Preço de venda"
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setSalePrice(e.target.value)}
                disabled={
                  (!userSession.isAdmin &&
                    userSession.token !== item.user.id) ||
                  (item.item.step >= 2 &&
                    item.item.step !== 9 &&
                    item.item.step !== 10 &&
                    item.item.step !== 11)
                }
              />
            </div>

            {userSession.isAdmin && (
              <div className="column gap-2 text-dark-3 font-medium font-sm">
                <label htmlFor="item_purchase_price">Preço de compra</label>
                <input
                  type={"text"}
                  name="item_purchase_price"
                  id="item_purchase_price"
                  defaultValue={purchasePrice}
                  placeholder="Preço de compra"
                  className="border-default pa-2 border-radius-soft font-medium font-md"
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  disabled
                />
              </div>
            )}
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
                disabled={
                  (!userSession.isAdmin &&
                    userSession.token !== item.user.id) ||
                  (item.item.step >= 2 &&
                    item.item.step !== 9 &&
                    item.item.step !== 10 &&
                    item.item.step !== 11)
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
                  (!userSession.isAdmin &&
                    userSession.token !== item.user.id) ||
                  (item.item.step >= 2 &&
                    item.item.step !== 9 &&
                    item.item.step !== 10 &&
                    item.item.step !== 11)
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
                (!userSession.isAdmin && userSession.token !== item.user.id) ||
                (item.item.step >= 2 &&
                  item.item.step !== 9 &&
                  item.item.step !== 10 &&
                  item.item.step !== 11)
              }
            ></textarea>
          </div>

          <hr className="my-4" />

          <div className="row jc-between ai-center">
            {(item.item.step <= 1 ||
              item.item.step === 9 ||
              item.item.step === 10 ||
              item.item.step === 11) && (
              <button
                type={"submit"}
                className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
              >
                Atualizar
              </button>
            )}
          </div>
        </form>
      </DialogDefault>
    </>
  );
}
