import { ELEMENTS, MENUS, PLAYER_LEVEL_MAX_NUM_ITEMS, RESOURCES } from "../model/data/constants.js";

export class View {
    // Collection of elements that display the current amount of each resource
    tier1ResourceDisplays = {};
    riftDisplays = {};

    // Menu elements
    #mainMenusDivs = {};

    // Rift elements
    riftLevelUpModal;
    riftLevelUpButton;
    riftLevelUpModalResources;

    // Player level elements
    #playerLevelUpModal;
    #playerLevelUpModalBody;
    #playerLevelUpButton;
    #playerLevelUpResources;
    #buttonOpenPlayerLevelUpModal;
    #textPlayerLevel;

    // Storage elements
    storageDiv;
    // Stores the document element of each resource
    elementStorageDisplays = {};
    resourceStorageElements = {};
    elementStorageTemplate;
    resourceStorageTemplate;

    // Generic elements
    // Template that holds the default display when showing a resource requirement (for Rift level up, player level up, etc.)
    #resourceRequirementTemplate;

    constructor() {
        this.#mainMenusDivs[MENUS.RIFTS] = document.getElementById("rifts-menu");
        this.#mainMenusDivs[MENUS.PLAYER] = document.getElementById("player-menu");
        this.#resourceRequirementTemplate = document.getElementById("resource-requirement-template");
        
        // Obtain the player level up elements
        this.#buttonOpenPlayerLevelUpModal = document.getElementById("player-level-up-info").querySelector("button[name=level-up-button]");
        this.#textPlayerLevel = document.getElementById("player-level-info").querySelector(".player-level");
        this.#playerLevelUpModal = document.getElementById("level-up-player-modal");
        this.#playerLevelUpModalBody = this.#playerLevelUpModal.querySelector(".modal-body");
        this.#playerLevelUpButton = this.#playerLevelUpModal.querySelector(".modal-body button");
        
        // Obtain the elements to modify from the Rift level up modal
        this.riftLevelUpModal = document.getElementById("level-up-rift-modal");
        this.riftLevelUpButton = this.riftLevelUpModal.querySelector(".modal-body button");
        this.riftLevelUpModalResources = this.riftLevelUpModal.querySelectorAll(".resource-condition");

        this.storageDiv = document.getElementById("storage");
        this.elementStorageTemplate = document.getElementById("element-storage-template");
        this.resourceStorageTemplate = document.getElementById("resource-storage-template");

        // Obtain the resource displays
        Array.from(document.querySelectorAll(".resource-display")).forEach(resourceDisplay => {
            // Grab the Resource ID from the element's data
            let resourceId = resourceDisplay.dataset.element;
            // Save the resource in the dictionary
            this.tier1ResourceDisplays[resourceId] = resourceDisplay;
        });

        // Obtain the resource generations (Rifts)
        Array.from(document.querySelectorAll(".resource-generation")).forEach(resourceGeneration => {
            // Grab the Resource ID from the element's data
            let resourceId = resourceGeneration.dataset.element;
            // Save the resource in the dictionary
            this.riftDisplays[resourceId] = resourceGeneration;
        });
    }

    /**
     * Initializes all the Player Menu's display elements
     */
    initializePlayerMenuDisplay() {
        // Initialize the Player Level Up conditions
        let currResourceReqDisplay;
        for (let i = 0; i < PLAYER_LEVEL_MAX_NUM_ITEMS; i++) {
            // Clone a new requirement display
            currResourceReqDisplay = this.#resourceRequirementTemplate.content.cloneNode(true);
            
            // Add it to the player level up div before the last children (the Level Up button)
            this.#playerLevelUpModalBody.insertBefore(currResourceReqDisplay, this.#playerLevelUpModalBody.lastElementChild);
        }

        // Grab each resource line to update them later
        this.#playerLevelUpResources = this.#playerLevelUpModalBody.querySelectorAll(".resource-requirement-div");

        // Initialize the resource storage display
        this.resourceStorageElements = {};
        this.elementStorageDisplays = {};
        
        let lastElement = "";

        let elementStorage;

        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // If the current Resource has a different element than the previous resource
            if (lastElement !== resource.ELEMENT) {
                // If this is not the first Resource looped through
                if (lastElement !== "") {
                    // Store the previous Resource before continuing
                    this.storageDiv.appendChild(elementStorage);
                    this.elementStorageDisplays[lastElement] = this.storageDiv.lastElementChild;
                }
                
                // Clone a new elementStorage node from the template
                elementStorage = this.elementStorageTemplate.content.cloneNode(true);
                // Set its default values
                elementStorage.querySelector(".element-name").textContent = "???";
                // Update the last element
                lastElement = resource.ELEMENT;
            }

            // Clone a new element for the current Resource
            let resourceStorage = this.resourceStorageTemplate.content.cloneNode(true);
            // Set its default values
            // TODO: Display current value here as well? It would be repeated information for tier 1 resources, but every other resource doesn't display it anywhere.
            resourceStorage.querySelector(".resource-name").textContent = "???";
            resourceStorage.querySelector(".resource-max-amount").textContent = 0;
            elementStorage.querySelector(".resources-div").appendChild(resourceStorage);
            // Add the Resource element to the corresponding Element storage element
            this.resourceStorageElements[resource.ID] = elementStorage.querySelector(".resources-div").lastElementChild;
        });

        // Add the last Element div to the document
        // TODO: This is duplicate code from the one inside the loop. Figure out if there's a better way to do this
        this.storageDiv.appendChild(elementStorage);
        this.elementStorageDisplays[lastElement] = this.storageDiv.lastElementChild;
    }

    /**
     * Initializes a specific resource's display
     * @param {string} _elementId the element's ID
     * @param {boolean} _unlocked whether the resource has been unlocked
     * @param {Number} _newAmount amount to set the display to
     * @param {boolean} _isFull whether the resource storage is currently full
     * @returns 
     */
    initializeResource(_elementId, _unlocked, _amount = 0, _isFull = false) {
        // The resource hasn't been unlocked yet, show it locked
        if (!_unlocked) {
            // TODO: Show the Locked icon on top of the resource icon, and maybe lock the rift as well (though still hide the name of the resources/rift)
            this.tier1ResourceDisplays[_elementId].querySelector("span").textContent = "?";
            this.riftDisplays[_elementId].querySelector("h2").textContent = "???";
            this.riftDisplays[_elementId].querySelector("img").src = "images/UnknownRift1.png";
            this.riftDisplays[_elementId].querySelector("img").alt = "Unknown Rift";
            return;
        } else {
            this.riftDisplays[_elementId].querySelector("h2").textContent = ELEMENTS[_elementId].DISPLAY_NAME + " Rift";
        }

        this.updateResourceDisplay(_elementId, _amount, _isFull);
    }

    /**
     * Updates the values of the Player menu
     * @param {Object} playerCapacities The current capacity for every Resource
     * @param {Number} playerLevel The current player level
     * @param {Object} levelUpReqs The requirements to level up the player
     */
    updatePlayerMenuDisplay(playerCapacities, playerLevel, levelUpReqs = null) {
        // Update the player level
        this.#textPlayerLevel.textContent = playerLevel;

        // Update the Player Level Up Modal
        this.updateLevelUpPlayerModal(levelUpReqs);

        // Loop through all the Resources
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // Obtain the current resource's display element
            let resourceStorage = this.resourceStorageElements[resource.ID];
            let resourceCapacity = playerCapacities[resource.ID];
            // Display the name of the Resource (or "???" if it hasn't been unlocked yet)
            resourceStorage.querySelector(".resource-name").textContent = resourceCapacity === 0 ? "???" : resource.DISPLAY_NAME;
            // Display the current capacity of the Resource
            resourceStorage.querySelector(".resource-max-amount").textContent = resourceCapacity;

            // If the Resource has been unlocked
            if (resourceCapacity > 0) {
                // Then we show the Element name
                // TODO: This checks and sets the name every time, which isn't ideal since this only need to be called 3 times: On initial setup, after unlocking Energy and after unlocking Rainbow
                this.elementStorageDisplays[resource.ELEMENT].querySelector(".element-name").textContent = ELEMENTS[resource.ELEMENT].DISPLAY_NAME;
            }
        });
    }

    /**
     * Updates the values of the Player Level Up Modal
     * - If the levelUpReqs passed in is null, it hides the button to open the Level Up Modal instead
     * @param {Object} levelUpReqs The requirements to level up the player
     */
    updateLevelUpPlayerModal(levelUpReqs) {
        // If the level up requirements are null, the player is already max level
        if (levelUpReqs === null) {
            // Hide the button
            this.#buttonOpenPlayerLevelUpModal.setAttribute("hidden", "");
            return;
        }

        this.#buttonOpenPlayerLevelUpModal.removeAttribute("hidden");

        // Index variable to grab the corresponding display element for each requirement
        let index = 0;
        let reqsFulfilled = true;

        Array.from(levelUpReqs).forEach(req => {
            // Grab a new display element for the requirement
            let currReqElement = this.#playerLevelUpResources[index++];

            // Update the name of the resource
            currReqElement.querySelector(".resource-name").textContent = RESOURCES[req.RESOURCE].DISPLAY_NAME;

            // Update the amount of the resource currently owned
            currReqElement.querySelector(".resource-amount").textContent = req.CURRENT_AMOUNT;

            // Update the amount of the resource required to level up
            currReqElement.querySelector(".resource-amount-required").textContent = req.AMOUNT;

            // Color the line red or green based on whether the requirement has been fulfilled
            currReqElement.style.color = req.FULFILLED === true ? "green" : "red";

            // Also add a checkmark or an X to the line using the same check
            currReqElement.querySelector(".fulfilled-icon").textContent = req.FULFILLED === true ? "✅" : "❌";

            // If the requirement for the current resource hasn't been fulfilled, we set reqsFulfilled to false. Otherwise we leave it as is.
            // NOTE: This converts reqsFulfilled to a number! (0 or 1)
            reqsFulfilled &= req.FULFILLED;
            
            // Display the resource, it could've been hidden before
            currReqElement.style.display = "block";
        });
        
        // If there are less than the maximum amount of items to display, hide any leftover
        for (; index < PLAYER_LEVEL_MAX_NUM_ITEMS; index++) {
            this.#playerLevelUpResources[index].style.display = "none";            
        }

        // Enable or disable the Level Up button based on whether all requirements were fulfilled
        if (reqsFulfilled) {
            this.#playerLevelUpButton.removeAttribute("disabled");
        } else {
            this.#playerLevelUpButton.setAttribute("disabled", "");
        }
    }

    //#region Main menus
    openMainMenu(menuToOpen) {
        if (undefined !== this.#mainMenusDivs[menuToOpen]) {
            this.#mainMenusDivs[menuToOpen].style.display = "block";
        }
    }

    closeMainMenu(menuToClose) {
        if (undefined !== this.#mainMenusDivs[menuToClose]) {
            this.#mainMenusDivs[menuToClose].style.display = "none";
        }
    }
    //#endregion

    /**
     * Updates a specific resource's display
     * @param {string} _elementId the resource's ID
     * @param {Number} _newAmount amount to set the display to
     * @param {boolean} _isFull whether the resource storage has been filled
     * @returns 
     */
    updateResourceDisplay(_elementId, _newAmount, _isFull = false) {
        if (_isFull) {
            // TODO: Change visual effect when resource is at max capacity (bolded, different color, etc)
        }

        this.tier1ResourceDisplays[_elementId].querySelector("[name='resource-display-value']").textContent = _newAmount;
    }

    unlockResource(_resourceId) {
        // TODO: Play an animation and remove the lock from the Resource Icon
        // TODO: Play an animation and unlock the Rift (Only applies to Tier 1 Resources)
        // TODO: Change the name of the Rift and activate the button (Only applies to Tier 1 Resources)
        if (RESOURCES[_resourceId].TIER === 1) {
            this.riftDisplays[_resourceId].querySelector("h2").textContent = RESOURCES[_resourceId].DISPLAY_NAME;
        }
    }

    /**
     * Updates the display of the specified Rift element
     * - Usually called after levelling up or unlocking a rift
     * @param {string} _elementId ID of the Rift's Element
     * @param {Number} _currLevel Rift's current level
     * @param {string} _riftImage Name of the Rift's image (Without path or extension)
     * @param {string} _riftImageAlt Alternate text to display for the Rift image
     * @param {boolean} _unlocked Whether the rift is available
     */
    updateRiftDisplay(_elementId, _currLevel, _riftImage, _riftImageAlt, _unlocked = true) {
        // Only update the Rift if it is unlocked
        if (_unlocked) {
            this.riftDisplays[_elementId].querySelector(".rift-level").textContent = _currLevel;
            this.riftDisplays[_elementId].querySelector("img").src = "images/" + _riftImage + ".png";
            this.riftDisplays[_elementId].querySelector("img").alt = _riftImageAlt;
        }
    }

    /**
     * Updates the display of the Rift's level up modal
     * @param {string} riftElement ID of the Rift's Element
     * @param {Array} levelRequirements List of objects with the requirements to level up the Rift
     * @param {Object} resourcesAmount Object with the amount of every Resource the player currently has
     */
    updateLevelUpRiftModal(riftElement, levelRequirements, resourcesAmount) {
        // Whether the player has enough resources to level up the rift. True by default, will be set to false if any resource requirement isn't met
        let canLevelUp = true;
        
        // Update the Rift's name
        this.riftLevelUpModal.querySelector("h2").textContent = ELEMENTS[riftElement].DISPLAY_NAME + " Rift";

        // TODO: Update the Rift's image, etc

        // Index to keep track of the current line so we can hide any unused ones
        let index = 0;

        // Loop through all the requirements
        levelRequirements.forEach(requiremet => {
            // Obtain the <index> line that displays the resource information
            let resourceDisplay = this.riftLevelUpModalResources[index++];

            // Update the resource's name
            resourceDisplay.querySelector(".resource-name").textContent = RESOURCES[requiremet.RESOURCE].DISPLAY_NAME;
            // Update the resource's currently owned amount
            resourceDisplay.querySelector(".resource-amount").textContent = resourcesAmount[requiremet.RESOURCE];
            // Update the resource's required amount
            resourceDisplay.querySelector(".resource-amount-required").textContent = requiremet.AMOUNT;

            // Make the line visible again
            resourceDisplay.style.display = "block";

            // If the player has less than the amount required
            if (resourcesAmount[requiremet.RESOURCE] < requiremet.AMOUNT) {
                // The Rift can't be levelled up yet
                canLevelUp = false;
            }
        });

        // Hide any resource lines leftover
        while (index < this.riftLevelUpModalResources.length) {
            this.riftLevelUpModalResources[index++].style.display = "none";            
        }

        // Activate the Level Up button if the requirements have been met
        if (canLevelUp) {
            this.riftLevelUpButton.removeAttribute("disabled");
        } else {
            this.riftLevelUpButton.setAttribute("disabled", "");
        }
        
        // TODO: Display the modal? (NOTE: Currently being done by bootstrap, so try to move it here if it causes issues)
    }

    closeLevelUpRiftModal() {
        // Get the Bootstrap modal element and hide it
        bootstrap.Modal.getInstance(this.riftLevelUpModal).hide();
    }
}