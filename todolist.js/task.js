// task.js

import { validateTitle, validatePriority, validateDueDate } from "./validator.js";

const tasks = [];
let taskId= 1;

// 1. Add new task
export function addTask(title, priority, dueDate) {
  if (!validateTitle(title)) return "Invalid Title";
  if (!validatePriority(priority)) return "Invalid Priority";
  if (!validateDueDate(dueDate)) return "Due date must be future date";

  const newTask = {
    id: taskId++,
    title,
    priority,
    dueDate,
    completed: false
  };

  tasks.push(newTask);
  return "Task Added Successfully";
}

// 2. Get all tasks
export function getAllTasks() {
  return tasks;
}

// 3. Mark task as complete
export function completeTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return "Task not found";

  task.completed = true;
  return "Task marked as complete";
}