import API_URL from "./_config";

const END_POINT = "importsHistory";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createImportHistory(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readImportHistory() {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
  });
}

export async function updateImportHistory(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteImportHistory(id) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(id),
  });
}
