var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var lines = require("./input.txt").split(/\n/);

function parseData(input) {
    var output = []
    input.forEach((element, index) => {
        var line = [],
            sNumber = element.toString();

        for (var i = 0, len = sNumber.length; i < len; i += 1) {
            line.push(+sNumber.charAt(i));
        }
        output.push(line);
    });
    return output
}

const mapData = parseData(lines)
// --- DATA READY --- 

function clearUndefined(array) {
    var surrounding = array.filter(function (element) {
        return element !== undefined;
    });
    return surrounding
}
 
function returnDirectionName(id) {
    var directions = ['left', 'above','right', 'under']
    return directions[id]
}
// END UITLITIES


var lowPoints = [];
var basins = [];

function findLowPoint(surrounding, item) {
    var isLowPoint = surrounding.every(v => v > item);
    if (isLowPoint) {
        return item + 1;
        // console.log(surrounding, item, surrounding.every(v => v > item));
    }
    return undefined;
}

function getSurrounding(itemIndex, row) {
    var isFirstRow = (row <= 0),
        isLastRow = (row >= mapData.length - 1);
    var line = mapData[row]
    var left, above, right, under;

    //above
    if (!isFirstRow && line !== undefined) { above = mapData[row - 1][itemIndex] };

    if (!row) {
        var left = line[itemIndex - 1];
        var right = line[itemIndex + 1]; 
    }
    
    //under
    if (!isLastRow && line !== undefined) { under = mapData[row + 1][itemIndex] }
    return [left, above, right, under]
}


// for each low point
function getPositionByDirection(itemIndex, rowIndex, direction) {
    // 0 = left
    // 1 = up
    // 2 = right
    // 3 = down
    var newRowIndex = rowIndex,
        newItemIndex = itemIndex;

    // var isFirstRow = (rowIndex == 0),
    //         isLastRow = (index == input.length - 1);

    switch (direction) {
        case 0: //left
            newItemIndex = itemIndex - 1;
            break;
        case 1: // up
            newRowIndex = rowIndex - 1;
            break;
        case 2: //right
            newItemIndex = itemIndex + 1;
            break;
        case 3: // down
            newRowIndex = rowIndex + 1;
            break;

        default:
            break;
    }

    return { "rowIndex": newRowIndex, "itemIndex": newItemIndex }
}


function findLowPoints(input) {
    input.forEach((element, index) => {
        var row = element,
            rowIndex = index,
            isFirstRow = (index === 0),
            isLastRow = (index == input.length - 1);

        row.forEach((element, index) => {
            var item = element,
                itemIndex = index;
            var left = row[itemIndex - 1],
                above;
            //above
            if (!isFirstRow) { above = input[rowIndex - 1][itemIndex] };

            var right = row[itemIndex + 1];
            var under;
            //under
            if (!isLastRow) { under = input[rowIndex + 1][itemIndex] }

            var surrounding = clearUndefined([left, above, right, under])

            var lowPointFound = findLowPoint(surrounding, item, itemIndex, rowIndex)
            lowPoints.push(lowPointFound)
            if (lowPointFound !== undefined) {
                // search basin here
                
                basins.push([itemIndex, rowIndex]);
            }
        });
    });
    lowPoints = clearUndefined(lowPoints)

    return lowPoints
}

findLowPoints(mapData);

console.log(lowPoints);
console.log(basins);




