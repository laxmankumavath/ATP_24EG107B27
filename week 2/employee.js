
const employees = [
  { id: 201, name: "Amit", salary: 45000, department: "IT" },
  { id: 202, name: "Neha", salary: 60000, department: "HR" },
  { id: 203, name: "Rahul", salary: 75000, department: "IT" },
  { id: 204, name: "Pooja", salary: 30000, department: "Sales" }
];

// 1. filter() employees from IT department
const itEmployees = employees.filter(emp => emp.department === "IT");
console.log(itEmployees);

// 2. map() add netSalary (10% bonus)
const employeesWithBonus = employees.map(emp => ({ netSalary: emp.salary + emp.salary * 0.10}));
console.log(employeesWithBonus);

// 3. reduce() total salary payout
const totalPayout = employees.reduce((total, emp) => total + emp.salary,0);
console.log(totalPayout);

// 4. find() employee with salary 30000
const lowSalaryEmployee = employees.find(emp => emp.salary === 30000);
console.log(lowSalaryEmployee);

// 5. findIndex() of employee "Neha"
const nehaIndex = employees.findIndex(emp => emp.name === "Neha");
console.log(nehaIndex);