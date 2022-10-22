export type transactionModel = {
  userId: String;
  amount: Number;
  category: CATEGORY;
  date: Date;
  description: String;
  reference: String;
  type: TYPE;
};

enum CATEGORY {
  salarié,
  freelance,
  nourriture,
  divertissement,
  investissement,
  education,
  medical,
  tax,
}

enum TYPE {
  revenu,
  depense,
}
