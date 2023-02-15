import API_URL from "./_config";

const END_POINT = "inquiryHistory";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createInquiryHistory(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readInquiryHistory() {
  return await fetch(`${API_END_POINT}`);
}

export async function readActiveInquiryHistory(idSupplier) {
  return await fetch(`${API_END_POINT}/active/${idSupplier}`);
}

export async function updateInquiryHistory(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteInquiryHistory(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
