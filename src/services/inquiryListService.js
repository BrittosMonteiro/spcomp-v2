import API_URL from "./_config";

const END_POINT = "inquiryList";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createInquiryList(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readInquiryList(data) {
  const { idInquiryHistory } = data;
  return await fetch(`${API_END_POINT}/${idInquiryHistory}`);
}

export async function readInquiryListByCompany(data) {
  const { idInquiryHistory, idSupplier } = data;
  return await fetch(
    `${API_END_POINT}/listByCompany/${idInquiryHistory}/${idSupplier}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }
  );
}

export async function readSingleItemFromInquiryList(data) {
  const { idInquiryItem } = data;
  return await fetch(`${API_END_POINT}/single/${idInquiryItem}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function inquiryListDownload(data) {
  return await fetch(`${API_END_POINT}/inquiryListDownload`, {
    method: "POST",
    headers: { "Content-type": "application/json", "response-type": "bloob" },
    body: JSON.stringify(data),
  });
}

export async function updateInquiryList(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteInquiryList(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
