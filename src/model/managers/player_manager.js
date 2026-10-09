import { CAPACITY, MAX_PLAYER_LEVEL, PLAYER_LEVEL_UP_REQS, RESOURCES } from "../data/constants.js";
import { Resource } from "../entities/resource.js";

export class PlayerManager {
    #level = 1;
    #resources = {};

    constructor() {
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // TODO: Take into account storage buffs after save file is implemented
            this.#resources[resource.ID] = new Resource(resource.ID, CAPACITY[resource.ID][this.#level - 1]);
        });
    }

    ////////////////////////////////////////////////
    // ACCESSORS
    ////////////////////////////////////////////////
    getLevel() { return this.#level; }
    getResourceCapacity(_resourceId) { return this.#resources[_resourceId].getCapacity(); }
    getResourceAmount(_resourceId) { return this.#resources[_resourceId].getAmount(); }
    getAllResourcesCapacities() {
        let capacities = {};
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            capacities[resource.ID] = this.#resources[resource.ID].getCapacity();
        });

        return capacities;
    }

    ////////////////////////////////////////////////
    // PUBLIC FUNCTIONS
    ////////////////////////////////////////////////
    increaseResourceAmount(_resourceId, amount) { return this.#resources[_resourceId].increaseAmount(amount); }
    removeResourceAmount(_resourceId, amount) { this.#resources[_resourceId].decreaseAmount(amount); }
    isResourceFull(_resourceId) { return this.getResourceAmount(_resourceId) >= this.getResourceCapacity(_resourceId); }
    isResourceUnlocked(_resourceId) { return this.getResourceCapacity(_resourceId) > 0; }

    /**
     * Obtain the requirements to level up the player
     * @returns an array of requirement Objects:
     *  - RESOURCE: String (ResourceID);
     *  - AMOUNT: Number (Amount Required);
     *  - CURRENT_AMOUNT: Number (Amount currently owned);
     *  - FULFILLED: Boolean (CURRENT_AMOUNT >= AMOUNT);
     */
    getNextLevelReqInfo() {
        // If the player is at max level (Or not at a valid range), return
        // TODO: Might be good to add different return values for different errors?
        if (this.#level >= MAX_PLAYER_LEVEL || this.#level <= 0) {
            return null;
        }

        // Obtain the requirements for the current level to level up from the Constants file
        let reqsInfo = structuredClone(PLAYER_LEVEL_UP_REQS[this.#level - 1]);
        
        // Add extra information to each requirement
        Array.from(reqsInfo).forEach(req => {
            // Add the amount of this resource the Player currently has
            req.CURRENT_AMOUNT = this.getResourceAmount(req.RESOURCE);
            // Add whether the requirement is satisfied for this resource
            req.FULFILLED = req.CURRENT_AMOUNT >= req.AMOUNT;
            req.UNLOCKED = this.isResourceUnlocked(req.RESOURCE);
        });

        return reqsInfo;
    }

    /**
     * Levels up the Player if they're not already Max Level
     */
    levelUp() {
        // If the player hasn't reached max level yet
        if (this.#level < MAX_PLAYER_LEVEL) {
            // Increase the level
            this.#level++;

            // Update each resource's capacity
            Array.from(Object.values(RESOURCES)).forEach(resource => {
                this.#resources[resource.ID].setCapacity(CAPACITY[resource.ID][this.#level - 1]);
            });
        }
    }
}