import API_URL from "./_config";

const END_POINT = "inquiryItem";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createInquiryItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readInquiryItems() {
  return await fetch(`${API_END_POINT}`);
}

export async function readInquiryItemsAdmin() {
  return await fetch(`${API_END_POINT}/admin`);
}

export async function readInquiryItemQtyByUser(data) {
  const { idUser } = data;
  return await fetch(`${API_END_POINT}/qtyByUser/${idUser}`);
}

export async function updateInquiryItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateInquiryItemPrice(data) {
  return await fetch(`${API_END_POINT}/updateInquiryItemPrice`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateInquiryItemStep(data) {
  return await fetch(`${API_END_POINT}/updateStep`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteInquiryItem(data) {
  return fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
