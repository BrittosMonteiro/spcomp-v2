import { useState } from "react";
import { useDispatch } from "react-redux";
import { CircleNotch } from "phosphor-react";

import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/actions/messageBoxAction";
import { createInquiryHistory } from "../../services/inquiryHistoryService";
import { createInquiryList } from "../../services/inquiryListService";
import { updateInquiryItemStep } from "../../services/inquiryItemService";
import DialogDefault from "./DialogDefault";

export default function DialogInquiry({
  open,
  onClose,
  pending,
  changeTab,
  suppliersList,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const selectedSuppliers = [];

  function selectSupplier(supplier) {
    const pos = selectedSuppliers.findIndex(
      (e) => e.idSupplier === supplier.idSupplier
    );

    if (pos === -1) {
      selectedSuppliers.push(supplier);
    } else {
      selectedSuppliers.splice(pos, 1);
    }
  }

  async function sendInquiry(e) {
    e.preventDefault();

    if (!selectedSuppliers) {
      handleMessageBox("failed", "Selecione ao menos um fornecedor");
      return;
    }

    setIsLoading(true);

    const title = new Date().toISOString().split("T")[0];

    await createInquiryHistory({ title, selectedSuppliers })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((res) => {
        const data = {
          idInquiryHistory: res.data,
          selectedSuppliers: selectedSuppliers,
          items: pending,
        };
        createInquiry(data);
      })
      .catch(() => {
        handleMessageBox("Failed", "Nao foi possível criar a cotação!");
      })
      .finally(() => {
        onClose();
        setIsLoading(false);
      });
  }

  async function createInquiry(data) {
    setIsLoading(true);

    await createInquiryList(data)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then(() => {
        changeTab(2);
        updateItemStep();
      })
      .catch(() => {
        handleMessageBox("Failed", "Nao foi possível criar a cotação!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function updateItemStep() {
    setIsLoading(true);

    const data = {
      pending,
      step: 2,
    };

    await updateInquiryItemStep(data)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then(() => {
        handleMessageBox("success", "Cotação criada com sucesso!");
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function handleMessageBox(color, message) {
    dispatch(displayMessageBox({ color, display: true, message }));
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  return (
    <>
      <DialogDefault
        open={open}
        onClose={onClose}
        title={"Escolher fornecedores"}
      >
        <p className="font-sm font-light">
          Os itens pendentes serão enviados aos fornecedores selecionados para
          que estes preencham com seus preços
        </p>
        <form onSubmit={sendInquiry} className="column gap-4">
          <table className="table">
            <thead>
              <tr>
                <th>Selecionar</th>
                <th>Fornecedor</th>
              </tr>
            </thead>
            <tbody>
              {suppliersList.map((supplier, index) => (
                <tr key={index}>
                  <td>
                    <div className="row jc-start">
                      <input
                        type={"checkbox"}
                        onClick={() => selectSupplier(supplier)}
                        className="jc-start"
                      />
                    </div>
                  </td>
                  <td>{supplier.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row jc-between">
            <button
              type="submit"
              className="flex gap-2 ai-center font-medium font-md bg-green-1 text-white-1 pa-2 border-radius-soft"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircleNotch className="icon-default spinning" />
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form>
      </DialogDefault>
    </>
  );
}
