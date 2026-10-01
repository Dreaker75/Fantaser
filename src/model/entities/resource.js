import { RESOURCES } from "../data/constants.js";

export class Resource {
    #resourceId;
    #capacity;
    #amount = 0;

    constructor(_id, _capacity) {
        this.#resourceId = _id;
        this.#capacity = _capacity;
    }

    ////////////////////////////////////////////////
    // ACCESSORS
    ////////////////////////////////////////////////
    getDisplayName() { return RESOURCES[this.#resourceId].DISPLAY_NAME; }
    getCapacity() { return this.#capacity; }
    getAmount() { return this.#amount; }

    ////////////////////////////////////////////////
    // MUTATORS
    ////////////////////////////////////////////////
    setCapacity(newCapacity) {
        if (newCapacity > 0) {
            this.#capacity = newCapacity;
        }
    }

    ////////////////////////////////////////////////
    // PUBLIC FUNCTIONS
    ////////////////////////////////////////////////
    /**
     * Increases the resource by the specified amount
     * @param {Number} _amount 
     * @returns true if the storage is filled after the increase, false otherwise
     */
    increaseAmount(_amount) {
        return this.#alterAmount(_amount);
    }

    /**
     * Reduces the resource by the specified amount. 
     * @param {Number} _amount 
     * @returns false if the amount to remove is higher than the amount currently stored, true otherwise
     */
    decreaseAmount(_amount) {
        if (_amount > this.#amount) {
            return false;
        }

        this.#alterAmount(-_amount);
        return true;
    }

    ////////////////////////////////////////////////
    // HELPER FUNCTIONS
    ////////////////////////////////////////////////
    /**
     * Increases the resource by the specified amount
     * - Function assumes #amount will never go below 0 if it's negative, needs to be checked before calling this function
     * @param {Number} _amount 
     * @returns true if the storage is filled after the increase, false otherwise
     */
    #alterAmount(_amount) {
        this.#amount += _amount;
        if (this.#amount > this.#capacity) {
            this.#amount = this.#capacity;
        }

        return this.#amount >= this.#capacity;
    }
}