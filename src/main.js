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

    // NOTE: By the time this is hit, the element should be created, since it happens in the controller's constructor
    // Assign the generate Tier1 Resource function to every Rift
    document.getElementById("resources-generation").querySelectorAll(".clickable").forEach(image => {
        // Assign the function that generates the resource
        image.addEventListener("click", controller.generateTier1Resource, false);
        // Store the parameters we need so the event can access them
        // Grab the parent element that has this Rift's associated Resource and assign it
        image.resourceClicked = image.closest(".resource-generation").dataset.resource;
    })

    document.getElementById("resources-generation").querySelectorAll("button[name='level-up-button']").forEach(button => {
        button.addEventListener("click", controller.openRiftLevelUpModal, false);
        button.resourceClicked = button.closest(".resource-generation").dataset.resource;
    })

    document.getElementById("modal-button-check-successful").addEventListener("click", controller.handleModalSuccessButton);
})