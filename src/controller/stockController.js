import {
  createStockItemService,
  deleteImportStockItemService,
  readStockListService,
} from "../services/stockService";

export async function createStockItemController(data) {
  await createStockItemService(data)
    .then((responseCreate) => {
      if (responseCreate.status === 201) {
        return responseCreate.json();
      }
    })
    .then(() => {
      return;
    })
    .catch(() => {});
}

export async function readStockListController() {
  let stockItems = [];
  await readStockListService()
    .then((responseRead) => {
      if (responseRead.status === 200) {
        return responseRead.json();
      }
    })
    .then((response) => {
      stockItems = response.data;
    })
    .catch(() => {});

  return stockItems;
}

export async function deleteImportStockItemController(id) {
  await deleteImportStockItemService(id)
    .then((responseDelete) => {
      if (responseDelete.status === 200) {
        return responseDelete.json();
      }
    })
    .then(() => {
      return;
    })
    .catch(() => {});
}
