function biggestOfTwo(a, b) {
    // simply compare two numbers
    if (a > b) {
        return a;
    } else {
        return b;
    }
}

console.log(biggestOfTwo(10, 20));



// 2. Find the big number in given three numbers
function biggestOfThree(a, b, c) {
    // compare all numbers and return the biggest
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}

console.log(biggestOfThree(10, 50, 30));



// 3. Find the sum of marks in [90,78,65,98]
function sumOfMarks(arr) {
    let sum = 0;

    // loop through array and add each element
    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
    }

    return sum;
}

console.log(sumOfMarks([90, 78, 65, 98]));



// 4. Find the smallest element in marks array
function smallestElement(arr) {
    let min = arr[0];

    // compare every element with min
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    return min;
}

console.log(smallestElement([90, 78, 65, 98]));



// 5. Write a function that receives 3 numbers and return the big number
function findBiggest(a, b, c) {
    // using Math.max for simplicity
    return Math.max(a, b, c);
}

console.log(findBiggest(12, 45, 30));



// 6. Write a function that receives an array and returns their sum
function arraySum(numbers) {
    let total = 0;

    // add all elements
    numbers.forEach(num => {
        total += num;
    });

    return total;
}

console.log(arraySum([10, 20, 30, 40]));



// 7. Write a function that receives array & search element and return index
function searchElement(arr, element) {

    // loop and check each element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            return i; // return index if found
        }
    }

    return "not found"; // if element not present
}
// here the element will find in index[2]
console.log(searchElement([10, 20, 30, 40], 30));
// here not fond
console.log(searchElement([10, 20, 30, 40], 50));