import axios from "axios";
import { transactionModel } from "../models/transactionModel";

const addTransaction = (data: transactionModel) => {
  return axios.post("http://localhost:8000/transaction/add-transaction", data);
};

const getTransactions = (userId: String, frequency: String) => {
  return axios.post("http://localhost:8000/transaction/get-all-transaction", {
    userId: userId,
    frequency: frequency,
  });
};

const editTransaction = (transaction: any) => {
  return axios.put(
    `http://localhost8000/transaction/update-transaction`,
    transaction
  );
};

const deleteTransaction = (transactionId: String) => {
  return axios.delete(
    `http://localhost:8000/transaction/delete-transaction/${transactionId}`
  );
};

const transactionService = {
  addTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
};

export default transactionService;
