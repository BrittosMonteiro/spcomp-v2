import { Check } from "phosphor-react";

export default function InquiryListItemRow({ item }) {
  function updateInquiryListItemPurchasePrice(item) {
    console.log(item);
  }
  return (
    <tr>
      <td>{item.inquiryHistory.title}</td>
      <td>{item.price.name}</td>
      <td>{item.quantity}</td>
      <td>{item.description}</td>
      <td>{item.type}</td>
      <td>{item.encap}</td>
      <td>{item.brand}</td>
      <td>{item.price.unitPurchasePrice}</td>
      <td>Lead time</td>
      <td>Data code</td>
      <td>Condição</td>
      <td>
        <div className="row">
          <div className="row mx-auto">
            {item.price.unitPurchasePrice ? (
              <button
                type="button"
                className="row bg-green-1 text-white-1 pa-1 border-radius-soft"
                onClick={() => updateInquiryListItemPurchasePrice(item)}
                title="Escolher preço"
              >
                <Check className="icon-sm" />
              </button>
            ) : (
              "Pendente"
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}
