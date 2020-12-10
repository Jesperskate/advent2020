const data = [35,
20,
15,
25,
47,
40,
62,
55,
65,
95,
102,
117,
150,
182,
127,
219,
299,
277,
309,
576];

// No parsing needed
findError(data);

function findError(data){
    var _pastFive = [];
    data.forEach((element, index) => {
        
        // add item to pastFive
        pastFive.push(element);
        // check pastFive.length
        if (pastFive.length > 5) {
            let arrDeletedItem = _pastFive.splice(0,1);

        } else {
            
        }

    });

    console.log(pastFive);
}
