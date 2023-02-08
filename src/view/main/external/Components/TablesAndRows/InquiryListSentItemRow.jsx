import { Check, Copy } from "phosphor-react";
import { useState } from "react";
import {
  updateInquiryItemPrice,
  updateInquiryItemStep,
} from "../../../../../services/inquiryItemService";
import { updateInquiryList } from "../../../../../services/inquiryListService";
import { getCurrencyValue } from "../../../../../utils/currencyApi";
import { useDispatch } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../../../../store/actions/messageBoxAction";

export default function InquiryListSentItemsTableRow({
  item,
  price,
  reloadList,
  userSession,
}) {
  const dispatch = useDispatch();
  const [unitPurchasePrice, setUnitPurchasePrice] = useState(
    price.unitPurchasePrice
  );
  const [leadtime, setLeadtime] = useState(price.leadtime);
  const [datacode, setDatacode] = useState(price.datacode);
  const [condition, setCondition] = useState(price.condition);

  async function setPurchasePriceToItem() {
    const data = {
      idInquiryList: item.idInquiryList,
      price: {
        idSupplier: price.idSupplier,
        unitPurchasePrice: unitPurchasePrice,
        leadtime: leadtime,
        datacode: datacode,
        condition: condition,
      },
    };
    await updateInquiryList(data)
      .then((responseUpdate) => {
        if (responseUpdate) {
          reloadList();
        }
      })
      .catch(() => {});
  }

  async function setPurchasePriceToInquiryItem() {
    const { dolar } = await getCurrencyValue();

    const unitSalePrice = unitPurchasePrice * dolar;

    const data = {
      idInquiryItem: item.idInquiryItem,
      data: {
        unitPurchasePrice: unitPurchasePrice,
        unitSalePrice: unitSalePrice,
        idSupplier: price.idSupplier,
        leadtime: leadtime,
        datacode: datacode,
        condition: condition,
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
    <>
      <tr>
        <td>{price.name}</td>
        <td>{item.quantity}</td>
        <td>
          <div className="row">
            <div className="row gap-2">
              <button
                type="button"
                className="bg-transparent"
                onClick={() => copyText(item.description)}
              >
                <Copy className="icon-default" />
              </button>
              <span>{item.description}</span>
            </div>
          </div>
        </td>
        <td>{item.type}</td>
        <td>{item.encap}</td>
        <td>{item.brand}</td>
        <td>
          <input
            type={"text"}
            placeholder="Unit price"
            className="font-sm bg-transparent"
            style={{ maxWidth: "100px", margin: "0" }}
            defaultValue={unitPurchasePrice}
            onChange={(e) => setUnitPurchasePrice(e.target.value)}
            disabled={userSession.role !== 4}
          />
        </td>
        <td>
          <input
            type={"text"}
            placeholder="Lead time"
            className="font-sm bg-transparent"
            style={{ maxWidth: "100px", margin: "0" }}
            defaultValue={leadtime}
            onChange={(e) => setLeadtime(e.target.value)}
            disabled={userSession.role !== 4}
          />
        </td>
        <td>
          <input
            type={"text"}
            placeholder="Data code"
            className="font-sm bg-transparent"
            style={{ maxWidth: "100px", margin: "0" }}
            defaultValue={datacode}
            onChange={(e) => setDatacode(e.target.value)}
            disabled={userSession.role !== 4}
          />
        </td>
        <td>
          <input
            type={"text"}
            placeholder="Condition"
            className="font-sm bg-transparent"
            style={{ maxWidth: "100px", margin: "0" }}
            defaultValue={condition}
            onChange={(e) => setCondition(e.target.value)}
            disabled={userSession.role !== 4}
          />
        </td>
        <td>
          <div className="row">
            {userSession.role === 4 ? (
              <button
                type="button"
                className="row bg-green-1 text-white-1 pa-1 border-radius-soft"
                title="Confirm information"
                onClick={() => setPurchasePriceToItem()}
              >
                <Check className="icon-sm" />
              </button>
            ) : item.step > 3 ? (
              "Concluído"
            ) : userSession.isAdmin && price.unitPurchasePrice ? (
              <button
                type="button"
                className="row bg-green-1 text-white-1 pa-1 border-radius-soft"
                title="Escolher preço"
                onClick={() => setPurchasePriceToInquiryItem()}
              >
                <Check className="icon-sm" />
              </button>
            ) : userSession.isAdmin ? (
              "pendente"
            ) : null}
          </div>
        </td>
      </tr>
    </>
  );
}
