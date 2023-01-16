import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/login`;

export async function loginApp(data) {
  return await fetch(`${API_URL}/loginUser`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function loginSupplier(data) {
  return await fetch(`${API_URL}/loginSupplier`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
