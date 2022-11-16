const API_URL = "http://localhost:3001/item";

export async function createItem(data) {
  return await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getAllItems() {
  return await fetch(`${API_URL}`, {
    method: "GET",
  });
}

export async function updateItem(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteItem(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
