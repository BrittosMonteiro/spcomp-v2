import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/encap`;

export async function createEncap(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readEncap() {
  return await fetch(`${API_URL}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function updateEncap(data) {
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
