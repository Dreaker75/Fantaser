import { MENUS, RESOURCES } from "../model/data/constants.js";
import { PlayerManager } from "../model/managers/player_manager.js";
import { View } from "../view/view.js";
import { RiftsManager } from "../model/managers/rifts_manager.js";

export class Controller {
    #playerManager;
    #riftsManager;

    #view;

    // Data Variables
    #currentMenu;
    // NOTE: This is not properly protected, as it doesn't check that the Rift currently opened lines up with this variable, if it's modified manually by the player
    #currentRiftSelected;

    constructor() {
        this.#playerManager = new PlayerManager();
        this.#riftsManager = new RiftsManager();

        this.#currentMenu = MENUS.RIFTS;
        this.#currentRiftSelected = "";

        // Grab the resource templates
        let resourceTemplate = document.getElementById("resource-display-template");
        let tier1ResourcesDisplay = document.getElementById("resources-display");

        // Grab the divs where the resources' display and generation lie
        let resourceGenerationTemplate = document.getElementById("resource-generation-template");
        let resourcesGenerationDiv = document.getElementById("resources-generation");

        // Loop through each resource
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // TODO: These are the rifts that are only visible in the main screen, and none of the sub menus. Might need to be changed when new menus are added
            // If it's a Tier 1 resource (Meaning, it can be obtained from a Rift)
            if (resource.TIER == 1) {
                // Create new elements based on the templats
                let newResource = resourceTemplate.content.cloneNode(true);
                let newResourceGeneration = resourceGenerationTemplate.content.cloneNode(true);

                // Set up the tier 1 resources
                newResource.querySelector("img").src += resource.DISPLAY_NAME + " Icon.png";
                newResource.querySelector("img").alt = resource.DISPLAY_NAME + " Icon";
 
                let riftImage = newResourceGeneration.querySelector("img")
                riftImage.src += this.#riftsManager.getImageName(resource.ELEMENT) + ".png";
                riftImage.alt = this.#riftsManager.getImageAlt(resource.ELEMENT);
                riftImage.addEventListener("click", () => {
                    let resourceCapacity = this.#playerManager.getResourceCapacity(resource.ID);

                    // If the resource hasn't been unlocked yet OR it's currently at max capacity
                    if (resourceCapacity <= 0 || resourceCapacity <= this.#playerManager.getResourceAmount(resource.ID)) {
                        // Don't increase it
                        return;
                    }

                    // Doesn't need an if since it's checked above and it's no longer a button. Although, it will need to be an if again after we add some feedback for hovering or some visuals to indicate there's still Essence to be generated from the rift
                    this.#playerManager.increaseResourceAmount(resource.ID, this.#riftsManager.getRiftAmountGenerated(resource.ELEMENT));

                    // TODO: If the resource is at max capacity, will need to show the player some sort of feedback to let them know they can't gain any more until its storage is increased or it's spent somewhere

                    // Update the resource's display amount
                    let amount = this.#playerManager.getResourceAmount(resource.ID);
                    this.#view.updateResourceDisplay(resource.ELEMENT, amount, this.#playerManager.getResourceCapacity(resource.ID) === amount);
                });

                // Set up the tier 1 resource generation
                let levelUpButton = newResourceGeneration.querySelector("button[name=level-up-button]");
                
                // TODO: When the Rift is ready to be levelled up, add a bubble on the top-right corner of the button. Player should be able to press the button whenever to see the level up requirements

                // Check if the resource has been unlocked
                if (this.#playerManager.getResourceCapacity(resource.ID) == 0) {
                    // If it hasn't, disable the button to generate it
                    levelUpButton.setAttribute("disabled", "true");
                }
                
                // Add behavior to the resources buttons
                levelUpButton.addEventListener("click", () => {
                    // We save the element of the selected Rift so we can level it up later
                    this.#currentRiftSelected = resource.ELEMENT;

                    this.#updateLevelUpRiftModal();
                });

                // Add the element ID to the elements' data attribute
                newResource.querySelector(".resource-display").dataset.element = resource.ELEMENT;
                newResourceGeneration.querySelector(".resource-generation").dataset.element = resource.ELEMENT;

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
                this.#view.initializeResource(resource.ELEMENT, capacity > 0, amount, capacity === amount);
                this.#view.updateRiftDisplay(resource.ELEMENT, 1, this.#riftsManager.getImageName(resource.ELEMENT), this.#riftsManager.getImageAlt(resource.ELEMENT), capacity > 0);
            }
        });

        this.#view.initializePlayerMenuDisplay();

        // Update the storage and level up values on the Player menu
        this.#view.updatePlayerMenuDisplay(this.#playerManager.getAllResourcesCapacities(), this.#playerManager.getLevel(), this.#playerManager.getNextLevelReqInfo());
    }

    /**
     * Closes the current menu and opens the new one
     * - if the new menu is the same as the current menu, does nothing
     * @param {MENUS} newMenu A constant with the name of the new menu to open
     */
    openNewMenu = newMenu => {
        // We're already in the menu, we don't need to do anything.
        // NOTE: We could keep it for an easier way to refresh the page?
        if (newMenu === this.#currentMenu) {
            return;
        }

        // Close current menu
        this.#view.closeMainMenu(this.#currentMenu);

        // Update the current menu
        this.#currentMenu = newMenu;

        // Open the new menu
        this.#view.openMainMenu(this.#currentMenu);
    }

    /**
     * Levels up the currently selected Rift, handling the calls to the Model and View
     */
    levelUpRift = () => {
        // Boolean to know whether the level up requirements have been fulfilled (true by default)
        let requirementFulfilled = true;

        // Obtain the level up requirements from the RiftsManager
        let nextLevelRequirements = this.#riftsManager.getNextLevelRequirement(this.#currentRiftSelected);

        // Either there was an error, or the Rift is max Level
        if (nextLevelRequirements === undefined) {
            // Close the modal
            this.#view.closeLevelUpRiftModal();
            // Ignore the rest of the code
            return;
        }

        // Loop through all the level requirements
        nextLevelRequirements.forEach(requirement => {
            // If the player doesn't have enough of the Resource
            if (this.#playerManager.getResourceAmount(requirement.RESOURCE) < requirement.AMOUNT) {
                // We update requirementFulfilled
                requirementFulfilled = false;
            }
        });

        // The player doesn't have enough resources to level up the Rift
        if (!requirementFulfilled) {
            // Close the modal
            this.#view.closeLevelUpRiftModal();
            // Don't level up the Rift (since the data was tampered with)
            return;
        }

        // Remove the required amount of resources from the Player's Storage
        nextLevelRequirements.forEach(requirement => {
            this.#playerManager.removeResourceAmount(requirement.RESOURCE, requirement.AMOUNT);
    
            // If the resource was Tier 1
            if (RESOURCES[requirement.RESOURCE].TIER === 1) {
                let amount = this.#playerManager.getResourceAmount(requirement.RESOURCE);
                // Update the display
                this.#view.updateResourceDisplay(RESOURCES[requirement.RESOURCE].ELEMENT, amount, this.#playerManager.getResourceCapacity(requirement.RESOURCE) === amount);
            }
        });

        // TODO: Double check #currentRiftSelected lines up with the Rift currently opened?

        // Tell the RiftsManager to increase the selected Rift's Level
        this.#riftsManager.levelUpRift(this.#currentRiftSelected);
        
        this.#updateLevelUpRiftModal();

        this.#view.updateRiftDisplay(this.#currentRiftSelected, this.#riftsManager.getRiftLevel(this.#currentRiftSelected), this.#riftsManager.getImageName(this.#currentRiftSelected), this.#riftsManager.getImageAlt(this.#currentRiftSelected));
    }

    /**
     * Checks if the level up requirements are fulfilled, levels up the player if they are, and updates the player menu accordingly
     */
    levelUpPlayer = () => {
        let requirementFulfilled = true;

        // Obtain the next level requirements
        let requirements = this.#playerManager.getNextLevelReqInfo();

        // The player is currently at max level, return
        // NOTE: This should not be hit normally, as the level up button would be hidden if that's the case
        // NOTE: Might need to check requirements is a proper value and not undefined and so on?
        if (requirements === null) {
            return;
        }

        Array.from(requirements).forEach(req => {
            // If the requirement for the current resource hasn't been fulfilled, we set reqsFulfilled to false. Otherwise we leave it as is.
            // NOTE: This converts reqsFulfilled to a number! (0 or 1)
            requirementFulfilled &= req.FULFILLED;
        });

        // All requirements were fulfilled, level up the player
        if (requirementFulfilled) {
            this.#playerManager.levelUp();
            
            // Remove the appropiate resources from the Player's storage
            Array.from(requirements).forEach(req => {
                this.#playerManager.removeResourceAmount(req.RESOURCE, req.AMOUNT);

                // If the Resource modified was a Tier 1 resource
                // TODO: Might have to come back and revise this if a display for a tier 2+ resource is added
                if (RESOURCES[req.RESOURCE].TIER === 1) {
                    let amount = this.#playerManager.getResourceAmount(req.RESOURCE);
                    // Update its display on the main page
                    this.#view.updateResourceDisplay(RESOURCES[req.RESOURCE].ELEMENT, amount, this.#playerManager.getResourceCapacity(req.RESOURCE) === amount);
                }
            });
        }
        
        // Update the Player menu with the new values
        this.#view.updatePlayerMenuDisplay(this.#playerManager.getAllResourcesCapacities(), this.#playerManager.getLevel(), this.#playerManager.getNextLevelReqInfo());
    }

    /**
     * Updates the level up Player Modal
     */
    updateLevelUpPlayerModal = () => {
        // Update the storage and level up values on the Player menu
        this.#view.updateLevelUpPlayerModal(this.#playerManager.getNextLevelReqInfo());
    }

    ////////////////////////////////////
    // HELPER FUNCTIONS
    ////////////////////////////////////
    #updateLevelUpRiftModal = () => {
        let amountOfResourcesForLevelUp = {};
        let nextLevelRequirements = this.#riftsManager.getNextLevelRequirement(this.#currentRiftSelected);

        // There either was an error, or the Rift is max Level
        if (nextLevelRequirements === null) {
            // Close the modal if it's open
            this.#view.closeLevelUpRiftModal();
            // Ignore the rest of the code
            return;
        }

        // Loop through all the required Resources
        nextLevelRequirements.forEach(requirement => {
            // Save the player's current amount for this Resource
            amountOfResourcesForLevelUp[requirement.RESOURCE] = this.#playerManager.getResourceAmount(requirement.RESOURCE);
        });

        // Update the level up modal passing in the Element of the currently selected Rift, its level up requirements, and the amount of each resource the player currently has
        this.#view.updateLevelUpRiftModal(this.#currentRiftSelected, nextLevelRequirements, amountOfResourcesForLevelUp);
    }
}