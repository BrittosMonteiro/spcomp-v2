const API_URL = "http://localhost:3001/purchase";

export async function addItemToPurchaseList(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getPurchaseList() {
  return await fetch(`${API_URL}`, {
    method: "GET",
  });
}

export async function deleteItemFromPurchaseList(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
