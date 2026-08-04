import { ELEMENTS, RESOURCES } from "../model/data/constants.js";

export class View {
    // Collection of elements that display the current amount of each resource
    tier1ResourceDisplays = {};
    riftDisplays = {};

    // Rift elements
    riftLevelUpModal;
    riftLevelUpButton;
    riftLevelUpModalResources;

    constructor() {
        // Obtained the elements to modify from the Rift level up modal
        this.riftLevelUpModal = document.getElementById("level-up-rift-modal");
        this.riftLevelUpButton = this.riftLevelUpModal.querySelector(".modal-body button");
        this.riftLevelUpModalResources = this.riftLevelUpModal.querySelectorAll(".resource-condition");

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