
const cart = [
  { id: 101, name: "Laptop", price: 60000, quantity: 1, inStock: true },
  { id: 102, name: "Mouse", price: 800, quantity: 2, inStock: true },
  { id: 103, name: "Keyboard", price: 1500, quantity: 1, inStock: false },
  { id: 104, name: "Monitor", price: 12000, quantity: 1, inStock: true }
];

// 1. filter() only inStock products
const availableProducts = cart.filter(item => item.inStock);
console.log(availableProducts);

// 2. map() create { name, totalPrice }
const productTotals = cart.map(item =>({
  name: item.name,
  totalPrice: item.price * item.quantity
}));
console.log(productTotals);

// 3. reduce() grand total cart value
const grandTotal = cart.reduce((total, item) => total + (item.price * item.quantity),0);
console.log(grandTotal);

// 4. find() details of "Mouse"
const mouseDetails = cart.find(item => item.name === "Mouse");
console.log(mouseDetails);

// 5. findIndex() position of "Keyboard"
const keyboardIndex = cart.findIndex(item => item.name === "Keyboard");
console.log(keyboardIndex);