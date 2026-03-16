// app.js

import { addTask, getAllTasks, completeTask } from "./task.js";

// 1. Add some tasks
console.log(addTask("Finish Project", "high", "2026-12-30"));
console.log(addTask("Study JavaScript", "medium", "2026-05-10"));

// 2. Display all tasks
console.log("All Tasks:", getAllTasks());

// 3. Complete a task
console.log(completeTask(1));

// 4. Display all tasks again
console.log("Updated Tasks:", getAllTasks());
