const API_URL = "http://localhost:3001/stock";

export async function postStockItem(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getStockItemList() {
  return await fetch(`${API_URL}`, {
    method: "GET",
  });
}

export async function putStockItem(data) {
  console.log("PUT");
}

export async function deleteStockItem(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
