import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/inquiryItem`;

export async function createInquiryItem(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readInquiryItems() {
  return await fetch(`${API_URL}`);
}

export async function readInquiryItemQtyByUser(data) {
  const { idUser } = data;
  return await fetch(`${API_URL}/qtyByUser/${idUser}`);
}

export async function updateInquiryItem(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateInquiryItemPrice(data) {
  return await fetch(`${API_URL}/updateInquiryItemPrice`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateInquiryItemStep(data) {
  return await fetch(`${API_URL}/updateStep`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteInquiryItem(data) {
  return fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
