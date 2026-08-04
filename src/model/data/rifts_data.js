import { ELEMENTAL, ELEMENTS, RESOURCES, TEMPLATE_STRINGS } from "./constants.js";

export class RiftsData {
    levelUpRequirements = {};

    constructor() {
        // We store the level up requirements for all Rifts
        this.levelUpRequirements[ELEMENTS.CLEAR.ID] = [
            // Level 1
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 5}
            ],
            // Level 2
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 30}
            ],
            // Level 3
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 70}
            ],
            // Level 4
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 120}
            ],
            // Level 5
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 180}
            ],
            // Level 6
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 300}
            ],
            // Level 7
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 440}
            ],
            // Level 8
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 600}
            ],
            // Level 9
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 910}
            ],
            // Level 10
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 1260}
            ],
            // Level 11
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 1650}
            ],
            // Level 12
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 2080}
            ],
            // Level 13
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 2550}
            ],
            // Level 14
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 3240}
            ],
            // Level 15
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 3990}
            ],
            // Level 16
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 4800}
            ],
            // Level 17
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 5670}
            ],
            // Level 18
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 6600}
            ],
            // Level 19
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 7820}
            ],
            // Level 20
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 9120}
            ],
            // Level 21
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 10500}
            ],
            // Level 22
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 11960}
            ],
            // Level 23
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 13500}
            ],
            // Level 24
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 15400}
            ],
            // Level 25
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 17400}
            ],
            // Level 26
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 19500}
            ],
            // Level 27
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 21700}
            ],
            // Level 28
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 24480}
            ],
            // Level 29
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 27390}
            ],
            // Level 30
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 30430}
            ],
            // Level 31
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 33600}
            ],
            // Level 32
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 37440}
            ],
            // Level 33
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 41440}
            ],
            // Level 34
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 45600}
            ],
            // Level 35
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 50700}
            ],
            // Level 36
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 56000}
            ],
            // Level 37
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 61500}
            ],
            // Level 38
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 69300}
            ],
            // Level 39
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 77400}
            ],
            // Level 40
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 85800}
            ],
            // Level 41
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 94500}
            ],
            // Level 42
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 108100}
            ],
            // Level 43
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 122200}
            ],
            // Level 44
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 136800}
            ],
            // Level 45
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 151900}
            ],
            // Level 46
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 170000}
            ],
            // Level 47
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 188700}
            ],
            // Level 48
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 208000}
            ],
            // Level 49
            [
                {RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 238500}
            ],
        ];

        this.levelUpRequirements[ELEMENTS.ENERGY.ID] = [
            // Level 1
            [
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 11},
            ],
            // Level 2
            [
                {RESOURCE: RESOURCES.KILO_ENERGY.ID, AMOUNT: 1},
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 24},
            ],
            // Level 3
            [
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 39},
            ],
            // Level 4
            [
                {RESOURCE: RESOURCES.MEGA_ENERGY.ID, AMOUNT: 1},
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 56},
            ],
            // Level 5
            [
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 75},
            ],
            // Level 6
            [
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 96},
            ],
            // Level 7
            [
                {RESOURCE: RESOURCES.DATA_BOOST.ID, AMOUNT: 1},
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 119},
            ],
            // Level 8
            [
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 144},
            ],
            // Level 9
            [
                {RESOURCE: RESOURCES.DATA_BOOST.ID, AMOUNT: 3},
                {RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 171},
            ],
        ];

        // The elemental Rifts all have the same requirements but with different Elements, so we store the requirements in a generic template format
        this.levelUpRequirements[ELEMENTAL] = [
            // Level 1
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 10},
            ],
            // Level 2
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 22},
            ],
            // Level 3
            [
                {RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 1},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 48},
            ],
            // Level 4
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 1},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 78},
            ],
            // Level 5
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 126},
            ],
            // Level 6
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 3},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 180},
            ],
            // Level 7
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 256},
            ],
            // Level 8
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 5},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 340},
            ],
            // Level 9
            [
                {RESOURCE: RESOURCES.RAINBOW_FRAGMENT.ID, AMOUNT: 1},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 450},
            ],
            // Level 10
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 570},
            ],
            // Level 11
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 10},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 720},
            ],
            // Level 12
            [
                {RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 20},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 882},
            ],
            // Level 13
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 1078},
            ],
            // Level 14
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 1},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 1288},
            ],
            // Level 15
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 1536},
            ],
            // Level 16
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 2},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 1800},
            ],
            // Level 17
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 3},
                {RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 10},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 2106},
            ],
            // Level 18
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 2430},
            ],
            // Level 19
            [
                {RESOURCE: RESOURCES.RAINBOW_FRAGMENT.ID, AMOUNT: 3},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 2800},
            ],
            // Level 20
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 3190},
            ],
            // Level 21
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 50},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 3630},
            ],
            // Level 22
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 4092},
            ],
            // Level 23
            [
                {RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 250},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 4608},
            ],
            // Level 24
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 1},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 5148},
            ],
            // Level 25
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 5746},
            ],
            // Level 26
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 2},
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 100},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 6370},
            ],
            // Level 27
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 7056},
            ],
            // Level 28
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 3},
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 5},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 7770},
            ],
            // Level 29
            [
                {RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 1},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 8550},
            ],
            // Level 30
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 9360},
            ],
            // Level 31
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 10},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 10240},
            ],
            // Level 32
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 5},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 11152},
            ],
            // Level 33
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 12138},
            ],
            // Level 34
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 10},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 13158},
            ],
            // Level 35
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 14256},
            ],
            // Level 36
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 20},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 15390},
            ],
            // Level 37
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 10},
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 20},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 16606},
            ],
            // Level 38
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 17860},
            ],
            // Level 39
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 19200},
                {RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 3},
            ],
            // Level 40
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 20580},
            ],
            // Level 41
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 15},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 22050},
            ],
            // Level 42
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 25},
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 30},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 23562},
            ],
            // Level 43
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 25168},
            ],
            // Level 44
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 20},
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 25},
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 30},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 26818},
            ],
            // Level 45
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 28566},
            ],
            // Level 46
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER2, AMOUNT: 200},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 30360},
            ],
            // Level 47
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER3, AMOUNT: 100},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 32256},
            ],
            // Level 48
            [
                {RESOURCE: TEMPLATE_STRINGS.TIER4, AMOUNT: 50},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 34200},
            ],
            // Level 49
            [
                {RESOURCE: RESOURCES.QUARTZ.ID, AMOUNT: 1},
                {RESOURCE: TEMPLATE_STRINGS.TIER1, AMOUNT: 36250},
            ],
        ];
    }

    /**
     * Function to obtain the level up requirements to reach the next Rift level
     * @param {Number} level The current level of the Rift
     * @param {string} element The ID of the Rift's Element
     * @returns The requirements to level up the Rift
     */
    getLevelUpRequirements = (level, element) => {
        // The level cannot be less than 1
        if (level < 1) {
            return null;
        }

        // We check for Clear and Energy Rifts first, since they're easier to handle
        if (ELEMENTS.CLEAR.ID === element || ELEMENTS.ENERGY.ID === element) {
            // The level cannot be higher than the amount of elements in the level up array
            if (this.levelUpRequirements[element].length < level) {
                return null;
            }

            return this.levelUpRequirements[element][level - 1];
        }

        // The level cannot be higher than the amount of elements in the level up array
        if (this.levelUpRequirements[ELEMENTAL].length < level) {
            return null;
        }

        let tier1, tier2, tier3, tier4;

        // Grab the corresponding resource based on the Element received
        switch (element) {
            case ELEMENTS.FIRE.ID:
                tier1 = RESOURCES.FIRE_ESSENCE.ID;
                tier2 = RESOURCES.FIRE_FRAGMENT.ID;
                tier3 = RESOURCES.FIRE_GEM.ID;
                tier4 = RESOURCES.RUBY.ID;
                break;
            case ELEMENTS.WATER.ID:
                tier1 = RESOURCES.WATER_ESSENCE.ID;
                tier2 = RESOURCES.WATER_FRAGMENT.ID;
                tier3 = RESOURCES.WATER_GEM.ID;
                tier4 = RESOURCES.SAPPHIRE.ID;
                break;
            case ELEMENTS.WIND.ID:
                tier1 = RESOURCES.WIND_ESSENCE.ID;
                tier2 = RESOURCES.WIND_FRAGMENT.ID;
                tier3 = RESOURCES.WIND_GEM.ID;
                tier4 = RESOURCES.EMERALD.ID;
                break;
            case ELEMENTS.THUNDER.ID:
                tier1 = RESOURCES.THUNDER_ESSENCE.ID;
                tier2 = RESOURCES.THUNDER_FRAGMENT.ID;
                tier3 = RESOURCES.THUNDER_GEM.ID;
                tier4 = RESOURCES.TOPAZ.ID;
                break;
            case ELEMENTS.EARTH.ID:
                tier1 = RESOURCES.EARTH_ESSENCE.ID;
                tier2 = RESOURCES.EARTH_FRAGMENT.ID;
                tier3 = RESOURCES.EARTH_GEM.ID;
                tier4 = RESOURCES.ZIRCON.ID;
                break;
            case ELEMENTS.LIGHT.ID:
                tier1 = RESOURCES.LIGHT_ESSENCE.ID;
                tier2 = RESOURCES.LIGHT_FRAGMENT.ID;
                tier3 = RESOURCES.LIGHT_GEM.ID;
                tier4 = RESOURCES.DIAMOND.ID;
                break;
            case ELEMENTS.DARK.ID:
                tier1 = RESOURCES.DARK_ESSENCE.ID;
                tier2 = RESOURCES.DARK_FRAGMENT.ID;
                tier3 = RESOURCES.DARK_GEM.ID;
                tier4 = RESOURCES.OBSIDIAN.ID;
                break;
            default:
                return null;
        }

        // We create a full copy of the object (So the original isn't modified)
        let requirements = structuredClone(this.levelUpRequirements[ELEMENTAL][level - 1]);
        
        // Update the template strings with the correct resource
        requirements.forEach(requirement => {
            requirement.RESOURCE = requirement.RESOURCE.replace(TEMPLATE_STRINGS.TIER1, tier1);
            requirement.RESOURCE = requirement.RESOURCE.replace(TEMPLATE_STRINGS.TIER2, tier2);
            requirement.RESOURCE = requirement.RESOURCE.replace(TEMPLATE_STRINGS.TIER3, tier3);
            requirement.RESOURCE = requirement.RESOURCE.replace(TEMPLATE_STRINGS.TIER4, tier4);
        });

        // Return the correct requirements
        return requirements;
    }
}