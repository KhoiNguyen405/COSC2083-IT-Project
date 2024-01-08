/**
 * Function to allow a draggable element to be dropped in the given element.
 * 
 * @param {Event} ev: current ondragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Function to drag a draggable element.
 * 
 * @param {Event} ev: current drag event.
 */
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

/**
 * Function to drop dragged element into a dropzone container.
 * 
 * @param {Event} ev: current drop event.
 */
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if (ev.target.id.includes("dropzone")) {      
        if (ev.target.id.includes("ans-dropzone") && ev.target.children.length != 0) {   // Check if correct spot and is empty
            return;
        } else {
            ev.target.appendChild(document.getElementById(data));
        }
    }
    return;
}

/**
 * Check correctness of current attempt at activity:
 *    - Count score of correct answers;
 *    - Change border colour of answer box to green if correct, red if incorrect;
 *    - Display score of current attemp.
 * 
 * @param {Node} ele: element that called this function.
 */
function checkAnswer(ele) {
    var score = 0;
    var activity_num = ele.parentNode.id;
    var numQ = Number(document.getElementById(activity_num).getAttribute("data-numq"));
    let dropzone_ID;
    let child_el;

    for (let i = 0; i < numQ; i++) {
        dropzone_ID = "ans-dropzone-" + String(i+1);
        child_el = document.getElementById(dropzone_ID).firstElementChild;
        if (child_el != null) {     // Check if a piece of code has been dropped here
            if (child_el.getAttribute("data-answer") == dropzone_ID) {      // Check correctness
                score += 1;
                gradeCorrect(dropzone_ID);
            } else {
                gradeIncorrect(dropzone_ID);
            }
        } else {
            gradeIncorrect(dropzone_ID);
        }
    }
    
    displayScore(score, numQ);
}

/**
 * Display the score of the current attempt at activity.
 * 
 * @param {Number} score: score of current attempt.
 * @param {Number} numQ: max possible score of activity.
 */
function displayScore(score, numQ) {
    document.getElementById("score").style.display='block';
    document.getElementById("score").innerHTML = "Score: " + String(score) + "/" + String(numQ);
    if (Number(score) == numQ) {
        document.getElementById("score").style.border = "2px solid green";
    } else {
        document.getElementById("score").style.border = "2px solid red";
    }
}

/**
 * Change border colour of answer box to green for correct answer.
 * 
 * @param {String} divID: id attribute of answer box.
 */
function gradeCorrect(divID) {
    document.getElementById(divID).style.border = "2px solid green";
}

/**
 * Change border colour of answer box to red for incorrect answer.
 * 
 * @param {String} divID: id attribute of answer box.
 */
function gradeIncorrect(divID) {
    document.getElementById(divID).style.border = "2px solid red";
}

/**
 * Reset activity area to default display:
 *    - Move any draggable element in answer boxes back to starting container;
 *    - Change border colour of answer boxes back to default grey;
 *    - Hide score box.
 * 
 * @param {Node} ele: element that called this function.
 */
function clearDropArea(ele) {
    var activity_num = ele.parentNode.id;
    var numQ = Number(document.getElementById(activity_num).getAttribute("data-numq"));

    // Clear dropzones
    let dropzone_ID;
    let child_el;
    for (let i = 0; i < numQ; i++) {
        dropzone_ID = "ans-dropzone-" + String(i+1);
        child_el = document.getElementById(dropzone_ID).firstChild;
        if (child_el != null) {
            document.getElementById("start-dropzone").appendChild(child_el);
        }
        document.getElementById(dropzone_ID).style.border = "2px solid grey";
    }

    // Clear score box
    document.getElementById("score").style.display='none';
}