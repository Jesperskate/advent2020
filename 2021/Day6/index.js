var fs = require('fs');
require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var lines = require("./input-example.txt").split(",");
var fishData = lines.map((x) => parseInt(x));
console.log(fishData);

function getTomorrowFishData(arr) {
    var newFishData = [];
    arr.forEach(element => {
        var newFish = element - 1;
        if (newFish >= 0) {
            newFishData.push(newFish)
        } else {
            newFishData.push(6)
            newFishData.push(8)
        }
    });

    fishData = newFishData
    return fishData;
}

// for (let index = 0; index < 80; index++) {
//     getTomorrowFishData(fishData);
// }

// console.log("Lenght fishData: "+ fishData.length);

function day6() {
    console.log("Day 6 - puzzle 2");
    const fishes = fishData
    const buckets = new Array(9).fill(0);
    fishes.forEach(fish => { buckets[fish]++ })
    for (let i = 0, l = 256; i < l; i++) {
        const b = buckets.shift();
        buckets.push(b)
        buckets[6] += b
    }
    let total = 0
    buckets.forEach(b => { total += b })
    console.log(total)
}

day6()