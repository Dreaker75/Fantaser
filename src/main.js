import { Controller } from "./controller/controller.js";

///////////////////////////////////////////////////
// Main Code

document.addEventListener("DOMContentLoaded", () => {
    // Create the controller
    let controller = new Controller();

    document.getElementById("level-up-rift-button").addEventListener("click", controller.levelUpRift);
})