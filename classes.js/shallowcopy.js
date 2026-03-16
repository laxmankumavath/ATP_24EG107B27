// Given Data
const user = {
  id: 101,
  name: "Ravi",
  preferences: {
    theme: "dark",
    language: "en"
  }
};

// Create shallow copy
const copiedUser = { ...user };

// Change values in copied object
copiedUser.name = "Arjun";                  
copiedUser.preferences.theme = "light";     

// Log both objects
console.log("Original User:", user);
console.log("Copied User:", copiedUser);