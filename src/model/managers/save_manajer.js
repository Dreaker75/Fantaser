import { GAME_NAME, GAME_VERSION, RESOURCES, SAVE_KEYS } from "../data/constants.js";

export class SaveManager {
    ////////////////////////////////////////////////
    // ACCESSORS
    // - Obtains the value saved for the specific data
    // - If the specific data doesn't exist, returns 0
    ////////////////////////////////////////////////
    getSavedPlayerLevel = () => {
        return Number(localStorage.getItem(SAVE_KEYS.PLAYER_LEVEL));
    }

    getSavedRiftLevel = _resourceId => {
        return Number(localStorage.getItem(SAVE_KEYS.RIFTS[_resourceId]));
    }

    getSavedResourceAmount = _resourceId => {
        return Number(localStorage.getItem(_resourceId));
    }

    ////////////////////////////////////////////////
    // MUTATORS
    // - Creates or replaces the specified data with the given value
    ////////////////////////////////////////////////
    savePlayerLevel = level => {
        localStorage.setItem(SAVE_KEYS.PLAYER_LEVEL, level);
    }

    saveRiftLevel = (_resourceId, _level) => {
        localStorage.setItem(SAVE_KEYS.RIFTS[_resourceId], _level);
    }

    saveResourceAmount = (_resourceId, amount) => {
        localStorage.setItem(_resourceId, amount);
    }

    ////////////////////////////////////////////////
    // PUBLIC FUNCTIONS
    ////////////////////////////////////////////////
    /**
     * Clears all the contents from localStorage
     */
    deleteSave = () => {
        localStorage.clear();
    }

    /**
     * Get all the save information in a ready to export format
     * @returns An object containing all the saved data for the current game
     */
    exportSave = () => {
        let saveData = {};
        let currData;
        // We add the name of the game and its version for possible future use
        saveData["game"] = GAME_NAME;
        saveData["game_version"] = GAME_VERSION;

        // Save the player level
        currData = this.getSavedPlayerLevel();
        if (currData) {
            saveData[SAVE_KEYS.PLAYER_LEVEL] = currData;
        }

        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // Save the Rift level, if it exists
            currData = this.getSavedRiftLevel(resource.ID);
            if (currData) {
                saveData[SAVE_KEYS.RIFTS[resource.ID]] = currData;
            }

            // Save the amount of this resource, if it's bigger than 0
            currData = this.getSavedResourceAmount(resource.ID);
            if (currData) {
                saveData[resource.ID] = currData;
            }
        });
        
        return saveData;
    }

    /**
     * Loads the imported save
     * @param {Object} saveData A JSON object containing all the game data
     * @returns true if the data was imported successfully, false otherwise
     */
    importSave = saveData => {
        // Check if this save data is for this game
        if (saveData["game"] !== GAME_NAME) {
            // If it's not, we return with a failure
            return false;
        }

        // Obtain the player level
        let currData = saveData[SAVE_KEYS.PLAYER_LEVEL];
        if (currData) {
            // Update the player level on our game
            this.savePlayerLevel(currData);
        }

        Array.from(Object.values(RESOURCES)).forEach(resource => {
            // Obtain and save the rift level
            currData = saveData[SAVE_KEYS.RIFTS[resource.ID]];
            if (currData) {
                this.saveRiftLevel(resource.ID, currData);
            }

            // Obtain and save the resource amount
            currData = saveData[resource.ID];
            if (currData) {
                this.saveResourceAmount(resource.ID, currData);
            }
        })

        // The import was successful
        return true;
    }
}