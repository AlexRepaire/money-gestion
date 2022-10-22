import { Progress } from "antd";
import "../styles/analytics.css";

const Analytics = (props: { transactions: any }) => {
  const totalTransactions = props.transactions.length;
  const totalIncomeTransactions = props.transactions.filter(
    (trans: any) => trans.type === "revenu"
  );
  const totalExpenseTransactions = props.transactions.filter(
    (trans: any) => trans.type === "depense"
  );
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  const totalTurnover = props.transactions.reduce(
    (acc: any, transaction: any) => acc + transaction.amount,
    0
  );

  const totalIncomeTurnover = props.transactions
    .filter((transaction: { type: string }) => transaction.type === "revenu")
    .reduce((acc: any, transaction: any) => acc + transaction.amount, 0);

  const totalExpenseTurnover = props.transactions
    .filter((transaction: { type: string }) => transaction.type === "depense")
    .reduce((acc: any, transaction: any) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;

  const categories = [
    "salarié",
    "freelance",
    "nourriture",
    "divertissement",
    "investissement",
    "education",
    "medical",
    "tax",
  ];

  return (
    <div className="analytics">
      <div className="row">
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total transaction: {totalTransactions}</h4>
            <hr />
            <h5>Revenus: {totalIncomeTransactions.length}</h5>
            <h5>Dépenses: {totalExpenseTransactions.length}</h5>
            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor={"green"}
                type="circle"
                percent={Number.parseInt(
                  totalIncomeTransactionsPercentage.toFixed(0)
                )}
              />
              <Progress
                className="mx-5"
                strokeColor={"red"}
                type="circle"
                percent={Number.parseInt(
                  totalExpenseTransactionsPercentage.toFixed(0)
                )}
              />
            </div>
          </div>
          <div className="transactions-count">
            <h4>Total Turnover: {totalTurnover}</h4>
            <hr />
            <h5>Revenus: {totalIncomeTurnover}</h5>
            <h5>Dépenses: {totalExpenseTurnover}</h5>
            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor={"green"}
                type="circle"
                percent={Number.parseInt(
                  totalIncomeTurnoverPercentage.toFixed(0)
                )}
              />
              <Progress
                className="mx-5"
                strokeColor={"red"}
                type="circle"
                percent={Number.parseInt(
                  totalExpenseTurnoverPercentage.toFixed(0)
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h3>Revenues - Categorie</h3>
          {categories.map((category) => {
            const amount = props.transactions
              .filter(
                (t: any) => t.type === "revenu" && t.category === category
              )
              .reduce((acc: any, t: { amount: any }) => acc + t.amount, 0);
            return (
              amount > 0 && (
                <div className="category-card">
                  <h5>{category}</h5>
                  <Progress
                    percent={parseInt(
                      ((amount / totalIncomeTurnover) * 100).toFixed(0)
                    )}
                  />
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-6">
          <h3>Dépenses - Categorie</h3>
          {categories.map((category) => {
            const amount = props.transactions
              .filter(
                (t: any) => t.type === "depense" && t.category === category
              )
              .reduce((acc: any, t: { amount: any }) => acc + t.amount, 0);
            return (
              amount > 0 && (
                <div className="category-card">
                  <h5>{category}</h5>
                  <Progress
                    percent={parseInt(
                      ((amount / totalExpenseTurnover) * 100).toFixed(0)
                    )}
                  />
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
