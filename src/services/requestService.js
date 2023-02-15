import API_URL from "./_config";

const END_POINT = "order";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createRequestItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateRequestItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readRequest() {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
  });
}

export async function readRequestBySupplier(idSupplier) {
  return await fetch(`${API_END_POINT}/bySupplier/${idSupplier}`, {
    method: "GET",
  });
}
