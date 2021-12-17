var fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var lines = require("./input.txt").split(/\n/);
function objectifyInput(input) {
    var res = []

    input.forEach(element => {
        var e = element.split(" -> ");
        var start = e[0].split(",")
        var end = e[1].split(",")
        var element = {
            start: {
                x: parseInt(start[0]),
                y: parseInt(start[1])
            },
            end: {
                x: parseInt(end[0]),
                y: parseInt(end[1])
            }
        }
        res.push(element)

    });
    return res;
}
let segments = objectifyInput(lines);
// console.log(segments);


const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort(function(a, b){return a-b}); // You can define the comparing function here. 
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
            if (!results.includes(sorted_arr[i])) {
                results.push(sorted_arr[i]);
            } else {

            }

        }
    }
    return results;
}


let points = [];




function part1(data) {
    data.forEach(element => {
        var e = element;
        // if horizontal add all items to points
        if (e.start.x === e.end.x) {
            // console.log(JSON.stringify(e) + "is horizontal");

            var lowEnd = Math.min(e.start.y, e.end.y);
            var highEnd = Math.max(e.start.y, e.end.y);
            if (lowEnd === highEnd) {
                points.push(parseInt(+e.start.x + "" + e.start.y))
            } else {
                for (var i = lowEnd; i <= highEnd; i++) {
                    points.push(parseInt(+e.start.x + "" + i))
                }
            }

        } 
        // if vertical add all items to points
        else if (e.start.y === e.end.y) {
            var lowEnd = Math.min(e.start.x, e.end.x);
            var highEnd = Math.max(e.start.x, e.end.x);
            if (lowEnd === highEnd) {
                points.push(parseInt(+e.start.x + "" + e.start.y))
            } else {
                for (var i = lowEnd; i <= highEnd; i++) {
                    points.push(parseInt(+i + "" + e.start.y))
                }
            }
        }
        // console.log(points );
    });

    // console.log(points);
    let duplicatedArray = points;
    let resultPuzzle1 = findDuplicates(duplicatedArray);
    // console.log(`The duplicates in ${duplicatedArray} are ${resultPuzzle1}`);
    console.log('In total: ' + resultPuzzle1.length);


}

part1(segments);

// 8571 too high