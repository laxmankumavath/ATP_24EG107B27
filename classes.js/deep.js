// Given Data
const order = {
  orderId: "ORD1001",
  customer: {
    name: "Anita",
    address: {
      city: "Hyderabad",
      pincode: 500085
    }
  },
  items: [
    { product: "Laptop", price: 70000 }
  ]
};

// Ceate deep copy
const copiedOrder = structuredClone(order);

//  Modify copied object
copiedOrder.customer.address.city = "Mumbai";
copiedOrder.items[0].price = 65000;

//  Log both objects
console.log("Original Order:", order);
console.log("Copied Order:", copiedOrder);