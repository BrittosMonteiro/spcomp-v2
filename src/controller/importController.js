import { readImportItemsService } from "../services/importsHistory";

export async function readImportItemsController(idImportHistory) {
  let items = [];

  await readImportItemsService(idImportHistory)
    .then((responseRead) => {
      if (responseRead.status === 200) {
        return responseRead.json();
      }
    })
    .then((response) => {
      items = response.data;
    })
    .catch(() => {});
  return items;
}
