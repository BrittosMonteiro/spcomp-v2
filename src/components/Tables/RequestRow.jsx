export default function RequestRow({ request }) {
  return (
    <tr>
      <td>{request.supplier.name}</td>
      <td>{request.item.quantity}</td>
      <td>{request.item.description}</td>
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
