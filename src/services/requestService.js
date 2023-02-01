import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/order`;

export async function createRequestItem(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateRequestItem(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readRequest() {
  return await fetch(`${API_URL}`, {
    method: "GET",
  });
}

export async function readRequestBySupplier(idSupplier) {
  return await fetch(`${API_URL}/bySupplier/${idSupplier}`, {
    method: "GET",
  });
}
