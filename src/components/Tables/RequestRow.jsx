import { Copy } from "phosphor-react";

export default function RequestRow({ request }) {
  function copyText(text) {
    navigator.clipboard.writeText(text);
    // handleMessageBox("success", "Text copied to clipboard");
  }
  return (
    <tr>
      <td>{request.supplier.name}</td>
      <td>{request.item.quantity}</td>
      <td>
        <div className="row gap-2">
          <button
            type="button"
            className="bg-transparent"
            onClick={() => copyText(request.item.description)}
          >
            <Copy className="icon-default" />
          </button>
          {request.item.description}
        </div>
      </td>
      <td>{request.item.type}</td>
      <td>{request.item.encap}</td>
      <td>{request.item.brand}</td>
      <td>{request.item.unitPurchasePrice}</td>
      <td>{request.item.unitSalePrice}</td>
      <td>{request.user.username}</td>
      <td>{request.customer.name}</td>
      <td>Ações</td>
    </tr>
  );
}
