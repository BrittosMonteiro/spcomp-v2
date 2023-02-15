import API_URL from "./_config";

const END_POINT = "orderList";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createOrderListItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readOrderList(idOrder) {
  return await fetch(`${API_END_POINT}/order/${idOrder}`, {
    method: "GET",
  });
}

export async function readOrder() {
  return await fetch(`${API_END_POINT}/orders`);
}

export async function readOrderListBySupplier(idSupplier) {
  return await fetch(`${API_END_POINT}/bySupplier/${idSupplier}`, {
    method: "GET",
  });
}

export async function readOrderListByUser(idUser) {
  return await fetch(`${API_END_POINT}/byUser/${idUser}`, {
    method: "GET",
  });
}

export async function readOrderByImportHistory(idImportHistory) {
  return await fetch(`${API_END_POINT}/byImportHistory/${idImportHistory}`, {
    method: "GET",
  });
}

export async function readOrderNotAttached() {
  return await fetch(`${API_END_POINT}/notAttached`, {
    method: "GET",
  });
}

export async function readOrderListByStock() {
  return await fetch(`${API_END_POINT}/stock`, {
    method: "GET",
  });
}

export async function updateOrderStatus(data) {
  return await fetch(`${API_END_POINT}/updateStatus`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateOrderAddItems(data) {
  return await fetch(`${API_END_POINT}/updateOrderAddItems`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateOrderImportHistoryId(data) {
  return await fetch(`${API_END_POINT}/updateOrderImportHistoryId`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteOrderListItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
