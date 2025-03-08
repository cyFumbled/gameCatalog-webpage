"use strict";

// npx http-server -o -p 9999
// taskkill /f /im node.exe

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

let activeGame;

function listingClicked(selectedGame) {
    console.log(selectedGame + " selected.")
    let detailsHeader = document.getElementById('gameDetails__header');


    // IF THE GAME WAS ALREADY PRESENT, HIDE DETAILS, FADE, WIPE TITLE, AND RETURN.
    if (activeGame === selectedGame) {
        detailsHeader.classList.remove("animation-gameListHeaderFlash");
        document.getElementById("gameDetails__iframe").style.visibility = "hidden";
        detailsHeader.classList.add("animation-gameListHeaderFade")
        document.getElementById("gameDetails__title").textContent = null;

        activeGame = null;
        return
    }
    detailsHeader.classList.remove("animation-gameListHeaderFade")

    // FLASH HEADER
    setTimeout(() => {
        detailsHeader.classList.remove("animation-gameListHeaderFlash");
        detailsHeader.offsetHeight;
        detailsHeader.classList.add("animation-gameListHeaderFlash")
    },0); 

    // SHOW GAME TITLE ON DETAILS HEADER
    document.getElementById("gameDetails__title").textContent = document.getElementById(selectedGame + "Listing").title;

    // DISPLAY SELECTED GAME DETAILS
    let gamesWithPages = ["splatoon"];
    if (gamesWithPages.includes(selectedGame)) {
        document.getElementById("gameDetails__iframe").src = "../detailPages/" + selectedGame + ".html";
    } else {
        document.getElementById("gameDetails__iframe").src = "../detailPages/missing.html";
    }
    document.getElementById("gameDetails__iframe").style.visibility = "visible";
    activeGame = selectedGame;
};

// GAME LIST HEADER

// If any section of the search wrapper is clicked, focus the text input.
document.getElementById("gameListHeader__searchWrapper").addEventListener("click", () => {
    document.getElementById("gameListHeader__searchInput").focus();
})

document.getElementById("gameListHeader__searchInput").addEventListener("focus", () => {
    document.getElementById("gameListHeader__searchIcon").style.filter = "brightness(200%)";
})
document.getElementById("gameListHeader__searchInput").addEventListener("focusout", () => {
    document.getElementById("gameListHeader__searchIcon").style.filter = "brightness(100%)";
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

    // When the Enter key is pressed in the Game List search box, activate the nearest showing listing.
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

// When the game list filter button is clicked, expand the filter drop down
document.getElementById("gameListHeader__filterWrapper").addEventListener("click", () => {
    let filterIcon_unfocused = document.getElementById("gameListHeader__filterIcon-unfocused");
    let filterIcon_focused = document.getElementById("gameListHeader__filterIcon-focused");
    const header = document.getElementById("gameListHeader__root");
    const list = document.getElementById("gameListContentContainer");
    const expandedHeader = document.getElementById("gameListHeader__expandedWrapper");

    
    if (filterIcon_unfocused.style.display === "none") {
        filterIcon_focused.style.display = "none";
        filterIcon_unfocused.style.display = "inline";
        header.style.height = null;
        list.style["padding-bottom"] = "calc(100vh - 164px)";
        expandedHeader.style.display= "none";
    } else {
        filterIcon_focused.style.display = "inline"
        filterIcon_unfocused.style.display = "none"
        header.style.height = "100px";
        list.style["padding-bottom"] = "calc(100vh - 204px)"
        expandedHeader.style.display= "flex";
    }
})

// Show the user how the filter menu works with automation
setTimeout(() => { 
    document.getElementById("gameListHeader__hasDetailsCheckbox").checked = false;
}, 0)
setTimeout(() => {
    document.getElementById("gameListHeader__filterIcon-focused").style.display = "inline"
    document.getElementById("gameListHeader__filterIcon-unfocused").style.display = "none"
    document.getElementById("gameListHeader__root").style.height = "100px";
    document.getElementById("gameListContentContainer").style["padding-bottom"] = "calc(100vh - 204px)"
    document.getElementById("gameListHeader__expandedWrapper").style.display= "flex";
}, 400)
setTimeout(() => {
    document.getElementById("gameListHeader__hasDetailsCheckbox").checked = true;

    gameListings__filtersEnabled.push("hasDetails");
    gameListings__passedThroughFilters = [document.getElementById("splatoonListing")]
    updateListingDisplays();
}, 800)

document.getElementById("gameDetails__iframe").style.visibility = "hidden";

// When the "only games with details" slider changes position, 
document.getElementById("gameListHeader__hasDetailsCheckbox").addEventListener("change", () => {
    console.log(document.getElementById("gameListHeader__hasDetailsCheckbox").checked)
    if (document.getElementById("gameListHeader__hasDetailsCheckbox").checked) {
        gameListings__filtersEnabled.push("hasDetails");
        gameListings__passedThroughFilters = [document.getElementById("splatoonListing")]
    }
    else {
        gameListings__filtersEnabled.splice(gameListings__filtersEnabled.indexOf("hasDetails"),1)
        gameListings__passedThroughFilters = [].slice.call(document.getElementsByClassName("gameListing"))
    }
    updateListingDisplays();
})