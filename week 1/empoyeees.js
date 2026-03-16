const employees = [
{
    eno: 101,
    name: "Ravi",
    marks: [78, 82, 91],
},
{
    eno: 102,
    name: "Bhanu",
    marks: [65, 70, 68],
},
{
    eno: 103,
    name: "Sneha",
    marks: [88, 92, 95],
},
{
    eno: 104,
    name: "Kiran",
    marks: [55, 60, 58],
},
{
    eno: 105,
    name: "Anitha",
    marks: [90, 85, 87],
},
];



// 1. Insert new Emp at 2nd position
const newEmp = {
    eno: 106,
    name: "Rahul",
    marks: [80, 75, 82]
};

// (splice) is used to insert element at specific index
employees.splice(1, 0, newEmp);

console.log(employees);



// 2. Remove an emp with name "Kiran"

// filter removes the matching employee
const updatedEmployees = employees.filter(emp => emp.name !== "Kiran");

console.log(updatedEmployees);



// 3. Change the last mark 95 to 75 of emp "Sneha"

// find Sneha and update her marks
employees.forEach(emp => {
    if (emp.name === "Sneha") {  // it will find name "sneha"
        emp.marks[2] = 75;   
    }
});

console.log(employees);