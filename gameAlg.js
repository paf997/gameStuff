const whiteTokens = [{color:"white", value:1},
                     {color:"white", value:1},
                     {color:"white", value:1},
                     {color:"white", value:1},
                     {color:"white", value:2},
                     {color:"white", value:2},
                     {color:"white", value:3}];

const otherTokens = [{color:"other", value:1},
                    {color:"other", value:1},
                    {color:"other", value:1},
                    {color:"other", value:1},
                    {color:"other", value:1},
                    {color:"other", value:2},
                    {color:"other", value:2}];


const minWhiteValOnBust = 6;
const maxWhiteValOnBust =  8;
let startingBag = whiteTokens.concat(otherTokens);
let startingBagDopple  = startingBag;
const graphTotalValues = Array(10).fill(0) //lowest  = 6 hightest = 16
const graphWhiteValues = Array(3).fill(0) //low 6 high 8
const graphOtherValues = Array(14).fill(0) //  low 0 high 14


let bustNum = 6;

let whiteValCurrent = 0;
let otherValCurrent = 0;
startingNumberChips = startingBag.length;
console.log(startingNumberChips);

let n=0;
while (n < 10000){
    while (whiteValCurrent < bustNum){
        startingNumberChips = startingBag.length;
        let randomChip = Math.floor(Math.random() * startingNumberChips );
        //console.log("randomChip =  "+ randomChip);
        let randChipValue = startingBag[randomChip];
        //console.log(randChipValue  );

        if (randChipValue.color === "white"){
            whiteValCurrent += randChipValue.value;
            
        }else{
            otherValCurrent += randChipValue.value
        }
        startingBag.splice(randomChip, 1);
    }

    //console.log("Total value =  " + (whiteValCurrent + otherValCurrent) + " total white = " + whiteValCurrent + " +total other = "  + otherValCurrent);
    graphTotalValues[(otherValCurrent)+ (whiteValCurrent-minWhiteValOnBust)] ++;
    graphOtherValues[otherValCurrent] ++;
    otherValCurrent  = 0;
    graphWhiteValues[whiteValCurrent-minWhiteValOnBust] ++;
    whiteValCurrent = 0;
    startingBag = whiteTokens.concat(otherTokens);
    //console.log("Bag:" + startingBag.length);
    n++;
    
}

for (c =0; c < graphTotalValues.length; c++){
    console.log((c+6) + ": " + graphTotalValues[c] +  " " +(graphTotalValues[c]/n) + "%");
}