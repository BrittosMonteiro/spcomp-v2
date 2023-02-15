import API_URL from "./_config";

const END_POINT = "stock";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createStockItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readStockList() {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
  });
}

export async function updateStockItem(data) {
  console.log("PUT");
}

export async function deleteStockItem(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
