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
  return await fetch(`${API_URL}/${data.idInquiryHistory}`);
}

export async function readInquiryListByCompany(data) {
  return await fetch(
    `${API_URL}/listByCompany/${data.idInquiryHistory}/${data.idSupplier}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }
  );
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
