import { ELEMENTS, GENERATION, RESOURCES } from "../data/constants.js";

export class Rift {
    elementId;
    level;
    amountGenerated;
    #elementDisplayName;

    constructor(_elementId, _level) {
        this.elementId = _elementId;
        this.level = _level;
        this.amountGenerated = (this.level >= 1 && this.level < GENERATION[this.elementId].length) ? GENERATION[this.elementId][this.level - 1] : 0;
        this.#elementDisplayName = ELEMENTS[this.elementId].DISPLAY_NAME;
    }

    /*******************
     * GETTERS
     ******************/
    getName = () => { return this.#elementDisplayName + " Rift"; }
    getElementId = () => { return this.elementId; }
    getLevel = () => { return this.level; }
    getAmountGenerated = () => { return this.amountGenerated; }
    getImageName = () => { return this.#elementDisplayName + "Rift" + (Math.floor(this.level / 10) + 1); }
    getImageAlt = () => { return this.#elementDisplayName + " Rift " + (Math.floor(this.level / 10) + 1); }

    /**
     * Set the level of the Rift to the value passed in
     * @param {Number} newLevel The new level for the Rift
     * @returns false if newLevel is not a valid number, true otherwise
     */
    setLevel = newLevel => {
        // Check if the new level is correct
        if (newLevel <= 0 || newLevel > GENERATION[this.elementId].length) {
            return false;
        }

        this.level = newLevel;

        // Update amountGenerated to the new amount
        this.amountGenerated = GENERATION[this.elementId][this.level - 1];

        return true;
    }

    /**
     * Levels up the Rift if it's not already at max level
     */
    levelUpRift = () => {
        // Check the Rift isn't already max level
        if (level === GENERATION[this.elementId].length) {
            return;
        }
        
        return this.setLevel(this.level + 1);
    }
}