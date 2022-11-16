const API_URL = "http://localhost:3001/inquiry";

export async function addItemToInquiryList(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getAllItemsFromInquiryList() {
  return await fetch(`${API_URL}`);
}

export async function updateItemInInquiryList(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateItemStatus(data) {
  console.log(data);
}

export async function deleteItemFromInquiryList(data) {
  return fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteAllItemsFromInquiryList(data) {
  console.log(data);
}
