console.log(data[2]);
var wrongPassports = [];
var correctPassports = [];


const validationScheme = {
    ecl: {
        required: true,
        regex: /(^amb$|blu$|^brn$|^gry$|^grn$|^hzl$|^oth$)/
    },
    byr: {
        required: true,
        regex: /\b(19[2-8][0-9]|199[0-9]|200[0-2])\b/
    },
    iyr: {
        required: true,
        regex: /\b(201[0-9]|2020)\b/
    },
    pid: {
        required: true,
        regex: /^([0-9]{9})$/
    },
    cid: {
        required: false,
        regex: ""
    },
    hgt: {
        required: true,
        regex: /\b(1[5-8][0-9]|19[0-3])cm|\b(59|6[0-9]|7[0-6])in\b/
    },
    eyr: {
        required: true,
        regex: /\b(202[0-9]|2030)\b/
    },
    hcl: {
        required: true,
        regex: /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{6})$/
    },
};


data.forEach(function (element, i) {
    let obj = element;
    let errorsInPassport = 0;

    console.log("Checking pp #" + i);
    // loop through validation scheme
    for (const [key, value] of Object.entries(validationScheme)) {

        if (value.required) {
            // check if there a value in the required field
            if (obj[key] == undefined) {
                // console.log("Required but is undefined!");

                errorsInPassport++;

            } else {
                // console.log("Required and correct ("+obj[key]+")");


                if (obj[key].match(value.regex)) {
                    // console.log("String: "+ obj[key] +" == "+ value.regex +" is "+obj[key].match(value.regex));


                } else {
                    console.log("X >> No match for #" + i + " key " + key + " - " + obj[key]);
                    errorsInPassport++;
                }
            }
        } else {
            // Optional keys, CID is Optional
            // console.log(key + " is optional");

        }


    }

    if (errorsInPassport > 0) {

        wrongPassports.push(i);
        return false;
    } else {
        correctPassports.push(i);
        return false;
    }



});

console.log("Total passport checked: " + data.length);
console.log("Invalid PP: " + wrongPassports.length);
console.log("Valid PP: " + correctPassports.length);

