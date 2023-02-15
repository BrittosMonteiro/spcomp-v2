import API_URL from "./_config";

const END_POINT = "users";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createUser(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readUsers() {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
  });
}

export async function readUserById(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateUser(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
