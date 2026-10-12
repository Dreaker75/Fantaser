import { SAVE_KEYS } from "../data/constants.js";

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
}