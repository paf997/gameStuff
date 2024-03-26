const whiteTokens = [{color:"white", value:1},
                     {color:"white", value:1},
                     {color:"white", value:1},
                     {color:"white", value:1},
                     {color:"white", value:2},
                     {color:"white", value:2},
                     {color:"white", value:3}];

const otherTokens = [{color:"weapon", value:1},
                    {color:"armour", value:1},
                    {color:"attack", value:1},
                    {color:"defense", value:1},
                    {color:"defense", value:2}];

const playerDrawnTokens = [];

const playerStartingCards = [{name:"Attack 1", type:"Attack", cost:5, Damage:4, BonusTrigger:"AttackToken", BonusTriggerValue:1, BonusValueAdded:2,description:"cost:5 Dam: 4, +2 / att token"}, 
                            {name:"Attack 1", type:"Attack", cost:5, Damage:4, BonusTrigger:"AttackToken", BonusTriggerValue:1, BonusValueAdded:2,description:"cost:5 Dam: 4, +2 / att token"}, 
                            {name:"Attack 1", type:"Attack", cost:5, Damage:4, BonusTrigger:"AttackToken", BonusTriggerValue:1, BonusValueAdded:2,description:"cost:5 Dam: 4, +2 / att token"}, 
                            {name:"Attack 1", type:"Attack", cost:5, Damage:4, BonusTrigger:"AttackToken", BonusTriggerValue:1, BonusValueAdded:2,description:"cost:5 Dam: 4, +2 / att token"},   
                            {name:"Defense 1", type:"Defense", cost:5, Defense:3, BonusTrigger:"DefenseToken", BonusTriggerValue:1, BonusValueAdded:3,description:"cost:5 Def: 3, +3 / Def token"},
                            {name:"Defense 1", type:"Defense", cost:5, Defense:3, BonusTrigger:"DefenseToken", BonusTriggerValue:1, BonusValueAdded:3,description:"cost:5 Def: 3, +3 / Def token"},
                            {name:"Defense 1", type:"Defense", cost:5, Defense:3, BonusTrigger:"DefenseToken", BonusTriggerValue:1, BonusValueAdded:3,description:"cost:5 Def: 3, +3 / Def token"},
                            {name:"Defense 1", type:"Defense", cost:5, Defense:3, BonusTrigger:"DefenseToken", BonusTriggerValue:1, BonusValueAdded:3,description:"cost:5 Def: 3, +3 / Def token"},
                            ];


//#####################  Fill Player's  hand ###############
const playerHandLimit = 4;
const playerHand = [];
for (cards = 0; cards < playerHandLimit; cards++){
    let randomCardNum = Math.floor(Math.random() * playerStartingCards.length);
    let randomCard = playerStartingCards[randomCardNum];
    playerHand.push(randomCard);
    console.log("Card " + cards + " " + randomCard.name + " :" + randomCard.description);
}

/******************************************   Monster and Character Stats ***********************************************************/
let impHP = 12;
let monsterAttTotal = 0;
let monsterDefTotal = 0;
const impActionsList = [{name:"Attack1", cost:3, type:"Attack", attack:5},
                    {name:"Attack2", cost:4, type:"Attack", attack:7},
                    {name:"Defense1", cost:2, type:"Defense", defense:2},
                    {name:"Defense1", cost:3, type:"Defense", defense:3}];
const impActionsTaken =[];
    //********************  Randomize  Monster acctions. keep doing actions while cost is less than 7 ******************/
const monsterBust = 7;
let powerSpent = 0;
let  busted = false;
while (busted != true){
    let randomNum = Math.floor(Math.random() * impActionsList.length);
    let currentMonAction  = impActionsList[randomNum];
    //console.log(randomNum + " This" + currentMonAction.attack)
    if(currentMonAction.type === "Attack" && (powerSpent + currentMonAction.cost <= 7)){
        monsterAttTotal += currentMonAction.attack;
        powerSpent += currentMonAction.cost;
        impActionsTaken.push(currentMonAction);
    }else if (currentMonAction.type === "Defense" && (powerSpent + currentMonAction.cost <= 7)){
        monsterDefTotal += currentMonAction.defense;
        //console.log("Def: " + monsterDefTotal);
        powerSpent += currentMonAction.cost;
        impActionsTaken.push(currentMonAction);
    }else{
        busted = true;
    }
}
console.log("Total spent:  " + powerSpent);
console.log("Monster Att: " + monsterAttTotal + " Def: "  + monsterDefTotal )
console.table(impActionsTaken);

const fighter = {
    HP:15,
}

//console.log("Imp: " + JSON.stringify(imp));

/******************************************   Monster Stuff   ***********************************************************/

const minWhiteValOnBust = 6;
const maxWhiteValOnBust =  8;
let startingBag = whiteTokens.concat(otherTokens);
let startingBagDopple  = startingBag;
const graphTotalValues = Array(10).fill(0); //lowest  = 6 hightest = 16
const graphWhiteValues = Array(3).fill(0); //low 6 high 8
const graphOtherValues = Array(14).fill(0); //  low 0 high 14
const graphDefValues =  Array(3).fill(0);

let bustNum = 6;

let defValCurrent = 0;
let attValCurrent = 0;
let whiteValCurrent = 0;
let otherValCurrent = 0;
startingNumberChips = startingBag.length;
console.log("Number of Chips: " + startingNumberChips);

function playTurn(turns){
    let n=0;
    while (n < turns){
        while (whiteValCurrent < bustNum){
            startingNumberChips = startingBag.length;
            let randomChip = Math.floor(Math.random() * startingNumberChips );
            //console.log("randomChip =  "+ randomChip);
            let randChipValue = startingBag[randomChip];
            //console.log(randChipValue  );

            if (randChipValue.color === "white"){
                whiteValCurrent += randChipValue.value;
            }else if(randChipValue.color === "defense"){
                defValCurrent+=randChipValue.value;
                otherValCurrent += randChipValue.value;
            }else if(randChipValue.color === "attack"){
                attValCurrent+=randChipValue.value;
                otherValCurrent += randChipValue.value;
            }else{
                otherValCurrent += randChipValue.value;
            }
            //console.log(" # of chips " + startingBag.length + " # of drawn:" + playerDrawnTokens.length);
            startingBag.splice(randomChip, 1);
            //console.log(" # of chips " + startingBag.length + " # of drawn:" + playerDrawnTokens.length);
            //console.log(JSON.stringify(randChipValue)); 
            playerDrawnTokens.push(randChipValue);
            //console.log("Drawn tokens");
            //console.table(playerDrawnTokens); 
            //console.log("Leftovers");
            //console.table(startingBag);
            
        }
            //console.table(startingBag);
            console.log("Total value: " + (otherValCurrent + whiteValCurrent));
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
        console.log("Attack Bonus: " + attValCurrent + " Defense Bonus: " + defValCurrent);
        
        //used for seeeing drawn tokens each turn
        /*for (tokens =0; tokens< playerDrawnTokens.length; tokens++){
            console.log("Token " + tokens +  ": " + playerDrawnTokens[tokens].color + " " + playerDrawnTokens[tokens].value);
        }*/
        console.table(playerDrawnTokens);

        //used for graphing averages 
        /*for (c =0; c < graphTotalValues.length; c++){
            console.log((c+6) + ": " + graphTotalValues[c] +  " " +(graphTotalValues[c]/n) + "%");
        }*/
}

playTurn(1);

