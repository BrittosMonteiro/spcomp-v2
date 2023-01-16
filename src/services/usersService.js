import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/users`;

export async function createUser(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readUsers() {
  return await fetch(`${API_URL}`, {
    method: "GET",
  });
}

export async function readUserById(data) {
  return await fetch(`${API_URL}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateUser(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
