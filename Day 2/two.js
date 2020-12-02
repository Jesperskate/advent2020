
var totalCorrect = 0;
var totalWrong = 0;
var totalCorrectQuestion2 = 0;

for (let i = 0; i < data.length; i++) {
    const str = data[i];
    var splitted = str.split(": ");
    // e.g.  "wcnoiccnc"
    var value = splitted[1];
    let criteria = splitted[0].split(" ");
    // char: c
    var char = criteria[1]
    // minMax: 1-3 
    var minMax = criteria[0].split("-");
    var min = parseInt(minMax[0]);
    var max = parseInt(minMax[1]);

    // console.log("Min: " + min + " Max: " + max + " and character: " + char);
    // console.log("for value: " + value);
    // let countedChar = countCharacter(value, char);

    // if (countedChar >= min && countedChar <= max) {
    //     console.log("Entry "+ i +" correct");
    //     totalCorrect++;
    // } else {
    //     console.log("Entry "+i+" incorrect");
    //     totalWrong++;
    // }
    let x = validateValue(value, char, min, max, i);
    console.log("i: "+i+" x: "+ x + " for: "+ value + " char: "+char +" minMax "+min+max);
    if(x){
        totalCorrectQuestion2++; 
    }


}
//892 
// log results:
console.log("Correct: "+ totalCorrect);
console.log("Incorrect: "+ totalWrong);
console.log("totalCorrectQuestion2: "+ totalCorrectQuestion2);



function validateValue(givenStr, ch, min, max, i) {
    let firstChar = givenStr.charAt(min-1);
    let secondChar = givenStr.charAt(max-1)
    let rule1 = firstChar == ch;
    let rule2 = secondChar == ch ;
    console.log("i: "+i+" givenStr: "+ givenStr+ " l: "+givenStr.length);
    console.log("i: "+i+" firstChar: "+ firstChar +" char: "+ch +" = "+ rule1);
    console.log("i: "+i+" secondChar: "+ secondChar +" char: "+ch +" = "+ rule2);
    
    if (rule1 && rule2 === false) {
        // console.log('rule 1 is true and rule 2 is false:' + rule1 + rule2 );
        // console.log("Min: " + min + " Max: " + max + " and character: " + char+ " value"+ givenStr);
        return true;
    }if (rule1 === false && rule2) {
        // console.log('rule 1 is false and rule 2 is true:' + rule1 + rule2 );
        // console.log("Min: " + min + " Max: " + max + " and character: " + char+ " value"+ givenStr);
        return true;
    } else {
        return false
    }
    
}




function countCharacter(givenStr, ch, min, max) {

    let count = 0;

    for (let i = 0; i < givenStr.length; i++) {
        if (givenStr.charAt(i) == ch) {
            count++;
        }
    }

    console.log(`Total occurrence : ${count}`);
    return count;
}
