import { Controller } from "./controller/controller.js";
import { MENUS } from "./model/data/constants.js";

///////////////////////////////////////////////////
// Main Code

document.addEventListener("DOMContentLoaded", () => {
    // Create the controller
    let controller = new Controller();

    // Main menu buttons
    document.getElementById("rifts-menu-button").addEventListener("click", () => {
        controller.openNewMenu(MENUS.RIFTS);
    });

    document.getElementById("player-menu-button").addEventListener("click", () => {
        controller.openNewMenu(MENUS.PLAYER);
    });

    // Clicking the button already displays the modal by itself. We add this event so it also automatically updates the display with correct values
    // NOTE: It's possible this may show incorrect values given certain circumstances until they are correctly updated, so a better way to do this would be ideal
    document.getElementById("player-level-up-info").querySelector("button[name=level-up-button]").addEventListener("click", controller.updateLevelUpPlayerModal);
    
    document.getElementById("level-up-player-button").addEventListener("click", controller.levelUpPlayer);

    document.getElementById("level-up-rift-button").addEventListener("click", controller.levelUpRift);
})