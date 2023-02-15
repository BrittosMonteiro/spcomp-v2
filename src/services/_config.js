let API_URL = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  API_URL = "http://localhost:5050/";
} else {
  API_URL = "https://server-to-do-react.onrender.com/";
}

export default API_URL;
