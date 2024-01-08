function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
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

function checkAnswer(ele) {
    var score = 0;
    var activity_num = ele.parentNode.id;
    var numQ = document.getElementById(activity_num).getAttribute("data-numq");
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

function displayScore(score, numQ) {
    document.getElementById("score").style.display='block';
    document.getElementById("score").innerHTML = "Score: " + String(score) + "/" + String(numQ);
    if (Number(score) == numQ) {
        document.getElementById("score").style.border = "2px solid green";
    } else {
        document.getElementById("score").style.border = "2px solid red";
    }
}

function gradeCorrect(divID) {
    document.getElementById(divID).style.border = "2px solid green";
}

function gradeIncorrect(divID) {
    document.getElementById(divID).style.border = "2px solid red";
}

function clearDropArea(ele) {
    var activity_num = ele.parentNode.id;
    var numQ = document.getElementById(activity_num).getAttribute("data-numq");

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