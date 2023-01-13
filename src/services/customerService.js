import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/customer`;

export async function createCustomer(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readCustomers() {
  return await fetch(`${API_URL}`, {
    method: "GET",
  });
}

export async function readCustomerById(data) {
  const { idCustomer } = data;
  return await fetch(`${API_URL}/single/${idCustomer}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function readCustomerToItem() {
  return await fetch(`${API_URL}/readCustomerToItem`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function updateCustomer(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteCustomer(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
