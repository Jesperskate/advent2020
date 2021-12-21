var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var lines = require("./input-example.txt").split(",");
var krabPositions = lines.map((x) => parseInt(x));
// console.log(krabPositions);

const sum = krabPositions.reduce((a, b) => a + b, 0);
const avg = (sum / krabPositions.length) || 0;

console.log(`The sum is: ${sum}. The average is: ${avg}.`);
console.log('Lets start with Day 7 Puzzle 1: ');

const maxPositition = krabPositions.reduce(function (a, b) {
    return Math.max(a, b);
}, 0);

console.log('Highest item: ' + maxPositition);

const test = [1,2,3,4,5,6,7]

function getFuelForPosition(position) {
    var fuelItems = [];
    var totalFuelcost;
    var fuel;
    krabPositions.forEach(element => {
        if (element < position) {
            fuel = position - element;
        } else {
            fuel = element - position;
        }

        fuelItems.push(getRealFuel(fuel));
    });
    // console.log(fuelItems);
    totalFuelcost = fuelItems.reduce((a, b) => a + b, 0);


    return totalFuelcost;
}

var result = []
for (let index = 0; index < maxPositition; index++) {
    result.push(getFuelForPosition(index))
    
}

// console.log(result);
const minPosition = result.reduce(function (a, b) {
    return Math.min(a, b);
}, null)

// ANSWER PUZZLE 1
console.log( Math.min.apply(null, result) + " liters fuel needed")  // 1;
console.log("For getting all crabs on position: " +result.indexOf(Math.min.apply(null, result), 0) ) // 1;

function getRealFuel(steps) {
    var N = steps || 1; 
    var arrx = Array.apply(null, {length: N}).map(Number.call , Number).map(v=> v+1)
    const reducer = (accumulator, curr) => accumulator + curr;
    var fuelCost = arrx.reduce(reducer);  
    return fuelCost

}


