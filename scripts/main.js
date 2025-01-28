"use strict";

// npx http-server -o -p 9999
// taskkill /f /im node.exe


let currentShowingDetails;
let activeGame;

// Header Menu Button

const headerMenuButton = document.getElementById('headerMenuButton')
const headerMenuContent = document.getElementById('headerMenuContent')

headerMenuButton.addEventListener("click", () => {
    if (headerMenuButton.textContent === "≡") {
        headerMenuButton.textContent = "✖";
        headerMenuContent.style.display = "block";
        headerMenuContent.style.font-size = "1.5rem";
    } else {
        headerMenuButton.textContent = "≡"
        headerMenuContent.style.display = "none"
        headerMenuContent.style.font-size = "2rem";
    }
})

const gameListings = document.getElementsByClassName('gameListing')

console.log(gameListings)
for (let game of gameListings) {
    console.log(game.id + " activated.");
    game.addEventListener("click", (event) => {
        let gameTitle = event.target.id.slice(0, event.target.id.length - 7);
        listingClicked(gameTitle);
      });
}

/*
function randomizeHeaderContent() {
    fetch("http://127.0.0.1:9999/scripts/headerFiller.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((res) => {
            
        document.getElementById("headerContent").textContent = res[Math.floor(Math.random() * res.length)];

        })
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}
randomizeHeaderContent();
*/

const listingHeader = document.getElementById('gameListHeader')

function listingClicked (selectedGame) {
    for (let i of listingHeader.classList) {
        listingHeader.classList.remove(i);
    }
    console.log(selectedGame + " selected.")

    let selectedGameDetails;
    if (!document.getElementById(selectedGame + 'Details')) {
        selectedGameDetails = document.getElementById('missingDetails');
    }
    else {
        selectedGameDetails = document.getElementById(selectedGame + 'Details');
    }

    if (activeGame === selectedGame) {
        selectedGameDetails.style.display = "none";

        listingHeader.classList.add("animation-gameListHeaderFade")

        activeGame = false;
        setTimeout(() => {listingHeader.textContent = ""},300)
        return
    }
    
    if (activeGame) {
        if (document.getElementById(activeGame + 'Details')) {
        document.getElementById(activeGame + 'Details').style.display = "none";
        } 
        else {
            document.getElementById('missingDetails').style.display= "none";
        }
    }

    // Display Selected Game Details
    selectedGameDetails.style.display = "block";
    activeGame = selectedGame;
    setTimeout(() => {listingHeader.classList.add("animation-gameListHeaderFlash")},10)
    setTimeout(() => {listingHeader.textContent = selectedGame.toUpperCase()},200)
};