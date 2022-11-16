const API_URL = "http://localhost:3001/type";

export async function postType(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getTypeList() {
  return await fetch(`${API_URL}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function putType(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteType(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
