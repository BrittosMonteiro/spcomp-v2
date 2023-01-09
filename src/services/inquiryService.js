import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/inquiry`;

export async function addItemToInquiryList(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getAllItemsFromInquiryList() {
  return await fetch(`${API_URL}`);
}

export async function updateItemInInquiryList(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateItemStatus(data) {
  console.log(data);
}

export async function deleteItemFromInquiryList(data) {
  return fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteAllItemsFromInquiryList(data) {
  console.log(data);
}

export async function setInquiryList(data) {
  return await fetch(`${API_URL}/setInquiryList`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getInquiryListByCompany(token) {
  return await fetch(`${API_URL}/getInquiryListByCompany`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ idCompany: token }),
  });
}

export async function updateInquiryList(data) {
  return await fetch(`${API_URL}/updateInquiryList`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
