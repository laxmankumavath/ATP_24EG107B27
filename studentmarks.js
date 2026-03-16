// Assignment 3: Student Marks List

const marks = [78, 92, 35, 88, 40, 67];

// 1. filter() marks ≥ 40
const passedMarks = marks.filter(mark => mark >= 40);
console.log(passedMarks);

// 2. map() add 5 grace marks
const graceMarks = marks.map(mark => mark + 5);
console.log(graceMarks);

// 3. reduce() highest mark
const highestMark = marks.reduce((max, mark) => 
  mark > max ? mark : max
);
console.log(highestMark);

// 4. find() first mark below 40
const firstFail = marks.find(mark => mark < 40);
console.log(firstFail);

// 5. findIndex() of mark 92
const indexOf92 = marks.findIndex(mark => mark === 92);
console.log(indexOf92);