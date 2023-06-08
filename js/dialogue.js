const dialogueBox = document.body.querySelector(`.dialogue-box`);
let choiceOne;
let choiceTwo;
let leftLeverActivated = false;
let dialogueClickCount = 0;

let priorityCount = 0;
if (sessionStorage.getItem("dialogCount")) {
    priorityCount = 26;
    sessionStorage.getItem("dialogCount");
    dialogueBox.innerHTML += `Laden...`;
    setTimeout(() => {
        dialogueBox.innerHTML = ``;
        triggerDialogueEvents(priorityCount);
    }, 2500);
} 

//Counter for the typeLetter
let i = 0;

function refreshPage1() {
    dialogueClickCount++;
    if (dialogueClickCount > 1) {
        if (priorityCount > 25) {
            window.location = `room1pt2.html`;
        } else {
            sessionStorage.setItem("dialogCount", JSON.stringify(priorityCount));
            location.reload();
        }
    }
    setTimeout(() => {
        dialogueClickCount--;
    }, 1000);
}

dialogueBox.addEventListener(`click`, refreshPage1);

//Activates when the left lever is flipped, right lever gets flipped after this as the left one does nothing.
function leftLever() {
    choiceOne.removeEventListener(`click`, leftLever, false);
    choiceTwo.removeEventListener(`click`, rightLever, false);
    leftLeverActivated = true;

    slowType(`Je haalde de linker hendel over...`, `event`, 75, 31);
    slowType(`*Er klinkt een luid geluid, maar er gebeurt verder niets*`, `event`, 35, 32);
    slowType(`Quint: “Nou dat heeft lekker gewerkt”`, `quint`, 35, 33);
    slowType(`Omdat er geen andere hendel is, haal je de rechter hendel over.`, `event`, 45, 34);
}

//Activates when the right lever is flipped
function rightLever() {
    choiceOne.removeEventListener(`click`, leftLever, false);
    choiceTwo.removeEventListener(`click`, rightLever, false);

    if (leftLeverActivated == false) {
        priorityCount = priorityCount + 4;
    }

    setTimeout(() => {
        slowType(`Je haalde de rechter hendel over. . .`, `event`, 100, 35);
        slowType(`Een krijsend geluid van metaal tegen metaal vult de stilte in het huisje . . .`, `event`, 75, 36);
        slowType(`En een luide knal volgde snel, waarna Tim naar buiten rende`, `event`, 25, 37);
        slowType(`Tim gilt: “HET IS GELUKT! DE POORT IS OPEN!”`, `tim`, 35, 38);
        slowType(`Quint: “Gelukkig dat er niet iets ergs is gebeurd!”`, `quint`, 35, 39);
        slowType(`Jij en Quint lopen het huisje uit, terug naar de poort.`, `event`, 25, 40);
        slowType(`Wanneer jullie bij de poort aankomen is Tim zenuwachtig aan het rond kijken`, `event`, 35, 41);
        slowType(`Quint: “Wat is er?”`, `quint`, 35, 42);
        slowType(`Tim: “Shair... Hij is ook al verdwenen”`, `tim`, 100, 43);
        slowType(`Quint: “SHAIR OOK AL!??!?”`, `quint`, 25, 44);
        slowType(`Er was een moment van stilte...`, `event`, 100, 45);
        slowType(`Op een moment stel jij voor om naar binnen te gaan.`, `event`, 65, 46);
        slowType(`Tim: “Het kan daar juist gevaarlijker zijn! Kunnen wij niet beter een manier vinden om terug te gaan?”`, `tim`, 25, 47);
        slowType(`Quint: “Iedereen verdwijnt hier buiten, volgens mij zijn wij juist binnen veiliger..”`, `quint`, 35, 48);
        slowType(`Jij knikt ook, zo is het wel beter . . . | Tim kijkt vervolgens teleurgesteld`, `event`, 50, 49);
        slowType(`Tim: “Misschien is het toch wel beter zo.”`, `tim`, 35, 50);
        slowType(`En dus, nadat jullie het allemaal eens zijn, lopen jij en Tim naar binnen, terwijl Quint jullie dicht van achteren volgde.`, `event`, 35, 51);
    }, 1000);
}

function createChoice(optionOne, optionTwo) {
    dialogueBox.innerHTML += `<button class="option-one">${optionOne}</button><button class="option-two">${optionTwo}</button><p></p>`;
    choiceOne = document.querySelector(`.option-one`);
    choiceTwo = document.querySelector(`.option-two`);

    choiceOne.addEventListener(`click`, leftLever);
    choiceTwo.addEventListener(`click`, rightLever);
}





//All dialogues are inserted into this function, they will wait until its their turn
function slowType(text, person, timeOut, priorityNumber) {
    person = person.toLowerCase();
    textColor = person;

    if (priorityCount == priorityNumber) {
        //Change this querySelector to place the dialogues elsewhere
        const dialogueBox = document.querySelector(`.dialogue-box`);
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
            triggerDialogueEvents(priorityNumber);
        }
    }, timeOut);
}

//All events automatically triggered by dialogues
function triggerDialogueEvents(dialogueNumber) {
    const closedGateImage = document.querySelector('.image1');
    if (dialogueNumber < 26) {
        if (dialogueNumber == 7) {
            setTimeout(() => {
                closedGateImage.style.backgroundImage = 'url(/img/closedgate.jpg)';
                slowType(`Jullie komen aan bij de poort van de gevangenis, maar die is dicht.`, `event`, 25, 8);
                slowType(`Shair: “Dit was een lange loop, is iedereen er nog?” `, `shair`, 35, 9);
                slowType(`Quint: “Ja ik zie Tim en jou”`, `quint`, 35, 10);
                slowType(`Tim: “Waar is Arda, Die liep toch achter jou Shair?”  `, `tim`, 35, 11);
                slowType(`Shair: “Ja die liep achter mij. Ik weet ook niet waar hij heen is gegaan. We gaan hem wel even zoeken.” `, `shair`, 25, 12);
            }, 1000);
        } else if (dialogueNumber == 12) {
            setTimeout(() => {
                slowType(`Jullie gaan terug in het bos om hem te zoeken      `, `event`, 50, 13);
                closedGateImage.style.backgroundImage = 'url(/img/image-island.png)';
            }, 1500);
        } else if (dialogueNumber == 13) {
            slowType(`Maar jullie kunnen hem niet vinden. . .  `, `event`, 150, 14);
        } else if (dialogueNumber == 14) {
            setTimeout(() => {
                closedGateImage.style.backgroundImage = 'url(/img/opendoorgate.png)';
                slowType(`Jullie gaan weer naar de poort en zien dat hij een stukje open is gegaan terwijl jullie gingen zoeken in het bos.   `, `event`, 35, 15);
                slowType(`Quint: “De poort is open gegaan hoe kan dat nou weer..?”`, `quint`, 35, 16);
                slowType(`Tim: “Ik weet het ook niet, maar laten we gewoon naar binnen gaan” `, `tim`, 35, 17);
                slowType(`Shair: “Ja we gaan wel maar wel gek dat Arda weg is en ook ineens die poort open is” `, `shair`, 35, 18);
            }, 1000);
        } else if (dialogueNumber == 18) {
            closedGateImage.style.backgroundImage = 'url(/img/closedgate.jpg)';
            slowType(`Jullie lopen door de poort en kijken om jullie heen en zien hele hoge hekken met schrikkeldraad er boven op. ||
        Jullie komen aan bij een tweede poort...`, `event`, 35, 19);
            slowType(`EN PLOTSELING HOREN JULLIE EEN KEIHARDE KLAP VAN ACHTEREN`, `event`, 15, 20);
        } else if (dialogueNumber == 20) {
            setTimeout(() => {
                slowType(`Tim: “WAT WAS DAT?!”`, `tim`, 45, 21);
                slowType(`Shair: “De poort is dichtgeslagen!”`, `shair`, 30, 22);
                slowType(`Tim: “De tweede poort is ook dicht! We moeten een manier zoeken om deze open te krijgen.” `, `tim`, 25, 23);
                slowType(`Quint: “Ik zie daar een bewakershuisje, waarschijnlijk is daar iets om de poort mee open te maken. 
            Tim en ik gaan wel naar dat huisje en dan blijf jij op de wacht Shair is dat goed?” `, `quint`, 25, 24);
                slowType(`Shair: “Ja dat is goed, maar jullie moeten wel opschieten, want wil hier eigenlijk niet alleen zijn. Dus tempo!” `, `shair`, 45, 25);
            }, 1500);
        } else if (dialogueNumber == 25) {
            setTimeout(() => {
                refreshPage1();
            }, 10000);
        }
    }

    if (dialogueNumber > 25) {
        if (dialogueNumber == 26) {
            slowType(`Je loopt het huisje binnen met Quint en Tim. Nu je er over denkt, het is best gek dat je vrienden bijna geen aandacht voor jou hebben.`, `event`, 40, 26);
            slowType(`Plotseling voel je een tik op je schouder`, `event`, 40, 27);
        } else if (dialogueNumber == 27) {
            i = 0;
            slowType(`Quint: “Hee, was je even van de wereld?”`, `quint`, 40, 28);
            slowType(`Quint: “Er zijn hier twee hendels in het huisje, ik en Tim komen er niet uit, dus kan jij kiezen”?`, `quint`, 25, 29);
            slowType(`Er zijn twee hendels in het huisje, wil je de linker hendel of de rechter hendel omhalen?`, `event`, 30, 30);
        } else if (dialogueNumber == 30) {
            setTimeout(() => {
                createChoice(`Linker hendel`, `Rechter hendel`);
            }, 500);
        } else if (dialogueNumber == 34 && leftLeverActivated == true) {
            setTimeout(() => {
                rightLever();
            }, 500);
        }
    }
}


//Diologue Starter
if (priorityCount == 0) {
    setTimeout(() => {
        slowType(`*Geluiden van een motorboot* || Jij met je 5 vrienden komen aan op het eiland Alcatraz.`, `event`, 75, 0);
        slowType(`Arda: “Eyy, Dit ziet er ziek uit!”`, `arda`, 35, 1);
        slowType(`Quint: “Echt een tof idee om hierheen te gaan”`, `quint`, 35, 2);
        slowType(`Arda: “Laten we maar verder gaan, hier zullen wij weinig beleven!” `, `arda`, 25, 3);
        slowType(`Henry: “Ik blijf wel achter bij de motorboot, mijn vader wordt woedend als er iets mee gebeurt..”`, `henry`, 25, 4);
        slowType(`Tim: “Jammer, maar oké, je zult echt wel wat missen Henry!” `, `tim`, 35, 5);
        slowType(`Shair: “Laten wij maar gaan, dit begint saai te worden” `, `shair`, 35, 6);
        slowType(`Jullie lopen verder richting de hoofdingang van de gevangenis op het eiland Alcatraz, | jullie nemen een pad dat door een beschaduwd bos loopt.`, `event`, 25, 7);
    }, 1000);
}