

// 1. Validate task title (not empty, min 3 chars)
export function validateTitle(title) {
  if( title === "string" && title.trim().length >= 3){
    return true;
  }
  return message="invalid title"
}

// 2. Validate priority (low, medium, high)
export function validatePriority(priority) {
  const validPriorities = ["low", "medium", "high"];
  return validPriorities.includes(priority);
}

// 3. Validate due date (must be future date)
export function validateDueDate(date) {
  const today = new Date();
  const inputDate = new Date(date);
  return inputDate > today;
}