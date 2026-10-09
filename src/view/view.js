import { ELEMENTS, MENUS, RESOURCES, MAX_NUM_ITEM_REQS } from "../model/data/constants.js";

export class View {
    // Collection of elements that display the current amount of each resource
    #tier1ResourceDisplays = {};
    #riftDisplays = {};
    #craftingReceipesDivs = {};

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
        this.#mainMenusDivs[MENUS.CRAFT] = document.getElementById("craft-menu");
        
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

        // Obtain all crafting receipes
        Array.from(document.querySelectorAll(".resource-craft-div")).forEach(craftingReceipe => {
            // Grab the Resource ID from the element's data
            let resourceId = craftingReceipe.dataset.resource;
            // Save the resource in the dictionary
            this.#craftingReceipesDivs[resourceId] = craftingReceipe;
        });
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
            this.#tier1ResourceDisplays[_resourceId].querySelector("img[name='resource-display-icon']").src = "images/Unknown Resource Icon.png";
            this.#tier1ResourceDisplays[_resourceId].querySelector("img[name='resource-display-icon']").alt = "Unknown Resource";

            this.#riftDisplays[_resourceId].querySelector("h2").textContent = "???";
            this.#riftDisplays[_resourceId].querySelector("img").src = "images/UnknownRift.png";
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
            // Close the Modal if it's opened, like when levelling to Max Level
            this.closeLevelUpModal();
            // Hide the button
            this.#buttonOpenPlayerLevelUpModal.setAttribute("hidden", "");
            return;
        }

        this.#buttonOpenPlayerLevelUpModal.removeAttribute("hidden");

        // Update the modal with the appropriate information
        this.#updateModalResourceRequirements(levelUpReqs, this.#resourceCheckModalReqsList, "Level " + playerLevel, "Level Up");
    }

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

    /**
     * Updates the display of the specified Rift element
     * - Usually called after levelling up or unlocking a rift
     * @param {string} _resourceId ID of the Rift's Resource
     * @param {Number} _currLevel Rift's current level
     * @param {string} _riftImage Name of the Rift's image (Without path or extension)
     * @param {string} _riftImageAlt Alternate text to display for the Rift image
     * @param {boolean} _reachedMaxLevel Whether the Rift is at max level
     * @param {boolean} _unlocked Whether the rift is available
     */
    updateRiftDisplay(_resourceId, _currLevel, _riftImage, _riftImageAlt, _reachedMaxLevel = false, _unlocked = true) {
        // Only update the Rift if it is unlocked
        if (_unlocked) {
            this.#riftDisplays[_resourceId].querySelector(".rift-level").textContent = _currLevel;
            this.#riftDisplays[_resourceId].querySelector("img").src = "images/" + _riftImage + ".png";
            this.#riftDisplays[_resourceId].querySelector("img").alt = _riftImageAlt;

            // Hide or show the button depending on whether the Rift has reached max Level
            if (_reachedMaxLevel) {
                this.#riftDisplays[_resourceId].querySelector("button[name='level-up-button']").setAttribute("hidden", "");
            } else {
                this.#riftDisplays[_resourceId].querySelector("button[name='level-up-button']").removeAttribute("hidden")
            }
        }
    }

    /**
     * Updates the display of the Rift's level up modal
     * @param {String} riftResource ID of the Rift's Resource
     * @param {Number} currLevel The Rift's current level
     * @param {Array} levelRequirements List of objects with the requirements to level up the Rift
     */
    updateLevelUpRiftModal(riftResource, currLevel, levelRequirements) {
        // If the level up requirements are null, don't open the menu and disable the Rift's Level Up button
        if (levelRequirements === null) {
            // Hide the button
            this.#riftDisplays[riftResource].querySelector("button[name='level-up-button']").setAttribute("disabled", "");
            return;
        }

        this.#riftDisplays[riftResource].querySelector("button[name='level-up-button']").removeAttribute("disabled");

        // Update the modal with the appropriate information
        this.#updateModalResourceRequirements(levelRequirements, this.#resourceCheckModalReqsList, ELEMENTS[RESOURCES[riftResource].ELEMENT].DISPLAY_NAME + " Rift - Level " + currLevel, "Level Up");
        
        // TODO: Display the modal? (NOTE: Currently being done by bootstrap, so try to move it here if it causes issues)
    }

    /**
     * Updates the visual information on the crafting receipe using the information passed in
     * @param {String} _resourceId The ID of the Resources obtained from the crafting
     * @param {Number} _resourceCurrAmount How many of the Resource produced the Player currently has
     * @param {Array} _craftReqs An array of objects for each of the crafting receipe's requirements
     * @param {Boolean} _unlocked Whether the Resource produced by this receipe has been unlocked
     * @param {Boolean} _storageFull Whether the player has run out of room for the Resource produced by this receipe
     */
    updateCraftingReceipe(_resourceId, _resourceCurrAmount, _craftReqs, _unlocked, _storageFull) {
        // Obtain the Crafting receipe div for the specified Resource
        let currCraftReceipeDiv = this.#craftingReceipesDivs[_resourceId];

        // If this Resource doesn't have a div, then there's no receipe for it
        if (!currCraftReceipeDiv) {
            return;
        }

        // Update the name of the Resource that will be crafted
        currCraftReceipeDiv.querySelector("h2[name='resource-name'").textContent = _unlocked ? RESOURCES[_resourceId].DISPLAY_NAME : "???";

        // Update the current amount of the Resource being crafted
        // TODO: Will have to give feedback here if the storage is full
        currCraftReceipeDiv.querySelector("span[name='resource-amount-owned']").textContent = _unlocked ? _resourceCurrAmount : "-";

        // Update the image of the Resource being crafted
        currCraftReceipeDiv.querySelector("img").src = "images/" + (_unlocked ? RESOURCES[_resourceId].DISPLAY_NAME + " Icon.png" : "Unknown Resource Icon.png");
        currCraftReceipeDiv.querySelector("img").alt = _unlocked ? RESOURCES[_resourceId].DISPLAY_NAME + " Icon" : "Unknown Resource Icon";

        // Obtain the divs to display the crafting requirements
        let craftReqDivs = currCraftReceipeDiv.querySelectorAll(".resource-requirement-div");
        // Obtain the crafting button
        let craftingButton = currCraftReceipeDiv.querySelector("button");

        // Update the values of the requirements
        this.#updateResourceRequirements(_craftReqs, craftReqDivs, _unlocked, craftingButton);

        // If this resource's storage is full, disable the button. No need to enable it if it's not full, as that would override the state the button comes in from updateResourceRequirements
        if (_storageFull) {
            craftingButton.setAttribute("disabled", "");
        }
    }

    closeLevelUpModal() {
        // Get the Bootstrap modal element and hide it
        bootstrap.Modal.getInstance(this.#resourceCheckModal).hide();
    }

    /**
     * Updates the visuals of the passed in Resource, both in the display bar at the top, and its related Rift
     * @param {String} _resourceId The ID of the Resource being unlocked
     * @param {String} _resourceImage The name of the file for this Resource's Icon
     * @param {String} _resourceImageAlt The alternative text for this Resource's Icon image
     */
    unlockResource(_resourceId, _resourceImage, _resourceImageAlt) {
        // TODO: Play an animation and remove the lock from the Resource Icon
        // TODO: Play an animation and unlock the Rift (Only applies to Tier 1 Resources)
        // TODO: Change the name of the Rift and activate the button (Only applies to Tier 1 Resources)
        if (RESOURCES[_resourceId].TIER === 1) {
            // Update the resource display at the top
            this.#tier1ResourceDisplays[_resourceId].querySelector("img[name='resource-display-icon']").src = "images/" + _resourceImage;
            this.#tier1ResourceDisplays[_resourceId].querySelector("img[name='resource-display-icon']").alt = _resourceImageAlt;

            // Unlock the rift information
            this.#riftDisplays[_resourceId].querySelector("h2").textContent = RESOURCES[_resourceId].DISPLAY_NAME;
            // Activate the button to level up the Rift
            this.#riftDisplays[_resourceId].querySelector("button[name='level-up-button']").removeAttribute("disabled");
        }
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

        // Update the values of the requirements
        this.#updateResourceRequirements(levelRequirements, reqsDisplayArray, true, this.#resourceCheckModalSuccessButton);
    }

    /**
     * Helper function to display Resource requirements in a passed in list of divs
     * @param {Array} requirements An array of objects with the requirements to display in the modal
     * @param {Array} reqsDisplayArray An array holding the divs where the requirements are displayed
     * @param {Boolean} showRequirements Whether the requirements should be shown as is, or hidden
     * @param {DocumentElement} successButton The button corresponding to the action that should happen when all requirements are fulfilled, if applicable
     */
    #updateResourceRequirements(requirements, reqsDisplayArray, showRequirements = true, successButton = null) {
        // Whether the player has enough resources for this upgrade. True by default, will be set to false if any resource requirement isn't met
        let reqsFulfilled = true;
        // Index to keep track of the current line so we can hide any unused ones
        let lastIndex = -1;
        
        // Loop through all the requirements
        requirements.forEach((req, index) => {
            lastIndex = index;
            // Obtain the `index` line that displays the resource information
            let currReqDiv = reqsDisplayArray[index];
            let resourceUnlocked = showRequirements && req.UNLOCKED;
            
            // Update the resource's name
            currReqDiv.querySelector(".resource-name").textContent = resourceUnlocked ? req.RESOURCE : "???";

            // Update the resource's current amount
            currReqDiv.querySelector(".resource-amount").textContent = resourceUnlocked ? req.CURRENT_AMOUNT : "???";
            
            // Update the Resource's image (This takes care of resources unlocking automatically, although it may happen more than necessary)
            currReqDiv.querySelector("img").src = "images/" + (resourceUnlocked ? RESOURCES[req.RESOURCE].DISPLAY_NAME + " Icon.png" : "Unknown Resource Icon.png");
            currReqDiv.querySelector("img").alt = resourceUnlocked ? RESOURCES[req.RESOURCE].DISPLAY_NAME + " Icon" : "Unknown Resource Icon";
            
            // Update the resource's required amount
            currReqDiv.querySelector(".resource-amount-required").textContent = resourceUnlocked ? req.AMOUNT : "???";

            // Color the line red or green based on whether the requirement has been fulfilled
            currReqDiv.style.color = resourceUnlocked && req.FULFILLED === true ? "green" : "red";

            // Also add a checkmark or an X to the line using the same check
            currReqDiv.querySelector(".fulfilled-icon").textContent = resourceUnlocked && req.FULFILLED === true ? "✅" : "❌";

            // If the requirement for the current resource hasn't been fulfilled, we set reqsFulfilled to false. Otherwise we leave it as is.
            // NOTE: This converts reqsFulfilled to a number! (0 or 1)
            reqsFulfilled &= req.FULFILLED;

            // Need to make this visible again since the requirements in the Modal are hidden when not necessary
            // NOTE: If the modal no longer uses block style, this will need to be updated
            currReqDiv.style.display = "block";
        });

        // Hide any resource lines leftover (Modal has a set number of lines)
        while (++lastIndex < reqsDisplayArray.length) {
            reqsDisplayArray[lastIndex].style.display = "none";            
        }
        
        // If there is a button tied to these requirements
        if (successButton !== null) {
            // Enable or disable it based on whether all requirements were fulfilled
            if (showRequirements && reqsFulfilled) {
                successButton.removeAttribute("disabled");
            } else {
                successButton.setAttribute("disabled", "");
            }
        }
    }
}