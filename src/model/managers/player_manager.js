import { CAPACITY, RESOURCES } from "../data/constants.js";
import { Resource } from "../entities/resource.js";

export class PlayerManager {
    level = 1;
    resources = {};

    constructor() {
        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // TODO: Take into account storage buffs after save file is implemented
            this.resources[resource.ID] = new Resource(resource.ID, CAPACITY[resource.ID][this.level - 1]);
        });
    }

    ////////////////////////////////////////////////
    // ACCESSORS
    ////////////////////////////////////////////////
    getResourceCapacity(_resourceId) { return this.resources[_resourceId].getCapacity(); }
    getResourceAmount(_resourceId) { return this.resources[_resourceId].getAmount(); }

    ////////////////////////////////////////////////
    // PUBLIC FUNCTIONS
    ////////////////////////////////////////////////
    increaseResourceAmount(_resourceId, amount) { return this.resources[_resourceId].increaseAmount(amount); }
    removeResourceAmount(_resourceId, amount) { this.resources[_resourceId].decreaseAmount(amount); }
}