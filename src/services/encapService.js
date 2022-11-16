const API_URL = "http://localhost:3001/encap";

export async function postEncap(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getEncapList() {
  return await fetch(`${API_URL}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function putEncap(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteEncap(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
