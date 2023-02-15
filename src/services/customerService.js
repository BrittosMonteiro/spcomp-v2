import API_URL from "./_config";

const END_POINT = "customer";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createCustomer(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readCustomers() {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
  });
}

export async function readCustomerById(data) {
  const { idCustomer } = data;
  return await fetch(`${API_END_POINT}/single/${idCustomer}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function readCustomerToItem() {
  return await fetch(`${API_END_POINT}/readCustomerToItem`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function updateCustomer(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteCustomer(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
