export async function getCurrencyValue() {
  const currency_ori = "USD";
  const currency_des = "BRL";
  const date = new Date().toLocaleDateString().split("/");
  let pastDays = null;

  const today = new Date().getDay();

  switch (today) {
    case 0:
      pastDays = 2;
      break;
    case 1:
      pastDays = 3;
      break;
    default:
      pastDays = 1;
      break;
  }

  const formatedDate = `${date[2]}${date[1]}${date[0] - pastDays}`;
  const api_dolar_url = `https://economia.awesomeapi.com.br/json/daily/${currency_ori}-${currency_des}/?start_date=${formatedDate}&end_date=${formatedDate}`;

  return await fetch(`${api_dolar_url}`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((res) => {
      if (res) {
        return { dolar: res[0].ask };
      } else {
        return { dolar: 1 };
      }
    })
    .catch(() => {
      return { dolar: 1 };
    });
}
