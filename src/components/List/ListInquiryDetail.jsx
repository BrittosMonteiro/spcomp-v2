import { Copy } from "phosphor-react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { updateInquiryList } from "../../services/inquiryListService.js";
import {
  updateInquiryItemPrice,
  updateInquiryItemStep,
} from "../../services/inquiryItemService";
import { getCurrencyValue } from "../../utils/currencyApi";

export default function ListInquiryDetail({
  item,
  idSupplier,
  btnChoosePrice,
  reloadInquiryListByCompany,
}) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [purchasePrice, setPurchasePrice] = useState(0);

  useEffect(() => {
    setPurchasePrice(item.unitPurchasePrice);
  }, [item]);

  function updateItemPrice(e) {
    e.preventDefault();

    const updatePrice = {
      idInquiryList: item.idInquiryList,
      purchasePrice: purchasePrice ? purchasePrice : 0,
    };

    updateInquiryList(updatePrice)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          handleMessageBox("failed", "Could not update the price");
        }
      })
      .then(() => {
        handleMessageBox("success", "Price updated");
        reloadInquiryListByCompany();
      })
      .catch(() => {
        handleMessageBox("failed", "Could not update the price");
      });
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", "Text copied to clipboard");
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 2500);
  }

  async function setInquiryItemPrice() {
    const { dolar } = await getCurrencyValue();

    const unitSalePrice = item.unitPurchasePrice * dolar;

    const data = {
      idInquiryItem: item.idInquiryItem,
      data: {
        unitPurchasePrice: item.unitPurchasePrice,
        unitSalePrice: unitSalePrice,
        idSupplier,
      },
    };

    await updateInquiryItemPrice(data)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          handleMessageBox("failed", "Não foi possível definir o preço");
        }
      })
      .then(() => {
        handleMessageBox("success", "Preço definido");
        updateItemStep(data.idInquiryItem);
      })
      .catch(() => {
        handleMessageBox("failed", "Não foi possível definir o preço");
      });
  }

  async function updateItemStep(item) {
    const data = {
      pending: item,
      step: 3,
    };
    await updateInquiryItemStep(data)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Preço definido");
      })
      .catch(() => {});
  }

  return (
    <li className="row justify-content-between align-items-end py-4 gap-2">
      <div className="row gap-4">
        <div className="column gap-1">
          <span className="font-light font-sm">Quantity</span>
          <span className="font-medium font-md">{item.quantity}</span>
        </div>
        <div className="column gap-1">
          <span className="font-light font-sm">Description</span>
          <div className="row gap-2">
            <span className="font-medium font-md">{item.description}</span>
            <button type="button" className="bg-transparent">
              <Copy
                alt="Copy item description"
                className="icon-default"
                onClick={() => copyText(item.description)}
              />
            </button>
          </div>
        </div>
        <div className="column gap-1">
          <span className="font-light font-sm">Type</span>
          <span className="font-medium font-md">{item.type}</span>
        </div>
        <div className="column gap-1">
          <span className="font-light font-sm">Encap</span>
          <span className="font-medium font-md">{item.encap}</span>
        </div>
        <div className="column gap-1">
          <span className="font-light font-sm">Brand</span>
          <span className="font-medium font-md">{item.brand}</span>
        </div>
      </div>
      <form
        onSubmit={updateItemPrice}
        className="row justify-content-between align-items-stretch gap-2 border-default border-radius-soft"
      >
        <div className="row font-medium font-sm align-items-center pa-2">
          USD
        </div>
        <input
          id="unitPrice"
          type={"text"}
          placeholder="Unit price"
          className={`font-medium font-md bg-transparent ${
            userSession.role !== 4 ? "text-grey-1" : "text-dark-3"
          }`}
          style={{ maxWidth: "100px" }}
          defaultValue={item.unitPurchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          disabled={userSession.role !== 4}
        />
        {userSession.role === 4 ? (
          <button
            type="submit"
            className="bg-green-1 text-white-1 pa-2"
            style={{ overflow: "hidden" }}
          >
            Set price
          </button>
        ) : null}
        {userSession.isAdmin && btnChoosePrice ? (
          <button
            type="button"
            className="bg-green-1 text-white-1 pa-2"
            style={{ overflow: "hidden" }}
            onClick={() => setInquiryItemPrice()}
          >
            Escolher
          </button>
        ) : null}
      </form>
    </li>
  );
}
