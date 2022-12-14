const API_URL = "http://localhost:3001/customer";

export async function createCustomer(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getCustomersList(data) {
  return await fetch(`${API_URL}`, {
    method: "GET",
  });
}

export async function getCustomerById(data) {
  return await fetch(`${API_URL}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateCustomer(data) {
  return await fetch(`${API_URL}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function removeCustomer(data) {
  return await fetch(`${API_URL}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
