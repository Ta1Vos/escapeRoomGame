console.log('Game loaded!');

//clears sessionStorage
sessionStorage.clear();


let i = 0;
let writing = false;
let priorityCount = 0;
let diologueWriting = true;

let skipClickCount = 0;
const dialogueBox = document.querySelector(`.intro-box`);

//Function creates a single value to avoid unnecessary value creation
/* Function slowly types in letters by using parameters: the text that should be placed, the time each letter takes to be placed 
and in which class it should be placed. */
function slowType(text, time, className, priorityNumber) {
    if (document.querySelector(`.${className}`) && writing == false && priorityNumber == priorityCount) {
        element = document.querySelector(`.${className}`);
        writing = true;
        typeLetter(text, time, element);
    } else if (writing == true || priorityNumber != priorityCount) {
        setTimeout(() => {
            slowType(text, time, className, priorityNumber);
        }, 2500);
    }
}

//This function takes one dialog and plays the letter animation of it, the function slowType makes sure the dialogs are started in order.
function typeLetter(text, time, element) {
    setTimeout(() => {
        let addLetter = text.charAt(i);
        if (addLetter === '|') {
            addLetter = '<br>';
        }

        element.innerHTML += addLetter;
        i++;

        if (i < text.length && diologueWriting == true) {
            typeLetter(text, time, element);
        } else {
            element.innerHTML += `<br>`;
            diologueWriting = true;
            i = 0;
            writing = false;
            priorityCount++;
            if (priorityCount == 1) {
                dialogueBox.classList.remove("invisible");
            } else if (priorityCount == 2) {
                skipClickCount = 1;
            }
        }
    }, time);
}

//Current skip button for the animated text at dialogue 1 in this file.
function skipButton() {
    const buttonElement = document.querySelector(`.dialogue-text`);
    diologueWriting = false;
    setTimeout(() => {
        buttonElement.innerHTML = `<p>Bij een plek dat 2 km is verwijderd van de kust van San Francisco, is een eiland genaamd Alcatraz, 
        dat ook wel De Rots wordt genoemd.
        Op dit eiland is ongeveer een eeuw geleden een gevangenis gebouwd genaamd United States Penitentiary. 
        Dit is een maximaal beveiligde gevangenis waar de gevaarlijkste criminelen van Amerika naartoe werden gestuurd, 
        sommigen ook met de doodstraf.</p>
        
        <p>Deze gevangenis is bekend om de beveiliging die het onmogelijk maakt om te ontsnappen uit deze gevangenis, 
        vol met vallen en puzzels waar alleen de bewakers oplossingen van hadden, en de gedetineerden niet. Als je toch zou ontsnappen, 
        had je ook nog de zee om je heen die jou zo de dood inleidt. </p>
        
        <p>In 1963 wordt de gevangenis gesloten door de werkelijke gruwelijke daden die hier werden gepleegd, 
        van zelf moorden tot moorden op bewakers. De gevaarlijke vallen waarin toch, ondanks zij ervan afwisten, de bewakers in trapten. </p> 
        
        <p>De gedetineerden werden als beesten afgemaakt toen de gevangenis sloot, op onmenselijke en martelende manieren. 
        Daarna werd de gevangenis met daarbij het eiland Alcatraz, achtergelaten met de gruwelijke geschiedenis 
        en de rottende lijken van de gedetineerden, allemaal om in de vergetelheid te vallen.</p>`;
    }, 45);
    skipClickCount++;
    if (skipClickCount == 2) {
        window.location = `/html/rooms/room1.html`;
    }
}

dialogueBox.addEventListener(`click`, skipButton);

// use "|" to put a br
slowType(`28/07/2022, 21:49:23 | Alcatraz Island, US`, 150, `green-text`, 0);

slowType(`Bij een plek dat 2 km is verwijderd van de kust van San Francisco, is een eiland genaamd Alcatraz, 
dat ook wel De Rots wordt genoemd. |
Op dit eiland is ongeveer een eeuw geleden een gevangenis gebouwd genaamd United States Penitentiary. 
Dit is een maximaal beveiligde gevangenis waar de gevaarlijkste criminelen van Amerika naartoe werden gestuurd, 
sommigen ook met de doodstraf. ||

Deze gevangenis is bekend om de beveiliging die het onmogelijk maakt om te ontsnappen uit deze gevangenis, 
vol met vallen en puzzels waar alleen de bewakers oplossingen van hadden, en de gedetineerden niet. Als je toch zou ontsnappen, 
had je ook nog de zee om je heen die jou zo de dood inleidt. ||

In 1963 wordt de gevangenis gesloten door de werkelijke gruwelijke daden die hier werden gepleegd, 
van zelf moorden tot moorden op bewakers. De gevaarlijke vallen waarin toch, ondanks zij ervan afwisten, de bewakers in trapten. ||

De gedetineerden werden als beesten afgemaakt toen de gevangenis sloot, op onmenselijke en martelende manieren. 
Daarna werd de gevangenis met daarbij het eiland Alcatraz, achtergelaten met de gruwelijke geschiedenis 
en de rottende lijken van de gedetineerden, allemaal om in de vergetelheid te vallen.
`, 45, `dialogue-text`, 1);