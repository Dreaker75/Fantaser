import { ELEMENTS, MENUS, RESOURCES, MAX_NUM_ITEM_REQS } from "../model/data/constants.js";

export class View {
    // Collection of elements that display the current amount of each resource
    #tier1ResourceDisplays = {};
    #riftDisplays = {};

    // Menu elements
    #mainMenusDivs = {};

    // Resource check modal elements
    #resourceCheckModal;
    #resourceCheckModalTitle;
    #resourceCheckModalSuccessButton;
    #resourceCheckModalReqsList;

    // Player level elements
    #buttonOpenPlayerLevelUpModal;
    #textPlayerLevel;

    // Storage elements
    // Stores the document element of each resource
    #elementStorageDisplays = {};
    #resourceStorageElements = {};

    constructor() {
        this.#mainMenusDivs[MENUS.RIFTS] = document.getElementById("rifts-menu");
        this.#mainMenusDivs[MENUS.PLAYER] = document.getElementById("player-menu");
        
        this.#resourceCheckModal = document.getElementById("resources-check-modal");
        this.#resourceCheckModalTitle = this.#resourceCheckModal.querySelector(".modal-title");
        this.#resourceCheckModalSuccessButton = this.#resourceCheckModal.querySelector(".modal-body button");
        this.#resourceCheckModalReqsList = this.#resourceCheckModal.querySelectorAll(".resource-requirement-div");

        // Grab each resource line to update them later
        this.#buttonOpenPlayerLevelUpModal = document.getElementById("player-level-up-info").querySelector("button[name=level-up-button]");
        this.#textPlayerLevel = document.getElementById("player-level-info").querySelector(".player-level");
        
        // Assign the Element Storage and Resource Storage divs
        document.querySelectorAll(".element-capacity-div").forEach(elementDiv => {
            // In each Element Storage, loop through all its Resources Storages
            elementDiv.querySelectorAll(".resource-capacity-div").forEach(resourceDiv => {
                // Store the Resource Storage div using the Resource ID saved in its data attribute as key
                this.#resourceStorageElements[resourceDiv.dataset.resource] = resourceDiv;
            });

            // Save the Element Storage div for future use as well
            this.#elementStorageDisplays[elementDiv.dataset.element] = elementDiv;
        });

        // Obtain the resource displays
        Array.from(document.querySelectorAll(".resource-display")).forEach(resourceDisplay => {
            // Grab the Resource ID from the element's data
            let resourceId = resourceDisplay.dataset.resource;
            // Save the resource in the dictionary
            this.#tier1ResourceDisplays[resourceId] = resourceDisplay;
        });

        // Obtain the resource generations (Rifts)
        Array.from(document.querySelectorAll(".resource-generation")).forEach(resourceGeneration => {
            // Grab the Resource ID from the element's data
            let resourceId = resourceGeneration.dataset.resource;
            // Save the resource in the dictionary
            this.#riftDisplays[resourceId] = resourceGeneration;
        });
    }

    /**
     * Initializes a specific resource's display
     * @param {string} _resourceId the resource's ID
     * @param {boolean} _unlocked whether the resource has been unlocked
     * @param {Number} _newAmount amount to set the display to
     * @param {boolean} _isFull whether the resource storage is currently full
     * @returns 
     */
    initializeResource(_resourceId, _unlocked, _amount = 0, _isFull = false) {
        // The resource hasn't been unlocked yet, show it locked
        if (!_unlocked) {
            // TODO: Show the Locked icon on top of the resource icon, and maybe lock the rift as well (though still hide the name of the resources/rift)
            this.#tier1ResourceDisplays[_resourceId].querySelector("span").textContent = "?";
            this.#riftDisplays[_resourceId].querySelector("h2").textContent = "???";
            this.#riftDisplays[_resourceId].querySelector("img").src = "images/UnknownRift1.png";
            this.#riftDisplays[_resourceId].querySelector("img").alt = "Unknown Rift";
            this.#riftDisplays[_resourceId].querySelector("button").setAttribute("disabled", "");
            return;
        } else {
            this.#riftDisplays[_resourceId].querySelector("h2").textContent = ELEMENTS[RESOURCES[_resourceId].ELEMENT].DISPLAY_NAME + " Rift";
            this.#riftDisplays[_resourceId].querySelector("button").removeAttribute("disabled");
        }

        this.updateResourceDisplay(_resourceId, _amount, _isFull);
    }

    /**
     * Updates the values of the Player menu
     * @param {Object} playerCapacities The current capacity for every Resource
     * @param {Number} playerLevel The current player level
     * @param {Object} levelUpReqs The requirements to level up the player
     */
    updatePlayerMenuDisplay(playerCapacities, playerLevel, levelUpReqs = null) {
        // Update the player level in the menu
        this.#textPlayerLevel.textContent = playerLevel;

        // Update the Player Level Up Modal
        this.updateLevelUpPlayerModal(playerLevel, levelUpReqs);

        // Loop through all the Resources
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // Obtain the current resource's display element
            let resourceStorage = this.#resourceStorageElements[resource.ID];
            let resourceCapacity = playerCapacities[resource.ID];
            // Display the name of the Resource (or "???" if it hasn't been unlocked yet)
            resourceStorage.querySelector(".resource-name").textContent = resourceCapacity === 0 ? "???" : resource.DISPLAY_NAME;
            // Display the current capacity of the Resource
            resourceStorage.querySelector(".resource-max-amount").textContent = resourceCapacity;

            // Show the Element name if it's been unlocked. Otherwise, show "???"
            // TODO: This checks and sets the name every time, which isn't ideal since this only need to be called 3 times: On initial setup, after unlocking Energy and after unlocking Rainbow
            this.#elementStorageDisplays[resource.ELEMENT].querySelector(".element-name").textContent = resourceCapacity > 0 ? ELEMENTS[resource.ELEMENT].DISPLAY_NAME : "???";
        });
    }

    /**
     * Updates the values of the Player Level Up Modal
     * - If the levelUpReqs passed in is null, it hides the button to open the Level Up Modal instead
     * @param {Number} playerLevel The player's current level
     * @param {Object} levelUpReqs The requirements to level up the player
     */
    updateLevelUpPlayerModal(playerLevel, levelUpReqs) {
        // If the level up requirements are null, the player is already max level
        if (levelUpReqs === null) {
            // Hide the button
            this.#buttonOpenPlayerLevelUpModal.setAttribute("hidden", "");
            return;
        }

        this.#buttonOpenPlayerLevelUpModal.removeAttribute("hidden");

        // Update the modal with the appropriate information
        this.#updateModalResourceRequirements(levelUpReqs, this.#resourceCheckModalReqsList, "Level " + playerLevel, "Level Up");
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
     * @param {string} _resourceId the resource's ID
     * @param {Number} _newAmount amount to set the display to
     * @param {boolean} _isFull whether the resource storage has been filled
     * @returns 
     */
    updateResourceDisplay(_resourceId, _newAmount, _isFull = false) {
        if (_isFull) {
            // TODO: Change visual effect when resource is at max capacity (bolded, different color, etc)
        }

        this.#tier1ResourceDisplays[_resourceId].querySelector("[name='resource-display-value']").textContent = _newAmount;
    }

    unlockResource(_resourceId) {
        // TODO: Play an animation and remove the lock from the Resource Icon
        // TODO: Play an animation and unlock the Rift (Only applies to Tier 1 Resources)
        // TODO: Change the name of the Rift and activate the button (Only applies to Tier 1 Resources)
        if (RESOURCES[_resourceId].TIER === 1) {
            this.#riftDisplays[_resourceId].querySelector("h2").textContent = RESOURCES[_resourceId].DISPLAY_NAME;
        }
    }

    /**
     * Updates the display of the specified Rift element
     * - Usually called after levelling up or unlocking a rift
     * @param {string} _resourceId ID of the Rift's Resource
     * @param {Number} _currLevel Rift's current level
     * @param {string} _riftImage Name of the Rift's image (Without path or extension)
     * @param {string} _riftImageAlt Alternate text to display for the Rift image
     * @param {boolean} _unlocked Whether the rift is available
     */
    updateRiftDisplay(_resourceId, _currLevel, _riftImage, _riftImageAlt, _unlocked = true) {
        // Only update the Rift if it is unlocked
        if (_unlocked) {
            this.#riftDisplays[_resourceId].querySelector(".rift-level").textContent = _currLevel;
            this.#riftDisplays[_resourceId].querySelector("img").src = "images/" + _riftImage + ".png";
            this.#riftDisplays[_resourceId].querySelector("img").alt = _riftImageAlt;
        }
    }

    /**
     * Updates the display of the Rift's level up modal
     * @param {string} riftResource ID of the Rift's Resource
     * @param {Array} levelRequirements List of objects with the requirements to level up the Rift
     */
    updateLevelUpRiftModal(riftResource, levelRequirements) {
        // If the level up requirements are null, don't open the menu and disable the Rift's Level Up button
        if (levelRequirements === null) {
            // Hide the button
            this.#riftDisplays[riftResource].querySelector("button[name='level-up-button']").setAttribute("disabled", "");
            return;
        }

        this.#riftDisplays[riftResource].querySelector("button[name='level-up-button']").removeAttribute("disabled");

        // TODO: Update the Rift's image, etc

        // Update the modal with the appropriate information
        this.#updateModalResourceRequirements(levelRequirements, this.#resourceCheckModalReqsList, ELEMENTS[RESOURCES[riftResource].ELEMENT].DISPLAY_NAME + " Rift", "Level Up");
        
        // TODO: Display the modal? (NOTE: Currently being done by bootstrap, so try to move it here if it causes issues)
    }

    closeLevelUpRiftModal() {
        // Get the Bootstrap modal element and hide it
        bootstrap.Modal.getInstance(this.#resourceCheckModal).hide();
    }

    ////////////////////////////////////
    // HELPER FUNCTIONS
    ////////////////////////////////////
    /**
     * Fills out the modal information with the resources and amounts required to level up
     * @param {Array} levelRequirements The resources and amounts required to level up the desired thing
     * @param {Array} reqsDisplayArray The array of divs used to display each resource
     * @param {String} modalTitle The text to display on the Modal's Title
     * @param {String} successButtonText The text to display on the Modal's success Button
     */
    #updateModalResourceRequirements(levelRequirements, reqsDisplayArray, modalTitle, successButtonText) {
        // Update the Modal's title
        this.#resourceCheckModalTitle.textContent = modalTitle;

        // Update the button's text
        this.#resourceCheckModalSuccessButton.textContent = successButtonText;

        // Whether the player has enough resources to level up the desired thing. True by default, will be set to false if any resource requirement isn't met
        let reqsFulfilled = true;

        // Index to keep track of the current line so we can hide any unused ones
        let index = 0;

        // Loop through all the requirements
        levelRequirements.forEach(requiremet => {
            // Obtain the `index` line that displays the resource information
            let currReqElement = reqsDisplayArray[index++];

            // Update the resource's name
            currReqElement.querySelector(".resource-name").textContent = RESOURCES[requiremet.RESOURCE].DISPLAY_NAME;
            // Update the resource's current amount
            currReqElement.querySelector(".resource-amount").textContent = requiremet.CURRENT_AMOUNT;
            // Update the resource's required amount
            currReqElement.querySelector(".resource-amount-required").textContent = requiremet.AMOUNT;

            // Color the line red or green based on whether the requirement has been fulfilled
            currReqElement.style.color = requiremet.FULFILLED === true ? "green" : "red";

            // Also add a checkmark or an X to the line using the same check
            currReqElement.querySelector(".fulfilled-icon").textContent = requiremet.FULFILLED === true ? "✅" : "❌";
            
            // If the requirement for the current resource hasn't been fulfilled, we set reqsFulfilled to false. Otherwise we leave it as is.
            // NOTE: This converts reqsFulfilled to a number! (0 or 1)
            reqsFulfilled &= requiremet.FULFILLED;

            // Make the line visible again
            currReqElement.style.display = "block";
        });

        // Hide any resource lines leftover
        while (index < MAX_NUM_ITEM_REQS) {
            reqsDisplayArray[index++].style.display = "none";            
        }

        // Enable or disable the Level Up button based on whether all requirements were fulfilled
        if (reqsFulfilled) {
            this.#resourceCheckModalSuccessButton.removeAttribute("disabled");
        } else {
            this.#resourceCheckModalSuccessButton.setAttribute("disabled", "");
        }
    }
}