var droppables = [
    "#droppable",
    "#droppable2",
    "#droppable3",
    "#droppable4",
    "#droppable5"
];

var draggables = [
    "#draggable",
    "#draggable2",
    "#draggable3",
    "#draggable4",
    "#draggable5"
];

//No cheating ;-)
var antonyms = [
    ["Hot", "Cold"],
    ["Rough", "Soft"],
    ["Tall", "Short"],
    ["Win", "Lose"],
    ["High", "Low"],
    ["Rich", "Poor"],
    ["Happy", "Sad"],
    ["Young", "Old"],
    ["First", "Last"],
    ["Stop", "Go"],
    ["Weak", "Strong"],
    ["In", "Out"],
    ["Alive", "Dead"],
    ["Awake", "Asleep"]
];

//Stopper used to stop the alarm after all antonyms are matched
var stopper = 0;

//Fisher-Yates Shuffle Algorithm
function shuffle(array) {
    "use strict";
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter--) {
        // Pick a random index
        index = (Math.random() * counter) | 0;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function randomDrop() {
    "use strict";
    //Return and discard the top of the shuffled array
    return droppables.pop();
}

function randomDrag() {
    "use strict";
    //Return and discard the top of the shuffled array
    return draggables.pop();
}

function randomAntonym() {
    "use strict";
    //Return and discard the top of the shuffled array
    return antonyms.pop();
}

//Randomly assigns an antonym pair to a random draggable and droppable
function assignPair() {
    "use strict";
    var draggable = randomDrag();
    var droppable = randomDrop();
    var antonymPair = randomAntonym();

    $( droppable ).droppable({
        accept: draggable,
        drop: function( event, ui ) {
            $(this).hide();
            $(draggable).hide();
            stopper++;
        }
    });

    $(draggable).text(antonymPair[0]);
    $(droppable).text(antonymPair[1]);
}

//Turns off the alarm and moves back to the main page
//if all antonym pairs are solved
function alarmStatus() {
    "use strict";
    if (stopper >= 5) {
        //REACTIVATE LATER - document.getElementById("alarm").muted = true;
        location.href="index.html";
    }
}

//Run these after the DOM has loaded (i.e. jQuery document.ready()
$(function() {
    "use strict";
    //Shuffle all of our arrays
    shuffle(droppables);
    shuffle(draggables);
    shuffle(antonyms);
    
    $("#draggable").draggable({ revert: "invalid" });
    $("#draggable2").draggable({ revert: "invalid" });
    $("#draggable3").draggable({ revert: "invalid" });
    $("#draggable4").draggable({ revert: "invalid" });
    $("#draggable5").draggable({ revert: "invalid" });

    //Assign the antonym pairs five times
    for (var i = 0; i <= 4; i++) {
        assignPair();
    }

    $("#alarm").hide();
});
