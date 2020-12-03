var loc = {
    x: 0,
    y: 0
}
var trees = 0;
var lastItem;
let slopes = [];
slopes.push(step(1, 1));
resetLoc()
slopes.push(step(3, 1));
resetLoc()
slopes.push(step(5, 1));
resetLoc()
slopes.push(step(7, 1));
resetLoc()
slopes.push(step(1, 2));
console.log("Trees: " + trees);

console.table(slopes);
console.table(slopes.reduce(function(a,b){return a*b;}));




function step(xDir, yDir) {
    let treesOnSlope = 0;
    while (loc.y < data.length - 1) {
        loc.x = loc.x + xDir;
        loc.y = loc.y + yDir;
        
        // Get Y line
        let yLine = data[loc.y]

        // Get X from yLine
        let xOnY = yLine.charAt(loc.x);
        console.log("There is a " + xOnY + " at x" + loc.x + " y" + loc.y);
        lastItem = xOnY;

        if (xOnY === "#") {
            console.log("!found a tree at " + "x" + loc.x + " y" + loc.y);
            trees++;
            treesOnSlope++;
        }

    }

    return treesOnSlope;



}

function resetLoc() {
    loc = {
        x: 0,
        y: 0
    }
}