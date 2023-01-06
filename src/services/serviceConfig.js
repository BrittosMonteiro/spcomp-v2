export function checkEnv() {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    return "http://localhost:5050";
  } else {
    return "";
  }
}
