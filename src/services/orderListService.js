import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/orderList`;

export async function createOrderListItem(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readOrderList(idOrder) {
  return await fetch(`${API_URL}/order/${idOrder}`, {
    method: "GET",
  });
}

export async function readOrder() {
  return await fetch(`${API_URL}/orders`);
}

export async function readOrderListBySupplier(idSupplier) {
  return await fetch(`${API_URL}/bySupplier/${idSupplier}`, {
    method: "GET",
  });
}

export async function readOrderListByUser(idUser) {
  return await fetch(`${API_URL}/byUser/${idUser}`, {
    method: "GET",
  });
}

export async function readOrderListByStock() {
  return await fetch(`${API_URL}/stock`, {
    method: "GET",
  });
}

export async function updateOrderStatus(data) {
  return await fetch(`${API_URL}/updateStatus`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteOrderListItem(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
