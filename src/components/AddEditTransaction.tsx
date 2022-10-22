import { Form, Input, message, Modal, Select } from "antd";
import React, { useState } from "react";
import { transactionModel } from "../models/transactionModel";
import transactionService from "../services/transactionService";
import Spinner from "./Spinner";

const AddEditTransaction = (props: {
  showAddEditTransactionModal: boolean;
  setShowAddEditTransacionalModal: (arg0: boolean) => void;
  selectedItemForEdit: any;
  setSelectedItemForEdit: any;
  getTransaction: any;
}) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: transactionModel) => {
    try {
      const user = JSON.parse(localStorage.getItem("budgetApp-user") as string);
      setLoading(true);
      if (props.selectedItemForEdit) {
        const transValue = {
          payload: { ...values, userId: user._id },
          transactionId: props.selectedItemForEdit._id,
        };
        await transactionService.editTransaction(transValue);
        message.success("Transaction ajouté");
      } else {
        await transactionService.addTransaction({
          ...values,
          userId: user._id,
        });
        message.success("Transaction mis à jour");
      }
      props.setShowAddEditTransacionalModal(false);
      props.selectedItemForEdit(null);
      setLoading(false);
      props.getTransaction();
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.data);
    }
  };

  return (
    <Modal
      title={
        props.selectedItemForEdit
          ? "Modifier transaction"
          : "Ajouter une transaction"
      }
      visible={props.showAddEditTransactionModal}
      onCancel={() => props.setShowAddEditTransacionalModal(false)}
      footer={false}
    >
      {loading && <Spinner />}
      <Form
        layout="vertical"
        className="transaction-form"
        onFinish={onFinish}
        initialValues={props.selectedItemForEdit}
      >
        <Form.Item label="Amount" name={"amount"}>
          <Input type={"number"} />
        </Form.Item>
        <Form.Item label="Type" name={"type"}>
          <Select>
            <Select.Option value="revenu">Revenu</Select.Option>
            <Select.Option value="depense">Dépense</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category" name={"category"}>
          <Select>
            <Select.Option value="salarié">Salarié</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="nourriture">Nourriture</Select.Option>
            <Select.Option value="divertissement">Divertissement</Select.Option>
            <Select.Option value="investissement">Investissement</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date" name={"date"}>
          <Input type={"date"} />
        </Form.Item>
        <Form.Item label="Reference" name={"reference"}>
          <Input type={"text"} />
        </Form.Item>
        <Form.Item label="Description" name={"description"}>
          <Input type={"text"} />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            Enregistrer
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditTransaction;
