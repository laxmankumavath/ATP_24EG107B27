// Assignment 2: Online Course Name Processor

const courses = ["javascript", "react", "node", "mongodb", "express"];

// filter() length > 5
const filteredCourses = courses.filter(course => course.length > 5);
console.log(filteredCourses);

//  map() to uppercase
const upperCaseCourses = courses.map(course => course.toUpperCase());
console.log(upperCaseCourses);

//  reduce() to single string
const combinedString = courses.map(course => course.toUpperCase()).reduce((acc, curr) => acc + " | " + curr);

console.log(combinedString);

//  find() "react"
const foundCourse = courses.find(course => course === "react");
console.log(foundCourse);

// 5 findIndex() of "node"
const nodeIndex = courses.findIndex(course => course === "node");
console.log(nodeIndex);
