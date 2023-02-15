import API_URL from "./_config";

const END_POINT = "supplier";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function createSupplier(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function readSuppliers() {
  return await fetch(`${API_END_POINT}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
}

export async function readSuppliersSimple() {
  return await fetch(`${API_END_POINT}/simple`, {
    method: "GET",
  });
}

export async function updateSupplier(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteSupplier(data) {
  return await fetch(`${API_END_POINT}`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
