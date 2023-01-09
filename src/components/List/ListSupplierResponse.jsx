import { Copy } from "phosphor-react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { updateInquiryList } from "../../services/inquiryService.js";

export default function ListSupplierResponse({ inquiryId, supplierId, item }) {
  const dispatch = useDispatch();
  const [unitPrice, setUnitPrice] = useState("");

  useEffect(() => {
    setUnitPrice(item.unitPrice);
  }, [item]);

  function updateItemPrice(e) {
    e.preventDefault();

    const updatePrice = {
      inquiryId,
      supplierId,
      idItem: item.idItem,
      unitPrice,
    };

    updateInquiryList(updatePrice)
      .then(() => {
        handleMessageBox("success", "Price updated");
      })
      .catch((err) => {
        console.log(err);
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
          className="font-medium font-md"
          style={{ maxWidth: "100px" }}
          defaultValue={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-1 text-white-1 pa-2"
          style={{ overflow: "hidden" }}
        >
          Set price
        </button>
      </form>
    </li>
  );
}