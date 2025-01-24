"use strict";

let currentShowingDetails;
let activeGame;
const listingHeader = document.getElementById("gameListHeader")
const gameListings = document.getElementsByClassName('gameListing')

console.log(gameListings)
for (let game of gameListings) {
    console.log(game.id + " activated.");
    game.addEventListener("click", (event) => {
        let gameTitle = event.target.id.slice(0, event.target.id.length - 7);
        listingClicked(gameTitle);
      });
}


function listingClicked (selectedGame) {
    for (let i of listingHeader.classList) {
        listingHeader.classList.remove(i);
    }
    console.log(selectedGame + " selected.")
    let selectedGameDetails = document.getElementById(selectedGame + 'Details');

    if (activeGame === selectedGame) {
        selectedGameDetails.style.display = "none";
        selectedGameDetails.classList.remove("animation-detailHeightRender");

        listingHeader.classList.add("animation-gameListHeaderFade")

        activeGame = false;
        setTimeout(() => {listingHeader.textContent = ""},300)
        return
    }
    
    if (activeGame) {
        document.getElementById(activeGame + 'Details').style.display = "none";
    }

    // Display Selected Game Details
    selectedGameDetails.classList.add("animation-detailHeightRender");
    selectedGameDetails.style.display = "block";
    activeGame = selectedGame;
    setTimeout(() => {listingHeader.classList.add("animation-gameListHeaderFlash")},10)
    setTimeout(() => {listingHeader.textContent = selectedGame.toUpperCase()},200)
};