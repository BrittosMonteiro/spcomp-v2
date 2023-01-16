import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/inquiryList`;

export async function createInquiryList(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readInquiryList(data) {
  const { idInquiryHistory } = data;
  return await fetch(`${API_URL}/${idInquiryHistory}`);
}

export async function readInquiryListByCompany(data) {
  const { idInquiryHistory, idSupplier } = data;
  return await fetch(
    `${API_URL}/listByCompany/${idInquiryHistory}/${idSupplier}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }
  );
}

export async function readSingleItemFromInquiryList(data) {
  const { idInquiryItem } = data;
  return await fetch(`${API_URL}/single/${idInquiryItem}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function inquiryListDownload(data) {
  return await fetch(`${API_URL}/inquiryListDownload`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateInquiryList(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteInquiryList(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
