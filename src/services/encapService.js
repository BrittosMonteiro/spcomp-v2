import API_URL from "./_config";

const END_POINT = "encap";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createEncap(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readEncap() {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function updateEncap(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteEncap(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
