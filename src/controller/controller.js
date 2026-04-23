import { RESOURCES } from "../model/data/constants.js";
import { PlayerManager } from "../model/managers/player_manager.js";
import { View } from "../view/view.js";

export class Controller {
    #playerManager;

    #view;

    constructor() {
        this.#playerManager = new PlayerManager();

        // Grab the resource templates
        let resourceTemplate = document.getElementById("resource-display-template");
        let tier1ResourcesDisplay = document.getElementById("resources-display");

        // Grab the divs where the resources' display and generation lie
        let resourceGenerationTemplate = document.getElementById("resource-generation-template");
        let resourcesGenerationDiv = document.getElementById("resources-generation");

        // Loop through each resource
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // TODO: These are the shrines that are only visible in the main screen, and none of the sub menus. Might need to be changed when new menus are added
            // If it's a Tier 1 resource (Meaning, it can be obtained from a Shrine)
            if (resource.TIER == 1) {
                // Create new elements based on the templats
                let newResource = resourceTemplate.content.cloneNode(true);
                let newResourceGeneration = resourceGenerationTemplate.content.cloneNode(true);

                // Set up the tier 1 resources
                newResource.querySelector("img").src += resource.DISPLAY_NAME + " Icon.png";
                newResource.querySelector("img").alt = resource.DISPLAY_NAME + " Icon";

                // Set up the tier 1 resource generation
                let button = newResourceGeneration.querySelector("button");
                
                // Check if the resource has been unlocked
                if (this.#playerManager.getResourceCapacity(resource.ID) == 0) {
                    // If it hasn't, disable the button to generate it
                    button.setAttribute("disabled", "true");
                }
                
                // Add behavior to the resources buttons
                button.addEventListener("click", () => {
                    // If the capacity for the resource was reached
                    if (this.#playerManager.increaseResourceAmount(resource.ID, 1)) {
                        // Disable the button until the capacity is increased or the amount is decreased
                        button.setAttribute("disabled", "true");
                    }

                    // Update the resource's display amount
                    let amount = this.#playerManager.getResourceAmount(resource.ID);
                    this.#view.updateResourceDisplay(resource.ID, amount,
                        this.#playerManager.getResourceCapacity(resource.ID) === amount);
                });

                // Add the resource ID to the elements' data attribute
                newResource.querySelector(".resource-display").dataset.resource = resource.ID;
                newResourceGeneration.querySelector(".resource-generation").dataset.resource = resource.ID;

                // Add the resource elements to the document
                tier1ResourcesDisplay.appendChild(newResource);
                resourcesGenerationDiv.appendChild(newResourceGeneration);
            }
        });

        // Create the View
        this.#view = new View();

        // Update each Tier 1 Resources' displayed information
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            if (resource.TIER == 1) {
                let amount = this.#playerManager.getResourceAmount(resource.ID);
                let capacity = this.#playerManager.getResourceCapacity(resource.ID)
                this.#view.initializeResource(resource.ID, capacity > 0, amount, capacity === amount);
            }
        });
    }
}