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
function getPositionByDirection(rowIndex, itemIndex, direction) {
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


function extendBasin(rowIndex, itemIndex, index) {
    var newSurrounding = [];
    var pos = getPositionByDirection(rowIndex, itemIndex, index)

    // getSurrounding for this 4
    var surrounding = getSurrounding(pos.itemIndex, pos.rowIndex);
    // remove item where you come from, direction is left so remove right

    var deleteIndex;

    console.log(returnDirectionName(index)+" is less than 9");


    if(index === 0 || index === 1){
        deleteIndex = index +2;
    }else{
        deleteIndex = index - 2;
    }
    delete surrounding[deleteIndex]

    // if item is < 9 then add to basin and get surrounding
    // console.log('surrounding for: '+ element +" = " + surrounding);
    surrounding.forEach((element, index) => {
        if (element < 9) {
            // basin.push(element)
            var pos2 = getPositionByDirection(pos.itemIndex, pos.rowIndex, index)
            // console.log(getSurrounding(pos2.itemIndex, pos2.rowIndex));
        }
    });
}

// console.log(getPositionByDirection(0,0,1).rowIndex);
function findBasin(itemIndex, rowIndex) {
    var row = mapData[rowIndex];
    var startItem = row[itemIndex];

    
    // add current item to basin
    var basin = [startItem];
    var surrounding = getSurrounding(itemIndex, rowIndex)
    //4,3,9,6
    let result = surrounding.every(function (e) {
        return e < 9 || undefined;
    });

        surrounding.forEach((element, index) => {
            if (element < 9) {
                
                basin.push(element);
    
                // search in surrounding items
                switch (index) {
                    case 0:
                        //left
                        var pos = getPositionByDirection(rowIndex, itemIndex, index);
                        row = mapData[pos.rowIndex];
                        startItem = row[pos.itemIndex];
                        
                        break;
                    case 1:
                        //above
                        extendBasin(rowIndex, itemIndex, index);
                        break;
                    case 2:
                        //right
                        var pos = getPositionByDirection(rowIndex, itemIndex, index);
                        row = mapData[pos.rowIndex];
                        startItem = row[pos.itemIndex];
    
                        // remove item where you come from, direction is left so remove right
                        // delete surrounding[0]
                        break;
                    case 3:
                        //under
                        extendBasin(rowIndex, itemIndex, index);
                        break;
                    default:
                        break;
                }
            }
        });
    
    
    return basin
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
    //ANSWER PUZZLE 1
    // const sum = lowPoints.reduce(add, 0); // with initial value to avoid when the array is empty
    // function add(accumulator, a) {
    //     return accumulator + a;
    // }
    // console.log(sum); // 6
    // END ANSWER PUZZLE 1
}

findLowPoints(mapData)

console.log(basins);


function findBasinYes(x, y) {
    var arr = getSurrounding(x,y);
   
    var arrCheck = arr.some(v => v < 9);
    if (arrCheck ) {
        
        arr.forEach((element, index) => {
           
            if (element < 9 && element !== undefined) {
                basinYes.push(element);
                // search in surrounding items
                switch (index) {
                    case 0:
                        //left

                        var pos = getPositionByDirection(y, x, index);
                        console.log("in arr: "+ arr + index+" itemIndex: " +pos.itemIndex + " y: "+pos.rowIndex);
                        setTimeout(function() {
                            console.log("call function again with: "+pos.itemIndex, pos.rowIndex);
                            findBasinYes(pos.itemIndex, pos.rowIndex);
                        }, 100);
                        break;
                    case 1:
                        //above
                        var pos = getPositionByDirection(y, x,index);
                        setTimeout(function() {
                            findBasinYes(pos.itemIndex, pos.rowIndex);
                        }, 100);
                        break;
                    case 2:
                        //right
                        var pos = getPositionByDirection(y, x,index);
                        setTimeout(function() {
                            findBasinYes(pos.itemIndex, pos.rowIndex);
                        }, 100);
                        break;
                    case 3:
                        //under
                        var pos = getPositionByDirection(y, x,index);
                        setTimeout(function() {
                            findBasinYes(pos.itemIndex, pos.rowIndex);
                        }, 100);
                        break;
                    default:
                        break;
                }
            }
        });
        
    }
    else {
        console.log('No surround value found of less than 9');
        console.log("basin: "+basinYes);

    }
    return basinYes;
    
}


// basins.forEach(element => {

   
//     console.log("checking for "+ element);
//     findBasinYes(element[0], element[1]); 


// });

var basinYes = [];
findBasinYes(1, 0); 