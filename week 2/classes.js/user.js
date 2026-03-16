let user = {
  name: "Ravi",
  city: "Hyderabad"
};

// Clone and add new property
let updatedUser = { ...user, age: 25 };

// Print both objects
console.log(user);
console.log(updatedUser);