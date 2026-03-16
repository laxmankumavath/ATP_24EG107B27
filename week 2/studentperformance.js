// ASSIGNMENT 2: Student Performance Dashboard

const students = [
  { id: 1, name: "Ravi", marks: 78 },
  { id: 2, name: "Anjali", marks: 92 },
  { id: 3, name: "Kiran", marks: 35 },
  { id: 4, name: "Sneha", marks: 88 },
  { id: 5, name: "Arjun", marks: 40 }
];

// 1. filter() students who passed (marks ≥ 40)
const passedStudents = students.filter(student => student.marks >= 40);
console.log(passedStudents);

// 2. map() add grade field
const studentsWithGrades = students.map(student => ({
  
  grade:
    student.marks >= 90 ? "A" :
    student.marks >= 75 ? "B" :
    student.marks >= 60 ? "C" : "D"
}));

console.log(studentsWithGrades);

// 3. reduce() calculate average marks
const averageMarks = students.reduce(
  (total, student) => total + student.marks,
  0
) / students.length;

console.log(averageMarks);

// 4. find() student who scored 92
const topper = students.find(student => student.marks === 92);
console.log(topper);