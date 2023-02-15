import API_URL from "./_config";

const END_POINT = "login";
const API_END_POINT = `${API_URL}/${END_POINT}`;

export async function loginApp(data) {
  return await fetch(`${API_END_POINT}/loginUser`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function loginSupplier(data) {
  return await fetch(`${API_END_POINT}/loginSupplier`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
