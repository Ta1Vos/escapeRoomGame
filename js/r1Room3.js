let openOtherRooms;
if (sessionStorage.getItem('openRooms')) {
    document.body.innerHTML += `<a href="/html/rooms/room4.html"><button class="navigation-button">Volgende Kamer</button></a>`
} else {
    console.log(`false`);
}