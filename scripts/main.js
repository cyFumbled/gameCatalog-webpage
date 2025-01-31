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
        headerMenuContent.style["font-size"] = "1.5rem";
    } else {
        headerMenuButton.textContent = "≡"
        headerMenuContent.style.display = "none"
        headerMenuContent.style["font-size"] = "2rem";
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

let scheduledHeaderTitle;

function listingClicked(selectedGame) { 
    console.log(selectedGame + " selected.")
    let listingHeader = document.getElementById('gameListHeader');

    // FLASH HEADER
    setTimeout(() => {
        listingHeader.classList.remove("animation-gameListHeaderFlash");
        listingHeader.offsetHeight;
        listingHeader.classList.add("animation-gameListHeaderFlash")
    },0);


    // DISPLAY HEADER TEXT (GAME TITLE)
    listingHeader.textContent = selectedGame.toUpperCase();

    let selectedGameDetails;
    if (!document.getElementById(selectedGame + 'Details')) {
        selectedGameDetails = document.getElementById('missingDetails');
    }
    else {
        selectedGameDetails = document.getElementById(selectedGame + 'Details');
    }

    // IF THE GAME WAS ALREADY PRESENT, HIDE DETAILS, FADE, AND RETURN.
    if (activeGame === selectedGame) {
        selectedGameDetails.style.display = "none";
        listingHeader.classList.add("animation-gameListHeaderFade")

        activeGame = false;
        return
    }
    listingHeader.classList.remove("animation-gameListHeaderFade")
    
    // IF A GAME WAS PRESENT, HIDE THEIR DETAILS
    if (activeGame) {
        if (document.getElementById(activeGame + 'Details')) {
        document.getElementById(activeGame + 'Details').style.display = "none";
        } 
        else {
            document.getElementById('missingDetails').style.display= "none";
        }
    }

    // DISPLAY SELECTED GAME DETAILS
    selectedGameDetails.style.display = "block";
    activeGame = selectedGame;
};