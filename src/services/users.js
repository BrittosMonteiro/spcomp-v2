const API_URL = "http://localhost:3001/users";

export async function createUser(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getUsersList() {
  return await fetch(`${API_URL}`, {
    method: "GET",
  });
}

export async function getUserById(data) {
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

export async function removeUser(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
