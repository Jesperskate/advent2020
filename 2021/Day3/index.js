var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var lines = require("./input-example.txt").split(/\n/);

function parseData(input) {
    var output = []
    input.forEach((element, index) => {
        var line = element.split("");
        line = line.map((x) => parseInt(x));
        output.push(line);
    });
    return output
}

function clearUndefined(array) {
    var surrounding = array.filter(function (element) {
        return element !== undefined;
    });
    return surrounding
}

const mapData = parseData(lines)

function countOnesInColumn(columnId, inputData) {
    var countOne = 0;
    for (let index = 0; index < inputData.length; index++) {
        const element = inputData[index][columnId];
        if (element === 1) {
            countOne++;
        }
    }
    return countOne
}

function deleteRows(columnId, int, inputData) {
    var data = inputData;

    for (let index = 0; index < data.length; index++) {
        const element = data[index][columnId];
        if (element === int) {
            delete data[index]
        }

    }
    return clearUndefined(data)
}

var result = mapData;
var firstRow = mapData[0];

function findRating(type) {
    // type Oxygen: keep most common, if equal only ones
    // type C02: keep least common, if equal only zeros

    var keepAsLAst = 0;
    // for column 1 - n
    firstRow.forEach((element, index) => {
        var onesCount = countOnesInColumn(index, result);
        var halfOfResult = result.length / 2;

        if (onesCount === result.length || onesCount === 0) {

            return;
        } else {
            if (type === "Oxygen") {
                keepAsLAst = 0;
            } else {
                keepAsLAst = 1;
            }
            if (onesCount == halfOfResult) {
                result = deleteRows(index, keepAsLAst, result)
            } else {
                if (type === "Oxygen") {
                    if (onesCount > halfOfResult) {
                        result = deleteRows(index, 0, result)
                    } else {
                        result = deleteRows(index, 1, result)
                    }
                } else {
                    if (onesCount < halfOfResult) {
                        result = deleteRows(index, 0, result)
                    } else {
                        result = deleteRows(index, 1, result)
                    }
                }
            }
        }

    });

    result = result.join('').replace(/,/g, '');
    console.log(type +": " +parseInt(result, 2));
    return parseInt(result, 2);
}

var oxygen = findRating("Oxygen")
// reset variables before running the function again.
result = mapData;
firstRow = mapData[0];
// any name different then Oxygen works to get the CO2 scrubber value
var CO2 = findRating("CO2")
// result puzzle 2 
console.log(oxygen * CO2);
