import {
  createStockItemService,
  deleteImportStockItemService,
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
