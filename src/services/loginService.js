import { checkEnv } from "./serviceConfig";

const BASE_URL = checkEnv();
const API_URL = `${BASE_URL}/user`;

export async function login(data) {
  return await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
