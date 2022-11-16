console.log(`goed geladen`);
const dialogueBox = document.querySelector(`.dialogue-box`);
let i = 0;
let priorityCount = 0;

//All dialogues are inserted into this function, they will wait until its their turn
function slowType(text, person, timeOut, priorityNumber) {
    person = person.toLowerCase();
    textColor = person;

    if (priorityCount == priorityNumber) {
        //Change this querySelector to place the dialogues elsewhere
        dialogueBox.innerHTML += `<span class="${person}-text priority-${priorityNumber}">`;
        const currentSpan = document.querySelector(`.priority-${priorityNumber}`);
        //Launches function when the priority is right
        i = 0;
        typeLetter(text, timeOut, dialogueBox, currentSpan, priorityNumber);
    } else if (priorityNumber > priorityCount) {
        setTimeout(() => {
            slowType(text, person, timeOut, priorityNumber);
        }, 3000);
    }
}

//This function types letters by letters used by given text, it also has a short delay which is the timeout. 
function typeLetter(text, timeOut, dialogueBox, currentSpan, priorityNumber) {

    setTimeout(() => {
        let addLetter = text.charAt(i);
        if (addLetter === '|') {
            addLetter = '<br>';
        }

        currentSpan.innerHTML += addLetter;
        i++;

        if (i < text.length) {
            typeLetter(text, timeOut, dialogueBox, currentSpan, priorityNumber);
        } else {
            dialogueBox.innerHTML += `</span><p></p>`;
            i = 0;
            priorityCount++;
        }
    }, timeOut);
}



setTimeout(() => {
    document.querySelector(".dialogue-box").classList.remove("invisible");
    slowType(`|`, `death`, 1000, 0);
    slowType(`Je bent doodgegaan`, `death`, 200, 1);
}, 22000);