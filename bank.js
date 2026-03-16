const transactions = [
  { id: 1, type: "credit", amount: 5000 },
  { id: 2, type: "debit", amount: 2000 },
  { id: 3, type: "credit", amount: 10000 },
  { id: 4, type: "debit", amount: 3000 }
];

// 1. filter() all credit transactions
const credits = transactions.filter(t => t.type === "credit");

// 2. map() extract only amounts
const amounts = transactions.map(t => t.amount);

// 3. reduce() calculate final balance

const finalBalance = transactions.reduce((balance, t) =>
    t.type === "credit"
      ? balance + t.amount
      : balance - t.amount,
  0
);

// 4. find() first debit transaction
const firstDebit = transactions.find(t => t.type === "debit");

// 5. findIndex() of transaction with amount 10000
const index10000 = transactions.findIndex(t => t.amount === 10000);