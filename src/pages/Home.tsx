import { DatePicker, message, Select, Table } from "antd";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import AddEditTransaction from "../components/AddEditTransaction";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { transactionModel } from "../models/transactionModel";
import transactionService from "../services/transactionService";
import "../styles/transactions.css";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransacionalModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState<moment.Moment[]>([]);
  const [viewType, setViewType] = useState("table");
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const getTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("budgetApp-user") as string);
      setLoading(true);
      const result = await transactionService.getTransactions(
        user._id,
        frequency
      );
      console.log(result.data);

      setTransactionsData(result.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.data);
    }
  };

  const deleteTransaction = async (transactionId: any) => {
    try {
      setLoading(true);
      await transactionService.deleteTransaction(transactionId._id);
      message.success("transaction delete success");
      await getTransactions();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.data);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    { title: "Montant", dataIndex: "amount" },
    { title: "Categorie", dataIndex: "category" },
    { title: "Type", dataIndex: "type" },
    { title: "Reference", dataIndex: "reference" },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: any) => {
        return (
          <div>
            <EditOutlined
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransacionalModal(true);
              }}
            />
            <DeleteOutlined
              className="mx-3"
              onClick={() => deleteTransaction(record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-item-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Selectionner la fréquence</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7">Derniere semaine</Select.Option>
              <Select.Option value="30">Dernier mois</Select.Option>
              <Select.Option value="365">Derniere année</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {/*frequency === "custom" && (
              <RangePicker
                value={selectedRange}
                onChange={(values) => setSelectedRange(values)}
              />
            )*/}
          </div>
        </div>

        <div className="d-flex">
          <div>
            <div className="view-switch mx-5">
              <UnorderedListOutlined
                className={`mx-3 ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                }`}
                size={30}
                onClick={() => setViewType("table")}
              />
              <AreaChartOutlined
                className={`${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                }`}
                size={30}
                onClick={() => setViewType("analytics")}
              />
            </div>
          </div>
          <button
            className="primary"
            onClick={() => setShowAddEditTransacionalModal(true)}
          >
            Ajouter
          </button>
        </div>
      </div>
      <div className="table-analtics">
        {viewType === "table" ? (
          <div className="table">
            <Table columns={columns} dataSource={transactionsData}></Table>
          </div>
        ) : (
          <Analytics transactions={transactionsData} />
        )}
      </div>
      {showAddEditTransactionModal && (
        <AddEditTransaction
          showAddEditTransactionModal={showAddEditTransactionModal}
          selectedItemForEdit={selectedItemForEdit}
          setSelectedItemForEdit={setSelectedItemForEdit}
          setShowAddEditTransacionalModal={setShowAddEditTransacionalModal}
          getTransaction={getTransactions}
        />
      )}
    </DefaultLayout>
  );
};

export default Home;
