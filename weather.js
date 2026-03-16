let temperature=[32, 35, 28, 40, 38, 30, 42];

//filter() temperatures above 35
let fil=temperature.filter((elements)=>elements>35)
console.log(fil)

// map() to convert all temperatures from Celsius → Fahrenheit
let farenhiet=temperature.map((elements)=>elements*1.8+32)
console.log(farenhiet)

//reduce() to calculate average temperature
let avg=temperature.reduce((accumulator,elements)=>(accumulator+elements)/temperature.length)
console.log(avg)

//find() first temperature above 40
let first=temperature.find((elements)=>elements>40)
console.log(first)

//findIndex() of temperature 28
let ind=temperature.findIndex((elements)=>elements===28)
console.log(ind)