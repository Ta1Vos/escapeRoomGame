const keypadKeyLocation = document.querySelector(`.keypad-keys`);
const keypadScreen = document.querySelector(`.screen`);
let currentCode = [];
let codeLimit = 4;
let keypadLives = 3;

let openOtherRooms = false;
let rightCode = false;

//Sessionstorage Loaders
if (sessionStorage.getItem('openRooms')) {
    openOtherRooms = true;
    codeLimit = 8;
}


if (sessionStorage.getItem('keypadLives')) {
    keypadLives = sessionStorage.getItem('keypadLives');
    if (keypadLives < 0) {
        keypadLives = 0;
    } 
    
    if (keypadLives == 0) {
        deathScreen();
    }
}

function deathScreen() {
    document.querySelector(".button-deactivation").classList.add("invisible");
    document.querySelector(".secret-button").classList.add("invisible");
    keypadScreen.textContent = `•`;
    //Blocks the keypad and redirects further to game
    setTimeout(() => {
        keypadScreen.textContent = ``;
        setTimeout(() => {
            keypadScreen.textContent = `Blokkeren...`;
            setTimeout(() => {
                keypadScreen.textContent = `Code is geblokkerd`;
                setTimeout(() => {
                    keypadScreen.textContent = `Val activeren..`;
                }, 2000);
            }, 3000);
        }, 500);
    }, 500);
    setTimeout(() => {
        setTimeout(() => {
            window.location = `roomdead.html`;
        }, 8500);
    }, 3500);
}

function keypadCode(event) {
    rightCode = false;
    event.target.style.backgroundColor = "darkgreen";
    event.target.style.color = "lime";

    //places numbers in the screen
    document.querySelector(".screen").textContent += event.target.textContent;

    if (currentCode.length >= codeLimit || event.target.textContent == `*`) {
        if (openOtherRooms == false) {
            if (currentCode[0] == 4 && currentCode[1] == 4 && currentCode[2] == 8 && currentCode[3] == 5) {
                //Correct code
                keypadScreen.textContent = `Code is juist`;
                keypadKeyLocation.removeEventListener("click", keypadCode);
                openOtherRooms = true;
                //Saves the sessionStorage to open the other rooms
                sessionStorage.setItem("openRooms", JSON.stringify(openOtherRooms));
                rightCode = true;
                currentCode = [];
            }
        } else if (openOtherRooms == true) {
            //Code is only activated once the sessionStorage openRooms is active
            if (currentCode[0] == 5 && currentCode[1] == 5 && currentCode[2] == 3 && currentCode[3] == 8) {
                if (currentCode[4] == 9 && currentCode[5] == 9 && currentCode[6] == 7 && currentCode[7] == 3) {
                    //Correct code
                    keypadScreen.textContent = `Code is juist`;
                    keypadKeyLocation.removeEventListener("click", keypadCode);
                    rightCode = true;
                    currentCode = [];
                    setTimeout(() => {
                        keypadScreen.textContent = `Uitgang openen...`;
                        setTimeout(() => {
                            window.location = `roomend.html`;
                        }, 2500);
                    }, 2500);
                }
            }
        }

        if (rightCode == false) {
            keypadLives--;
            sessionStorage.setItem("keypadLives", JSON.stringify(keypadLives));

            rightCode = false;
            keypadScreen.textContent = `Code is onjuist`;
            keypadKeyLocation.removeEventListener("click", keypadCode);
            setTimeout(() => {

                if (keypadLives == 2) {
                    keypadScreen.textContent = `• • •`;
                    setTimeout(() => {
                        keypadScreen.textContent = `• •`;
                    }, 1000);
                } else if (keypadLives == 1) {
                    keypadScreen.textContent = `• •`;
                    setTimeout(() => {
                        keypadScreen.textContent = `•`;
                    }, 1000);
                } else if (keypadLives == 0) {
                    deathScreen();
                }
                //Resets the keypad to default
                if (keypadLives > 0) {
                    setTimeout(() => {
                        keypadKeyLocation.addEventListener("click", keypadCode);
                        currentCode = [];
                        keypadScreen.textContent = ``;
                    }, 2000);
                }
            }, 2500);
        }
    } else {
        currentCode.push(event.target.textContent);
    }

    setTimeout(() => {
        event.target.style.backgroundColor = "white";
        event.target.style.color = "black";
    }, 1500);
}


//This line adds an eventListener to the entire class named keypad-keys, any element within this element becomes clickable
if (keypadLives > 0) {
    keypadKeyLocation.addEventListener("click", keypadCode);
}