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
    //listingHeader.textContent = selectedGame.toUpperCase();

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

// GAME LIST HEADER

// If any section of the search wrapper is clicked, focus the text input.
document.getElementById("gameListHeader__searchWrapper").addEventListener("click", () => {
    document.getElementById("gameListHeader__searchInput").focus();
})

// When the Enter key is pressed in the Game List search box, activate the nearest showing listing.
document.getElementById("gameListHeader__searchInput").onkeydown = function(e){
    var keyCode = e.code || e.key;
    if (keyCode == 'Enter'){
        let i = 0;
        while (true) {
            if (!document.getElementsByClassName("gameListing")[i]) {
                break;
            }
            if (document.getElementsByClassName("gameListing")[i].style.display !== "none") {
                listingClicked(document.getElementsByClassName("gameListing")[i].id.slice(0, document.getElementsByClassName("gameListing")[i].id.length - 7))
                break;
            }
            i++;
        }   
    }
  }

// Whenever the text input content is altered, resort the game listings into showing and hiding. 
document.getElementById("gameListHeader__searchInput").addEventListener("input", () => {
    console.log("game list query: " + document.getElementById("gameListHeader__searchInput").value);
    document.getElementById("gameListHeader__searchInput").value = document.getElementById("gameListHeader__searchInput").value.toUpperCase(); 

    setTimeout(() => {
        let gameListings = document.getElementsByClassName("gameListing");
        for (let i = 0; i < gameListings.length; i++) {
            const gameTitle = gameListings[i].id.toUpperCase().slice(0, gameListings[i].id.length - 7).replace(/\s/g, "");
            const inputValue = document.getElementById("gameListHeader__searchInput").value.toUpperCase().replace(/\s/g, "");

            if (gameTitle.includes(inputValue)) {
                gameListings[i].style.display = "inline";
            }
            else {
                gameListings[i].style.display = "none";
            }
        }
    },0)
});