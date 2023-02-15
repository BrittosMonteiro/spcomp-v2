import API_URL from "./_config";

const END_POINT = "item";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createItem(data) {
  return await fetch(`${API_END_POINT}/`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readItems() {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
  });
}

export async function updateItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
