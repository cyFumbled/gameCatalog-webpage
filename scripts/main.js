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

let gameListings__passedThroughQuery = [].slice.call(document.getElementsByClassName("gameListing"));
let gameListings__passedThroughFilters = [].slice.call(document.getElementsByClassName("gameListing"));
let gameListings__filtersEnabled = [];


async function updateListingDisplays() {
    console.warn("querypass: " + gameListings__passedThroughQuery)
    console.warn("filterpass: " + gameListings__passedThroughFilters)
    for (let i = 0; i < gameListings.length; i++) {
        if (gameListings__passedThroughQuery.includes(gameListings[i]) && gameListings__passedThroughFilters.includes(gameListings[i])) {
            gameListings[i].style.display = "inline";
        }
        else {
            gameListings[i].style.display = "none";
        }
    }

}

document.getElementById("gameListHeader__searchInput").onkeydown = function(e){
    var keyCode = e.code || e.key;

    // When the Shift DEBUG DONT WRITE NOTES PUNK
    if (keyCode == 'ShiftLeft'){
        console.log(gameListings__passedThroughFilters)
        if (!gameListings__filtersEnabled.includes("hasDetails")) {
            gameListings__filtersEnabled.push("hasDetails");
            gameListings__passedThroughFilters = [document.getElementById("splatoonListing")]
        }
        else {
            gameListings__filtersEnabled.splice(gameListings__filtersEnabled.indexOf("hasDetails"),1)
            gameListings__passedThroughFilters = [].slice.call(document.getElementsByClassName("gameListing"))
        }
        updateListingDisplays();
    }

    // When the Enter key is pressed in the Game List search box, activate the nearest showing listing.
    else if (keyCode == 'Enter'){
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

        console.log("gameListings: " + gameListings[0].id)
        for (let i = 0; i < gameListings.length; i++) {
            const gameTitle = gameListings[i].id.toUpperCase().slice(0, gameListings[i].id.length - 7).replace(/\s/g, "");
            const inputValue = document.getElementById("gameListHeader__searchInput").value.toUpperCase().replace(/\s/g, "");
            if (gameTitle.includes(inputValue)) {
                if (!gameListings__passedThroughQuery.includes(gameListings[i])) {
                    gameListings__passedThroughQuery.push(gameListings[i])
                }
            }
            else {
                if (gameListings__passedThroughQuery.includes(gameListings[i])) {
                    console.log("test splice")
                    gameListings__passedThroughQuery.splice(gameListings__passedThroughQuery.indexOf(gameListings[i]),1)
                }
            }
        }
        updateListingDisplays()
});

document.getElementById("gameListHeader__filterWrapper").addEventListener("click", () => {
    let filterIcon_unfocused = document.getElementById("gameListHeader__filterIcon-unfocused");
    let filterIcon_focused = document.getElementById("gameListHeader__filterIcon-focused");
    
    if (filterIcon_unfocused.style.display === "none") {
        filterIcon_focused.style.display = "none"
        filterIcon_unfocused.style.display = "inline"

        gameListings__filtersEnabled.splice(gameListings__filtersEnabled.indexOf("hasDetails"),1)
        gameListings__passedThroughFilters = [].slice.call(document.getElementsByClassName("gameListing"))

    } else {
        filterIcon_focused.style.display = "inline"
        filterIcon_unfocused.style.display = "none"

        gameListings__filtersEnabled.push("hasDetails");
        gameListings__passedThroughFilters = [document.getElementById("splatoonListing")]
    }
    updateListingDisplays();
})
