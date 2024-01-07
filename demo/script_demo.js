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
        ev.target.appendChild(document.getElementById(data));
    }
    return;
}

function checkAnswer(numQ) {
    var score = 0;
    let code_ID;
    let dropzone_ID;
    let child_el;
    for (let i = 0; i < numQ; i++) {
        code_ID = "correct-code-" + String(i+1);
        dropzone_ID = "ans-dropzone-" + String(i+1);
        child_el = document.getElementById(dropzone_ID).firstElementChild;
        if (child_el != null) {
            if (child_el.id == code_ID) {
                score += 1;
                gradeCorrect(dropzone_ID);
            } else {
                gradeIncorrect(dropzone_ID);
            }
        } else {
            gradeIncorrect(dropzone_ID);
        }
    }
    
    displayScore(score);
}

function displayScore(score) {
    document.getElementById("score").style.display='block';
    document.getElementById("score").innerHTML = "Score: " + String(score) + "/5";
}

function gradeCorrect(divID) {
    document.getElementById(divID).style.border = "2px solid green";
    document.getElementById("score").style.border = "2px solid green";
}

function gradeIncorrect(divID) {
    document.getElementById(divID).style.border = "2px solid red";
    document.getElementById("score").style.border = "2px solid red";
}

function clearDropArea() {
    
}