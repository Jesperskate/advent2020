var loc = {
    x: 0,
    y: 0
}
var trees = 0;
var lastItem;

while (loc.y < data.length-1) {
    
    step(3, 1)
}
console.log("Trees found: "+ trees);


function step(xDir, yDir){
    loc.x = loc.x + xDir;
    loc.y = loc.y + yDir;

    // Get Y line
    let yLine = data[loc.y]

    // Get X from yLine
    let xOnY = yLine.charAt(loc.x);
    console.log("There is a "+xOnY+" at x"+loc.x +" y"+ loc.y);
    lastItem = xOnY;

    if(xOnY === "#"){
        console.log("!found a tree at "+ "x"+loc.x +" y"+ loc.y);
        trees++;
    }

}