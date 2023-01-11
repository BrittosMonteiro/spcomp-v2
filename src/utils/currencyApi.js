export async function getCurrencyValue() {
  const currency_ori = "USD";
  const currency_des = "BRL";
  const date = new Date().toLocaleDateString().split("/");
  const formatedDate = `${date[2]}${date[1]}${date[0] - 1}`;

  const api_dolar_url = `https://economia.awesomeapi.com.br/json/daily/${currency_ori}-${currency_des}/?start_date=${formatedDate}&end_date=${formatedDate}`;

  return await fetch(`${api_dolar_url}`);
}
