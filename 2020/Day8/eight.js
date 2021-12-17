var data = [['nop', '+0'],
['acc', '+1'],
['jmp', '+4'],
['acc', '+3'],
['jmp', '-3'],
['acc', '-99'],
['acc', '+1'],
['jmp', '-4'],
['acc', '+6']];
var accumulatorHistory= [];

// Parse data
parseCommandData(data);
runCommandData(data);


// console.log(data);
function parseCommandData(input) {
    input.forEach((item, index) => {
        item[1] = parseInt(item[1]);
    });
}





function readCmdLine(params) {
    
}


function runCommandData(cmdLines) {
    var accumulator = 0; 
    
    var index = 0;
    var loopCounter = 0;
    // iterate through command lines

    console.log("New index is "+index);
    var goOn = true;

    while (goOn) {
        let cmdLine = cmdLines[index];
        let operation  = cmdLine[0].toString();
        let argument = cmdLine[1];
    
        var cmdObj = {operation: operation, argument: argument};
        console.log( "Got "+operation+": @"+index+ " cmd: " + JSON.stringify(cmdObj));

        if (operation === "nop") {
            // do noting, let index increase
            index++;
        }else if (operation === "acc") {
            
            accumulator = accumulator + argument;

            // let index increase
            index++;

            // console.log("New ACC index is "+index);
        }else if (operation === "jmp") {

            index = index + argument;
        } else {
            console.log("Command not recognized: "+operation);
        }

         // save to history of accumulator
         accumulatorHistory.push({index: index, accumulator: accumulator});

         console.log("index: "+index);
         goOn = IndexIsNotInHistory(index);
         console.log("goOn: " + goOn)

        loopCounter++
        console.log("LoopCount: "+loopCounter);
    }


}

function IndexIsNotInHistory(id) {
    var res = true
    accumulatorHistory.forEach(item => {
        if (Object.values(item).indexOf(1) > -1) {
            console.log(accumulatorHistory);
            res = false;
         }else{
             res=  true;
         }
    });

    return res
}