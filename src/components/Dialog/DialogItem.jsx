import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export default function DialogItem(props) {
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [encap, setEncap] = useState("");
  const [weight, setWeight] = useState("");
  const [observation, setObservation] = useState("");

  useEffect(() => {
    if (props.itemData) {
      setDescription(props.itemData.description);
      setBrand(props.itemData.brand);
      setType(props.itemData.type);
      setEncap(props.itemData.encap);
      setWeight(props.itemData.weight);
      setObservation(props.itemData.observation);
    }
  }, [props.itemData]);

  const brandList = [
    {
      id: 1,
      description: "Marca 01",
    },
    {
      id: 2,
      description: "Marca 02",
    },
    {
      id: 3,
      description: "Marca 03",
    },
  ];

  const typeList = [
    {
      id: 1,
      description: "Tipo 01",
    },
    {
      id: 2,
      description: "Tipo 02",
    },
    {
      id: 3,
      description: "Tipo 03",
    },
  ];

  const encapList = [
    {
      id: 1,
      description: "Encapsulamento 01",
    },
    {
      id: 2,
      description: "Encapsulamento 02",
    },
    {
      id: 3,
      description: "Encapsulamento 03",
    },
  ];

  function addNewItem(e) {
    e.preventDefault();

    if (!description || !brand || !type || !encap || !weight || !observation) {
      console.log("Preencha o formulário");
      return;
    }

    let itemsList = JSON.parse(localStorage.getItem("itemsRegistered"));

    const data = {
      id: itemsList.length + 1,
      description: description,
      brand: brand,
      type: type,
      encap: encap,
      weight: weight,
      observation: observation,
    };

    itemsList.push(data);

    localStorage.setItem("itemsRegistered", JSON.stringify(itemsList));

    console.dir(data);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="overlay">
        <Dialog.Content className="dialog">
          <Dialog.Title className="font-medium font-lg">
            Adicionar item
          </Dialog.Title>
          <hr className="mt-4" />
          <form onSubmit={addNewItem}>
            <div className="column gap-2 text-dark-3 font-medium font-sm mt-4">
              <label htmlFor="item_description">Descrição</label>
              <input
                type={"text"}
                name="item_description"
                id="item_description"
                defaultValue={description}
                placeholder="Descrição"
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm mt-8">
              <label htmlFor="item_brand">Marca</label>
              <select
                name="item_brand"
                id="item_brand"
                defaultValue={brand}
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setBrand(e.target.value)}
              >
                {brandList.length > 0 ? (
                  <>
                    <option>Escolher marca do item</option>
                    {brandList.map((brand) => (
                      <option value={brand.id} key={brand.id}>
                        {brand.description}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm mt-8">
              <label htmlFor="item_type">Tipo</label>
              <select
                name="item_type"
                id="item_type"
                defaultValue={type}
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setType(e.target.value)}
              >
                {typeList.length > 0 ? (
                  <>
                    <option>Escolher tipo do item</option>
                    {typeList.map((type) => (
                      <option value={type.id} key={type.id}>
                        {type.description}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm mt-8">
              <label htmlFor="item_encap">Encapsulamento</label>
              <select
                name="item_encap"
                id="item_encap"
                defaultValue={encap}
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setEncap(e.target.value)}
              >
                {encapList.length > 0 ? (
                  <>
                    <option>Escolher encapsulamento do item</option>
                    {encapList.map((encap) => (
                      <option value={encap.id} key={encap.id}>
                        {encap.description}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm mt-8">
              <label htmlFor="item_weight">Peso</label>
              <input
                type={"text"}
                name="item_weight"
                id="item_weight"
                defaultValue={weight}
                placeholder="Peso do item"
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="column gap-2 text-dark-3 font-medium font-sm mt-8">
              <label htmlFor="item_observation">Observações</label>
              <textarea
                name="item_observation"
                id="item_observation"
                defaultValue={observation}
                placeholder="Informações importantes sobre o item"
                className="border-default pa-2 border-radius-soft font-medium font-md"
                onChange={(e) => setObservation(e.target.value)}
              ></textarea>
            </div>

            <hr className="my-4" />

            <div className="row justify-content-between align-items-center">
              <Dialog.Close className="font-medium font-md text-red-1">
                Fechar
              </Dialog.Close>
              <button
                type={"submit"}
                className="font-medium font-md bg-green-1 pa-2 text-white-1 border-radius-soft"
              >
                Concluir
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
