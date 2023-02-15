import { Check, Copy } from "phosphor-react";
import { useDispatch } from "react-redux";

import {
  updateInquiryItemPrice,
  updateInquiryItemStep,
} from "../../../../../../services/inquiryItemService";
// import { getCurrencyValue } from "../../../../../../utils/currencyApi";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../../store/actions/messageBoxAction";

export default function InquiryListItemRow({ item }) {
  const dispatch = useDispatch();

  async function updateInquiryListItemPurchasePrice(item) {
    // const { dolar } = await getCurrencyValue();

    const unitSalePrice = item.price.unitPurchasePrice * 2.2;

    const data = {
      idInquiryItem: item.idInquiryItem,
      data: {
        unitPurchasePrice: item.price.unitPurchasePrice,
        unitSalePrice: unitSalePrice,
        idSupplier: item.price.idSupplier,
        leadtime: item.price.leadtime,
        datacode: item.price.datacode,
        condition: item.price.condition,
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

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 2500);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    handleMessageBox("success", "Text copied to clipboard");
  }

  return (
    <tr>
      <td>{item.inquiryHistory.title}</td>
      <td>{item.price.name}</td>
      <td>{item.quantity}</td>
      <td>
        {" "}
        <div className="row gap-2">
          <button
            type="button"
            className="bg-transparent"
            onClick={() => copyText(item.description)}
          >
            <Copy className="icon-sm" />
          </button>
          {item.description}
        </div>
      </td>
      <td>{item.type}</td>
      <td>{item.encap}</td>
      <td>{item.brand}</td>
      <td>{item.price.unitPurchasePrice}</td>
      <td>{item.price.leadtime}</td>
      <td>{item.price.datacode}</td>
      <td>{item.price.condition}</td>
      <td>
        <div className="row">
          {item.price.unitPurchasePrice && item.step >= 2 && item.step <= 3 ? (
            <button
              type="button"
              className="row bg-green-1 text-white-1 pa-1 border-radius-soft"
              onClick={() => updateInquiryListItemPurchasePrice(item)}
              title="Escolher preço"
            >
              <Check className="icon-sm" />
            </button>
          ) : (
            "-"
          )}
        </div>
      </td>
    </tr>
  );
}
