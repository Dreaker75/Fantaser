import { RESOURCES } from "../model/data/constants.js";

export class View {
    // Collection of elements that display the current amount of each resource
    tier1ResourceDisplays = {};
    tier1ResourceGeneration = {};

    constructor() {
        // Obtain the resource displays
        Array.from(document.querySelectorAll(".resource-display")).forEach(resourceDisplay => {
            // Grab the Resource ID from the element's data
            let resourceId = resourceDisplay.dataset.resource;
            // Save the resource in the dictionary
            this.tier1ResourceDisplays[resourceId] = resourceDisplay;
        });

        // Obtain the resource generations (Shrines)
        Array.from(document.querySelectorAll(".resource-generation")).forEach(resourceGeneration => {
            // Grab the Resource ID from the element's data
            let resourceId = resourceGeneration.dataset.resource;
            // Save the resource in the dictionary
            this.tier1ResourceGeneration[resourceId] = resourceGeneration;
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
            // TODO: Show the Locked icon on top of the resource icon, and maybe lock the shrine as well (though still hide the name of the resources/shrine)
            this.tier1ResourceDisplays[_resourceId].querySelector("span").textContent = "?";
            this.tier1ResourceGeneration[_resourceId].querySelector("h2").textContent = "???";
            return;
        } else {
            this.tier1ResourceGeneration[_resourceId].querySelector("h2").textContent = RESOURCES[_resourceId].DISPLAY_NAME;
        }

        this.updateResourceDisplay(_resourceId, _amount, _isFull);
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

        this.tier1ResourceDisplays[_resourceId].querySelector("[name='resource-display-value']").textContent = _newAmount;
    }

    unlockResource(_resourceId) {
        // TODO: Play an animation and remove the lock from the Resource Icon
        // TODO: Play an animation and unlock the Shrine (Only applies to Tier 1 Resources)
        // TODO: Change he name of the Shrine and activate the button (Only applies to Tier 1 Resources)
        if (RESOURCES[_resourceId].TIER === 1) {
            this.tier1ResourceGeneration[_resourceId].querySelector("h2").textContent = RESOURCES[_resourceId].DISPLAY_NAME;
        }
    }
}