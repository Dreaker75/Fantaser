import { MENUS, RESOURCES, MAX_NUM_ITEM_REQS, CRAFTS } from "../model/data/constants.js";
import { PlayerManager } from "../model/managers/player_manager.js";
import { View } from "../view/view.js";
import { RiftsManager } from "../model/managers/rifts_manager.js";

export class Controller {
    #view;

    //#region Managers
    #playerManager;
    #riftsManager;
    //#endregion

    //#region Generic elements
    #resourcesCheckModal;
    //#endregion

    //#region Template Elements
    // Template that holds the default display when showing a resource requirement (for Rift level up, player level up, etc.)
    #resourceRequirementTemplate;
    #elementStorageTemplate;
    #resourceStorageTemplate;
    #resourceDisplayTemplate;
    #resourceGenerationTemplate;
    #resourceCraftTemplate;
    //#endregion

    // Data Variables
    #currentMenu;
    // NOTE: This is not properly protected, as it doesn't check that the Rift currently opened lines up with this variable, if it's modified manually by the player
    #currentRiftSelected;

    constructor() {
        this.#playerManager = new PlayerManager();
        this.#riftsManager = new RiftsManager();

        this.#resourcesCheckModal = document.getElementById("resources-check-modal");

        this.#resourceRequirementTemplate = document.getElementById("resource-requirement-template");
        this.#elementStorageTemplate = document.getElementById("element-storage-template");
        this.#resourceStorageTemplate = document.getElementById("resource-storage-template");

        this.#currentMenu = MENUS.RIFTS;
        this.#currentRiftSelected = "";

        // Grab the resource templates
        this.#resourceDisplayTemplate = document.getElementById("resource-display-template");

        // Grab the divs where the resources' display and generation lie
        this.#resourceGenerationTemplate = document.getElementById("resource-generation-template");

        this.#resourceCraftTemplate = document.getElementById("resource-craft-template");

        this.#initializeResourceCheckModal();
        this.#initializePlayerMenu();
        this.#initializeRiftsMenu();
        this.#initializeCraftingMenu();

        // Create the View
        this.#view = new View();

        this.#updateCraftingMenu();

        // Loop through every resource
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // If it's a Tier 1, update it's corresponding display
            // TODO: Will also have to update every other Resource's display if that's added
            if (resource.TIER == 1) {
                let amount = this.#playerManager.getResourceAmount(resource.ID);
                let unlocked = this.#playerManager.isResourceUnlocked(resource.ID)
                this.#view.initializeResource(resource.ID, unlocked, amount, this.#playerManager.isResourceFull(resource.ID));
                this.#view.updateRiftDisplay(resource.ID, 1, this.#riftsManager.getImageName(resource.ID), this.#riftsManager.getImageAlt(resource.ID), this.#riftsManager.isRiftMaxLevel(resource.ID), unlocked);
            }
        });

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

        // Handle all menu updates before "loading" a menu
        if (this.#currentMenu === MENUS.CRAFT) {
            this.#updateCraftingMenu();
        }

        // Open the new menu
        this.#view.openMainMenu(this.#currentMenu);
    }

    /**
     * Updates the level up Player Modal
     */
    updateLevelUpPlayerModal = () => {
        // Update the storage and level up values on the Player menu
        this.#view.updateLevelUpPlayerModal(this.#playerManager.getLevel(), this.#playerManager.getNextLevelReqInfo());
    }

    /**
     * Increases the Player's Resource corresponding to the Rift by an amount based on the Rift Level, if the Resource has been unlocked and it's not at capacity.
     * @param {*} event document Event to obtain the Rift's Resource
     */
    generateTier1Resource = event => {
        let resource = RESOURCES[event.currentTarget.resourceClicked];

        // If the resource hasn't been unlocked yet OR it's currently at max capacity
        if (!this.#playerManager.isResourceUnlocked(resource.ID) || this.#playerManager.isResourceFull(resource.ID)) {
            // Don't increase it
            return;
        }

        // Doesn't need an if since it's checked above and it's no longer a button. Although, it will need to be an if again after we add some feedback for hovering or some visuals to indicate there's still Essence to be generated from the rift
        this.#playerManager.increaseResourceAmount(resource.ID, this.#riftsManager.getRiftAmountGenerated(resource.ID));

        // TODO: If the resource is at max capacity, will need to show the player some sort of feedback to let them know they can't gain any more until its storage is increased or it's spent somewhere

        // Update the resource's display amount
        this.#view.updateResourceDisplay(resource.ID, this.#playerManager.getResourceAmount(resource.ID), this.#playerManager.isResourceFull(resource.ID));
    }

    /**
     * Saves the Rift selected and updates the modal
     * @param {Event} event document Event to obtain the Rift's Resource
     */
    openRiftLevelUpModal = event => {
        // We save the Resource of the selected Rift so we can level it up later
        this.#currentRiftSelected = event.currentTarget.resourceClicked;

        this.#updateLevelUpRiftModal();
    }

    /**
     * Checks that all requirements are fulfilled, crafts the Resource, and updates the Crafting Menu afterwards
     * @param {Event} event document Event to obtain the crafting receipe's Resource
     * @returns 
     */
    handleCraftResource = event => {
        let resourceCrafted = event.currentTarget.resourceClicked;
        
        // This Resource hasn't been unlocked yet, so it can't be crafted
        if (!this.#playerManager.isResourceUnlocked(resourceCrafted)) {
            return;
        }

        let reqsFulfilled = true;
        let craftingReqs = CRAFTS[resourceCrafted];
        
        // This isn't a craftable Resource
        if (!craftingReqs) {
            return;
        }
        
        // Make sure the Player has the resources necessary for this craft
        craftingReqs.forEach(req => {
            reqsFulfilled &= this.#playerManager.getResourceAmount(req.RESOURCE) >= req.AMOUNT;
        });

        // The Player is lacking 1 or more resources, don't craft the item
        if (!reqsFulfilled) {
            return;
        }

        // If the Player has reached max capacity for the resource they're trying to craft, don't craft it
        if (this.#playerManager.isResourceFull(resourceCrafted)) {
            return;
        }

        // TODO: Play sound effect, show animation, etc. here

        // Remove the Resources spent on this craft from the Player's Storage
        craftingReqs.forEach(req => {
            this.#playerManager.removeResourceAmount(req.RESOURCE, req.AMOUNT);

            // If this was a Tier 1 Resource
            // NOTE: If a display is added to other Resources in the future, this line will have to be changed
            if (RESOURCES[req.RESOURCE].TIER === 1) {
                // Refresh the Resource display so it shows the updated value
                this.#view.updateResourceDisplay(req.RESOURCE, this.#playerManager.getResourceAmount(req.RESOURCE), false);
            }
        });

        // Add the Resource crafted to the Player's Storage
        // NOTE: For now each craft will only give 1 of the crafted item. Needs to be revisited if the player will be able to craft more than 1 at a time
        this.#playerManager.increaseResourceAmount(resourceCrafted, 1);

        // Refresh the Crafting Menu so the values update accordingly
        this.#updateCraftingMenu();
    }

    /**
     * Calls the appropriate function for the current menu
     */
    handleModalSuccessButton = () => {
        switch (this.#currentMenu) {
            case MENUS.PLAYER:
                this.#levelUpPlayer();
                break;
            case MENUS.RIFTS:
                this.#levelUpRift();
                break;
            default:
                break;
        }
    }

    ////////////////////////////////////
    // HELPER FUNCTIONS
    ////////////////////////////////////
    #initializeResourceCheckModal = () => {
        // Obtain all necessary document elements
        let resourceCheckModalBody = this.#resourcesCheckModal.querySelector(".modal-body");

        // Initialize the Player Level Up conditions
        let currResourceReqDisplay;
        for (let i = 0; i < MAX_NUM_ITEM_REQS; i++) {
            // Clone a new requirement display
            currResourceReqDisplay = this.#resourceRequirementTemplate.content.cloneNode(true);

            // Add it to the player level up div before the last children (the Level Up button)
            resourceCheckModalBody.insertBefore(currResourceReqDisplay, resourceCheckModalBody.lastElementChild);
        }
    }

    #initializePlayerMenu = () => {
        // Element to append all the Resource storage displays to
        let storageDiv = document.getElementById("storage");

        let prevElement = "";
        let elementStorageResourcesDiv;

        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // If the current Resource has a different element than the previous resource
            if (prevElement !== resource.ELEMENT) {
                // Clone a new document fragment from the template. This fragment is cleared out when appending it to the document (below in storageDiv.appendChild)
                let templateFragment = this.#elementStorageTemplate.content.cloneNode(true);
                // Assign the data-element attribute with its Element ID so the view can find this element later
                templateFragment.querySelector(".element-capacity-div").dataset.element = resource.ELEMENT;
                // Save the div where the Resource Storages will be displayed
                elementStorageResourcesDiv = templateFragment.querySelector(".resources-div");
                // Update the last element
                prevElement = resource.ELEMENT;

                // Store the previous Resource before continuing
                storageDiv.appendChild(templateFragment);
            }

            // Clone a new element for the current Resource
            let resourceStorage = this.#resourceStorageTemplate.content.cloneNode(true);
            // Assing the resource ID so the view can find this element later
            resourceStorage.querySelector(".resource-capacity-div").dataset.resource = resource.ID;

            // Append the Resource Storage to the corresponding element
            elementStorageResourcesDiv.appendChild(resourceStorage);
        });
    }

    #initializeRiftsMenu = () => {
        // Obtain all necessary document elements
        let resourcesGenerationDiv = document.getElementById("resources-generation");
        let tier1ResourcesDisplay = document.getElementById("resources-display");

        // Loop through each resource
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // TODO: These are the rifts that are only visible in the main screen, and none of the sub menus. Might need to be changed when new menus are added
            // If it's a Tier 1 resource (Meaning, it can be obtained from a Rift)
            if (resource.TIER == 1) {
                // Create new elements based on the templats
                let newResource = this.#resourceDisplayTemplate.content.cloneNode(true);
                let newResourceGeneration = this.#resourceGenerationTemplate.content.cloneNode(true);

                // Set up the tier 1 resources
                // NOTE: Setting these here because it's only done once, but ideally view.js should do it?
                newResource.querySelector("img").src += resource.DISPLAY_NAME + " Icon.png";
                newResource.querySelector("img").alt = resource.DISPLAY_NAME + " Icon";

                // Add the element ID to the elements' data attribute
                newResource.querySelector(".resource-display").dataset.resource = resource.ID;
                newResourceGeneration.querySelector(".resource-generation").dataset.resource = resource.ID;

                // Add the resource elements to the document
                tier1ResourcesDisplay.appendChild(newResource);
                resourcesGenerationDiv.appendChild(newResourceGeneration);
            }
        });
    }

    #initializeCraftingMenu = () => {
        // Grab the div where the Craft receipes will be added
        let craftingListDiv = document.getElementById("crafting-list-div");
        
        // Loop through every Resource
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // Grab the entry for the current Resource in the CRAFTS data
            let currResourceCraft = CRAFTS[resource.ID];

            // If the current Resource has a crafting receipe
            if (currResourceCraft) {
                // Clone the Craft receipe template
                let currCraftDiv = this.#resourceCraftTemplate.content.cloneNode(true);
                
                // Set the Resource associated with said receipe
                currCraftDiv.querySelector(".resource-craft-div").dataset.resource = resource.ID;

                // Grab the receipe's div that will hold the list of requirements
                let craftRequirementsDiv = currCraftDiv.querySelector(".craft-requirements-div");
                // Loop through all the requirements on the current receipe
                currResourceCraft.forEach(_ => {
                    // Create a new Resource requirement line from the template
                    let currReqDiv = this.#resourceRequirementTemplate.content.cloneNode(true);
                    // Add the line to the div holding the list of requirements
                    craftRequirementsDiv.appendChild(currReqDiv);
                });

                // Add the new receipe to the list of Craft receipes
                craftingListDiv.appendChild(currCraftDiv);
            }
        });
    }

    #updateCraftingMenu = () => {
        // Loop through every resource
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            let craftReq = CRAFTS[resource.ID];
            // If the Resource has a Crafting receipe
            if (craftReq) {
                // Add the Current Amount, Fulfilled and Unlocked properties to every requirement for easier handling in the View
                craftReq.forEach(req => {
                    req.CURRENT_AMOUNT = this.#playerManager.getResourceAmount(req.RESOURCE);
                    req.FULFILLED = req.AMOUNT <= req.CURRENT_AMOUNT;
                    req.UNLOCKED = this.#playerManager.isResourceUnlocked(req.RESOURCE);
                });

                // Update the view of the receipe
                this.#view.updateCraftingReceipe(resource.ID, this.#playerManager.getResourceAmount(resource.ID), craftReq, this.#playerManager.isResourceUnlocked(resource.ID), this.#playerManager.isResourceFull(resource.ID));
            }
        });
    }

    /**
     * Updates the modal to display the requirements to level up the selected Rift
     */
    #updateLevelUpRiftModal = () => {
        let nextLevelRequirements = this.#riftsManager.getNextLevelRequirement(this.#currentRiftSelected);

        // There either was an error, or the Rift is max Level
        if (nextLevelRequirements === null) {
            // Close the modal if it's open
            this.#view.closeLevelUpModal();
            // Ignore the rest of the code
            return;
        }

        // Loop through all the required Resources
        nextLevelRequirements.forEach(requirement => {
            let currAmount = this.#playerManager.getResourceAmount(requirement.RESOURCE);
            // Save the player's current amount for this Resource
            requirement.CURRENT_AMOUNT = currAmount;
            // Also save whether the requirement for this resource is fulfilled
            requirement.FULFILLED = currAmount >= requirement.AMOUNT;
            requirement.UNLOCKED = this.#playerManager.isResourceUnlocked(requirement.RESOURCE);
        });

        // Update the level up modal passing in the Element of the currently selected Rift, its level up requirements, and the amount of each resource the player currently has
        this.#view.updateLevelUpRiftModal(this.#currentRiftSelected, this.#riftsManager.getRiftLevel(this.#currentRiftSelected), nextLevelRequirements);
    }

    /**
     * Checks if the level up requirements are fulfilled, levels up the player if they are, and updates the player menu accordingly
     */
    #levelUpPlayer = () => {
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
            // The main Resource the Energy Rift produces
            let energyRiftResource = RESOURCES.BYTE_ENERGY.ID;
            // Store whether the Energy Rift was already unlocked
            let wasEnergyRiftUnlocked = this.#playerManager.isResourceUnlocked(energyRiftResource);

            this.#playerManager.levelUp();

            // If the Energy Rift is now unlocked
            if (!wasEnergyRiftUnlocked && this.#playerManager.isResourceUnlocked(energyRiftResource)) {
                // Update the Byte Energy's display
                this.#view.updateResourceDisplay(energyRiftResource, 0, false);

                // TODO: Play an animation that unlocks the Byte Energy display at the top of the screen

                // Update the Energy Rift values
                this.#view.updateRiftDisplay(energyRiftResource, 1, this.#riftsManager.getImageName(energyRiftResource), this.#riftsManager.getImageAlt(energyRiftResource), this.#riftsManager.isRiftMaxLevel(energyRiftResource));

                // Tell the view to update the visuals accordingly
                // TODO: This would need to be done in a way that the animation plays the next time the player goes to the Rifts menu, because at the moment they're in a different menu to really see it
                this.#view.unlockResource(energyRiftResource, RESOURCES[energyRiftResource].DISPLAY_NAME + " Icon.png", RESOURCES[energyRiftResource].DISPLAY_NAME + " Icon");
            }

            // Remove the appropiate resources from the Player's storage
            Array.from(requirements).forEach(req => {
                this.#playerManager.removeResourceAmount(req.RESOURCE, req.AMOUNT);

                // If the Resource modified was a Tier 1 resource
                // TODO: Might have to come back and revise this if a display for a tier 2+ resource is added
                if (RESOURCES[req.RESOURCE].TIER === 1) {
                    // Update its display on the main page
                    this.#view.updateResourceDisplay(req.RESOURCE, this.#playerManager.getResourceAmount(req.RESOURCE), this.#playerManager.isResourceFull(req.RESOURCE));
                }
            });
        }

        // Update the Player menu with the new values
        this.#view.updatePlayerMenuDisplay(this.#playerManager.getAllResourcesCapacities(), this.#playerManager.getLevel(), this.#playerManager.getNextLevelReqInfo());
    }

    /**
     * Levels up the currently selected Rift, handling the calls to the Model and View
     */
    #levelUpRift = () => {
        // Boolean to know whether the level up requirements have been fulfilled (true by default)
        let requirementFulfilled = true;

        // Obtain the level up requirements from the RiftsManager
        let nextLevelRequirements = this.#riftsManager.getNextLevelRequirement(this.#currentRiftSelected);

        // Either there was an error, or the Rift is max Level
        if (nextLevelRequirements === undefined) {
            // Close the modal
            this.#view.closeLevelUpModal();
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
            this.#view.closeLevelUpModal();
            // Don't level up the Rift (since the data was tampered with)
            return;
        }

        // Remove the required amount of resources from the Player's Storage
        nextLevelRequirements.forEach(requirement => {
            this.#playerManager.removeResourceAmount(requirement.RESOURCE, requirement.AMOUNT);

            // If the resource was Tier 1
            if (RESOURCES[requirement.RESOURCE].TIER === 1) {
                // Update the display
                this.#view.updateResourceDisplay(requirement.RESOURCE, this.#playerManager.getResourceAmount(requirement.RESOURCE), this.#playerManager.isResourceFull(requirement.RESOURCE));
            }
        });

        // TODO: Double check #currentRiftSelected lines up with the Rift currently opened?

        // Tell the RiftsManager to increase the selected Rift's Level
        this.#riftsManager.levelUpRift(this.#currentRiftSelected);

        this.#updateLevelUpRiftModal();

        this.#view.updateRiftDisplay(this.#currentRiftSelected, this.#riftsManager.getRiftLevel(this.#currentRiftSelected), this.#riftsManager.getImageName(this.#currentRiftSelected), this.#riftsManager.getImageAlt(this.#currentRiftSelected), this.#riftsManager.isRiftMaxLevel(this.#currentRiftSelected));
    }
}