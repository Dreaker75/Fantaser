////////////////////////////////////////////////
// Magic Numbers
// The maximum number of different items requested at once to level up the player
export const PLAYER_LEVEL_MAX_NUM_ITEMS = 5;

////////////////////////////////////////////////
// Special Strings
// Used for Elemental Rift's Level Up requirements
export const ELEMENTAL = "ELEMENTAL";
export const TEMPLATE_STRINGS = {
    TIER1: "{TIER1}",
    TIER2: "{TIER2}",
    TIER3: "{TIER3}",
    TIER4: "{TIER4}",
}
export const MENUS = {
    RIFTS: "RIFTS_MENU",
    PLAYER: "PLAYER_MENU",
    CRAFT: "CRAFT_MENU",
}

////////////////////////////////////////////////
// Elements
export const ELEMENTS = {
    CLEAR: {
        ID: "CLEAR",
        DISPLAY_NAME: "Clear"
    },
    FIRE: {
        ID: "FIRE",
        DISPLAY_NAME: "Fire"
    },
    WATER: {
        ID: "WATER",
        DISPLAY_NAME: "Water"
    },
    WIND: {
        ID: "WIND",
        DISPLAY_NAME: "Wind"
    },
    EARTH: {
        ID: "EARTH",
        DISPLAY_NAME: "Earth"
    },
    THUNDER: {
        ID: "THUNDER",
        DISPLAY_NAME: "Thunder"
    },
    LIGHT: {
        ID: "LIGHT",
        DISPLAY_NAME: "Light"
    },
    DARK: {
        ID: "DARK",
        DISPLAY_NAME: "Dark"
    },
    RAINBOW: {
        ID: "RAINBOW",
        DISPLAY_NAME: "Rainbow"
    },
    ENERGY: {
        ID: "ENERGY",
        DISPLAY_NAME: "Energy"
    }
}

////////////////////////////////////////////////
// Resource Types
export const RESOURCES = {
    CLEAR_SHARD: {
        ID: "CLEAR_SHARD",
        DISPLAY_NAME: "Clear Shard",
        ELEMENT: ELEMENTS.CLEAR.ID,
        TIER: 1
    },
    CLEAR_FRAGMENT: {
        ID: "CLEAR_FRAGMENT",
        DISPLAY_NAME: "Clear Fragment",
        ELEMENT: ELEMENTS.CLEAR.ID,
        TIER: 2
    },
    FIRE_ESSENCE: {
        ID: "FIRE_ESSENCE",
        DISPLAY_NAME: "Fire Essence",
        ELEMENT: ELEMENTS.FIRE.ID,
        TIER: 1
    },
    FIRE_FRAGMENT: {
        ID: "FIRE_FRAGMENT",
        DISPLAY_NAME: "Fire Fragment",
        ELEMENT: ELEMENTS.FIRE.ID,
        TIER: 2
    },
    FIRE_GEM: {
        ID: "FIRE_GEM",
        DISPLAY_NAME: "Fire Gem",
        ELEMENT: ELEMENTS.FIRE.ID,
        TIER: 3
    },
    RUBY: {
        ID: "RUBY",
        DISPLAY_NAME: "Ruby",
        ELEMENT: ELEMENTS.FIRE.ID,
        TIER: 4
    },
    WATER_ESSENCE: {
        ID: "WATER_ESSENCE",
        DISPLAY_NAME: "Water Essence",
        ELEMENT: ELEMENTS.WATER.ID,
        TIER: 1
    },
    WATER_FRAGMENT: {
        ID: "WATER_FRAGMENT",
        DISPLAY_NAME: "Water Fragment",
        ELEMENT: ELEMENTS.WATER.ID,
        TIER: 2
    },
    WATER_GEM: {
        ID: "WATER_GEM",
        DISPLAY_NAME: "Water Gem",
        ELEMENT: ELEMENTS.WATER.ID,
        TIER: 3
    },
    SAPPHIRE: {
        ID: "SAPPHIRE",
        DISPLAY_NAME: "Sapphire",
        ELEMENT: ELEMENTS.WATER.ID,
        TIER: 4
    },
    EARTH_ESSENCE: {
        ID: "EARTH_ESSENCE",
        DISPLAY_NAME: "Earth Essence",
        ELEMENT: ELEMENTS.EARTH.ID,
        TIER: 1
    },
    EARTH_FRAGMENT: {
        ID: "EARTH_FRAGMENT",
        DISPLAY_NAME: "Earth Fragment",
        ELEMENT: ELEMENTS.EARTH.ID,
        TIER: 2
    },
    EARTH_GEM: {
        ID: "EARTH_GEM",
        DISPLAY_NAME: "Earth Gem",
        ELEMENT: ELEMENTS.EARTH.ID,
        TIER: 3
    },
    ZIRCON: {
        ID: "ZIRCON",
        DISPLAY_NAME: "Zircon",
        ELEMENT: ELEMENTS.EARTH.ID,
        TIER: 4
    },
    WIND_ESSENCE: {
        ID: "WIND_ESSENCE",
        DISPLAY_NAME: "Wind Essence",
        ELEMENT: ELEMENTS.WIND.ID,
        TIER: 1
    },
    WIND_FRAGMENT: {
        ID: "WIND_FRAGMENT",
        DISPLAY_NAME: "Wind Fragment",
        ELEMENT: ELEMENTS.WIND.ID,
        TIER: 2
    },
    WIND_GEM: {
        ID: "WIND_GEM",
        DISPLAY_NAME: "Wind Gem",
        ELEMENT: ELEMENTS.WIND.ID,
        TIER: 3
    },
    EMERALD: {
        ID: "EMERALD",
        DISPLAY_NAME: "Emerald",
        ELEMENT: ELEMENTS.WIND.ID,
        TIER: 4
    },
    THUNDER_ESSENCE: {
        ID: "THUNDER_ESSENCE",
        DISPLAY_NAME: "Thunder Essence",
        ELEMENT: ELEMENTS.THUNDER.ID,
        TIER: 1
    },
    THUNDER_FRAGMENT: {
        ID: "THUNDER_FRAGMENT",
        DISPLAY_NAME: "Thunder Fragment",
        ELEMENT: ELEMENTS.THUNDER.ID,
        TIER: 2
    },
    THUNDER_GEM: {
        ID: "THUNDER_GEM",
        DISPLAY_NAME: "Thunder Gem",
        ELEMENT: ELEMENTS.THUNDER.ID,
        TIER: 3
    },
    TOPAZ: {
        ID: "TOPAZ",
        DISPLAY_NAME: "Topaz",
        ELEMENT: ELEMENTS.THUNDER.ID,
        TIER: 4
    },
    LIGHT_ESSENCE: {
        ID: "LIGHT_ESSENCE",
        DISPLAY_NAME: "Light Essence",
        ELEMENT: ELEMENTS.LIGHT.ID,
        TIER: 1
    },
    LIGHT_FRAGMENT: {
        ID: "LIGHT_FRAGMENT",
        DISPLAY_NAME: "Light Fragment",
        ELEMENT: ELEMENTS.LIGHT.ID,
        TIER: 2
    },
    LIGHT_GEM: {
        ID: "LIGHT_GEM",
        DISPLAY_NAME: "Light Gem",
        ELEMENT: ELEMENTS.LIGHT.ID,
        TIER: 3
    },
    DIAMOND: {
        ID: "DIAMOND",
        DISPLAY_NAME: "Diamond",
        ELEMENT: ELEMENTS.LIGHT.ID,
        TIER: 4
    },
    DARK_ESSENCE: {
        ID: "DARK_ESSENCE",
        DISPLAY_NAME: "Dark Essence",
        ELEMENT: ELEMENTS.DARK.ID,
        TIER: 1
    },
    DARK_FRAGMENT: {
        ID: "DARK_FRAGMENT",
        DISPLAY_NAME: "Dark Fragment",
        ELEMENT: ELEMENTS.DARK.ID,
        TIER: 2
    },
    DARK_GEM: {
        ID: "DARK_GEM",
        DISPLAY_NAME: "Dark Gem",
        ELEMENT: ELEMENTS.DARK.ID,
        TIER: 3
    },
    OBSIDIAN: {
        ID: "OBSIDIAN",
        DISPLAY_NAME: "Obsidian",
        ELEMENT: ELEMENTS.DARK.ID,
        TIER: 4
    },
    RAINBOW_FRAGMENT: {
        ID: "RAINBOW_FRAGMENT",
        DISPLAY_NAME: "Rainbow Fragment",
        ELEMENT: ELEMENTS.RAINBOW.ID,
        TIER: 3
    },
    RAINBOW_GEM: {
        ID: "RAINBOW_GEM",
        DISPLAY_NAME: "Rainbow Gem",
        ELEMENT: ELEMENTS.RAINBOW.ID,
        TIER: 4
    },
    QUARTZ: {
        ID: "QUARTZ",
        DISPLAY_NAME: "Quartz",
        ELEMENT: ELEMENTS.RAINBOW.ID,
        TIER: 5
    },
    BYTE_ENERGY: {
        ID: "BYTE_ENERGY",
        DISPLAY_NAME: "Byte Energy",
        ELEMENT: ELEMENTS.ENERGY.ID,
        TIER: 1
    },
    KILO_ENERGY: {
        ID: "KILO_ENERGY",
        DISPLAY_NAME: "Kilo Energy",
        ELEMENT: ELEMENTS.ENERGY.ID,
        TIER: 2
    },
    MEGA_ENERGY: {
        ID: "MEGA_ENERGY",
        DISPLAY_NAME: "Mega Energy",
        ELEMENT: ELEMENTS.ENERGY.ID,
        TIER: 3
    },
    GIGA_ENERGY: {
        ID: "GIGA_ENERGY",
        DISPLAY_NAME: "Giga Energy",
        ELEMENT: ELEMENTS.ENERGY.ID,
        TIER: 4
    },
    TERA_ENERGY: {
        ID: "TERA_ENERGY",
        DISPLAY_NAME: "Tera Energy",
        ELEMENT: ELEMENTS.ENERGY.ID,
        TIER: 5
    },
    DATA_BOOST: {
        ID: "DATA_BOOST",
        DISPLAY_NAME: "Data Boost",
        ELEMENT: ELEMENTS.ENERGY.ID,
        TIER: 5
    },
}

////////////////////////////////////////////////
// Rift Generation
export const GENERATION = {};
GENERATION[ELEMENTS.FIRE.ID] =
    GENERATION[ELEMENTS.WATER.ID] =
    GENERATION[ELEMENTS.WIND.ID] =
    GENERATION[ELEMENTS.EARTH.ID] =
    GENERATION[ELEMENTS.THUNDER.ID] =
    GENERATION[ELEMENTS.LIGHT.ID] =
    GENERATION[ELEMENTS.DARK.ID] = [
        1, 2, 4, 6, 9,
        12, 16, 20, 25, 30,
        36, 42, 49, 56, 64,
        72, 81, 90, 100, 110,
        121, 132, 144, 156, 169,
        182, 196, 210, 225, 240,
        256, 272, 289, 306, 324,
        342, 361, 380, 400, 420,
        441, 462, 484, 506, 529,
        552, 576, 600, 625, 650
    ];

GENERATION[ELEMENTS.CLEAR.ID] = [
    1, 5, 10, 15, 20,
    30, 40, 50, 70, 90,
    110, 130, 150, 180, 210,
    240, 270, 300, 340, 380,
    420, 460, 500, 550, 600,
    650, 700, 765, 830, 895,
    960, 1040, 1120, 1200, 1300,
    1400, 1500, 1650, 1800, 1950,
    2100, 2350, 2600, 2850, 3100,
    3400, 3700, 4000, 4500, 5000
];

GENERATION[ELEMENTS.ENERGY.ID] = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10
];

////////////////////////////////////////////////
// Storage Capacity
export const CAPACITY = {};
CAPACITY[RESOURCES.CLEAR_SHARD.ID] = [
    100, 200, 450, 700, 1000,
    2800, 4600, 6400, 8200, 10000,
    28000, 46000, 64000, 82000, 100000,
    130000, 160000, 190000, 220000, 250000,
    300000, 350000, 400000, 450000, 500000
];

CAPACITY[RESOURCES.CLEAR_FRAGMENT.ID] = [
    1, 5, 50, 100, 250,
    500, 750, 1000, 1250, 1500,
    2200, 2900, 3600, 4300, 5000,
    6000, 7000, 8000, 9000, 10000,
    12500, 15000, 18000, 21500, 25000
];

// Elemental capacities
CAPACITY[RESOURCES.FIRE_ESSENCE.ID] =
    CAPACITY[RESOURCES.WATER_ESSENCE.ID] =
    CAPACITY[RESOURCES.WIND_ESSENCE.ID] =
    CAPACITY[RESOURCES.EARTH_ESSENCE.ID] =
    CAPACITY[RESOURCES.THUNDER_ESSENCE.ID] =
    CAPACITY[RESOURCES.LIGHT_ESSENCE.ID] =
    CAPACITY[RESOURCES.DARK_ESSENCE.ID] = [
        10, 100, 250, 500, 1000,
        1800, 2600, 3400, 4200, 5000,
        7000, 9000, 11000, 13000, 15000,
        17000, 19000, 21000, 23000, 25000,
        28000, 31000, 34000, 37000, 40000
    ];

CAPACITY[RESOURCES.FIRE_FRAGMENT.ID] =
    CAPACITY[RESOURCES.WATER_FRAGMENT.ID] =
    CAPACITY[RESOURCES.WIND_FRAGMENT.ID] =
    CAPACITY[RESOURCES.EARTH_FRAGMENT.ID] =
    CAPACITY[RESOURCES.THUNDER_FRAGMENT.ID] =
    CAPACITY[RESOURCES.LIGHT_FRAGMENT.ID] =
    CAPACITY[RESOURCES.DARK_FRAGMENT.ID] = [
        0, 1, 5, 10, 25,
        50, 100, 150, 200, 250,
        400, 550, 700, 850, 1000,
        1200, 1400, 1600, 1800, 2000,
        2400, 2800, 3200, 3600, 4000
    ];

CAPACITY[RESOURCES.FIRE_GEM.ID] =
    CAPACITY[RESOURCES.WATER_GEM.ID] =
    CAPACITY[RESOURCES.WIND_GEM.ID] =
    CAPACITY[RESOURCES.EARTH_GEM.ID] =
    CAPACITY[RESOURCES.THUNDER_GEM.ID] =
    CAPACITY[RESOURCES.LIGHT_GEM.ID] =
    CAPACITY[RESOURCES.DARK_GEM.ID] = [
        0, 0, 0, 1, 5,
        10, 20, 30, 40, 50,
        60, 70, 80, 90, 100,
        130, 160, 190, 220, 250,
        280, 310, 340, 370, 400
    ];

CAPACITY[RESOURCES.RUBY.ID] =
    CAPACITY[RESOURCES.SAPPHIRE.ID] =
    CAPACITY[RESOURCES.EMERALD.ID] =
    CAPACITY[RESOURCES.ZIRCON.ID] =
    CAPACITY[RESOURCES.TOPAZ.ID] =
    CAPACITY[RESOURCES.DIAMOND.ID] =
    CAPACITY[RESOURCES.OBSIDIAN.ID] = [
        0, 0, 0, 0, 0,
        0, 1, 3, 5, 7,
        9, 11, 13, 15, 17,
        19, 21, 23, 25, 27,
        29, 31, 34, 37, 40
    ];

CAPACITY[RESOURCES.RAINBOW_FRAGMENT.ID] = [
    0, 0, 0, 0, 1,
    2, 3, 5, 7, 10,
    12, 14, 16, 18, 20,
    23, 26, 29, 32, 35,
    38, 41, 44, 47, 50
];

CAPACITY[RESOURCES.RAINBOW_GEM.ID] = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    2, 3, 4, 5, 6,
    7, 8, 10, 12, 14,
    16, 18, 20, 22, 25
];

CAPACITY[RESOURCES.QUARTZ.ID] = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 1, 1, 2,
    2, 3, 3, 4, 5
];

CAPACITY[RESOURCES.BYTE_ENERGY.ID] = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 8,
    16, 24, 32, 40, 48,
    56, 64, 76, 88, 100,
    128, 160, 192, 224, 256
];

CAPACITY[RESOURCES.KILO_ENERGY.ID] = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 1, 8, 16, 24,
    32, 40, 48, 56, 64,
    72, 80, 96, 112, 128
];

CAPACITY[RESOURCES.MEGA_ENERGY.ID] = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    2, 4, 8, 16, 24,
    32, 40, 48, 56, 64
];

CAPACITY[RESOURCES.GIGA_ENERGY.ID] = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    4, 8, 16, 24, 32
];

CAPACITY[RESOURCES.TERA_ENERGY.ID] = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 1, 4
];

CAPACITY[RESOURCES.DATA_BOOST.ID] = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 1, 3, 5, 10,
    15, 20, 30, 40, 50
];

// The player's maximum level will be reused later for checks
export const MAX_PLAYER_LEVEL = CAPACITY[RESOURCES.CLEAR_SHARD.ID].length;

export const PLAYER_LEVEL_UP_REQS = [
    // TODO: Update values based on max storage and whatever feels right (rather than max every time)
    // Level 1
    [
        { RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 100 },
        { RESOURCE: RESOURCES.EARTH_ESSENCE.ID, AMOUNT: 10 },
        { RESOURCE: RESOURCES.WIND_ESSENCE.ID, AMOUNT: 10 },
        { RESOURCE: RESOURCES.THUNDER_ESSENCE.ID, AMOUNT: 10 },
    ],
    // Level 2
    [
        { RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.FIRE_FRAGMENT.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.WATER_FRAGMENT.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.LIGHT_FRAGMENT.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.DARK_FRAGMENT.ID, AMOUNT: 1 },
    ],
    // Level 3
    [
        { RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 50 },
        { RESOURCE: RESOURCES.FIRE_FRAGMENT.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.WATER_FRAGMENT.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.EARTH_FRAGMENT.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.WIND_FRAGMENT.ID, AMOUNT: 5 },
    ],
    // Level 4
    [
        { RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 100 },
        { RESOURCE: RESOURCES.THUNDER_GEM.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.LIGHT_GEM.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.DARK_GEM.ID, AMOUNT: 1 },
    ],
    // Level 5
    [
        { RESOURCE: RESOURCES.WATER_GEM.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.THUNDER_GEM.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.DARK_GEM.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.FIRE_GEM.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.RAINBOW_FRAGMENT.ID, AMOUNT: 1 },
    ],
    // Level 6
    [
        { RESOURCE: RESOURCES.LIGHT_GEM.ID, AMOUNT: 10 },
        { RESOURCE: RESOURCES.EARTH_GEM.ID, AMOUNT: 10 },
        { RESOURCE: RESOURCES.WIND_GEM.ID, AMOUNT: 10 },
        { RESOURCE: RESOURCES.RAINBOW_FRAGMENT.ID, AMOUNT: 2 },
    ],
    // Level 7
    [
        { RESOURCE: RESOURCES.DIAMOND.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.OBSIDIAN.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.RAINBOW_FRAGMENT.ID, AMOUNT: 3 },
    ],
    // Level 8
    [
        { RESOURCE: RESOURCES.RUBY.ID, AMOUNT: 3 },
        { RESOURCE: RESOURCES.ZIRCON.ID, AMOUNT: 3 },
        { RESOURCE: RESOURCES.TOPAZ.ID, AMOUNT: 3 },
        { RESOURCE: RESOURCES.RAINBOW_FRAGMENT.ID, AMOUNT: 5 },
    ],
    // Level 9
    [
        { RESOURCE: RESOURCES.RUBY.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.SAPPHIRE.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.EMERALD.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.OBSIDIAN.ID, AMOUNT: 5 },
        { RESOURCE: RESOURCES.RAINBOW_FRAGMENT.ID, AMOUNT: 7 },
    ],
    // Level 10
    [
        { RESOURCE: RESOURCES.DIAMOND.ID, AMOUNT: 7 },
        { RESOURCE: RESOURCES.TOPAZ.ID, AMOUNT: 7 },
        { RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 8 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 1 },
    ],
    // Level 11
    [
        { RESOURCE: RESOURCES.ZIRCON.ID, AMOUNT: 9 },
        { RESOURCE: RESOURCES.EARTH_GEM.ID, AMOUNT: 60 },
        { RESOURCE: RESOURCES.EARTH_FRAGMENT.ID, AMOUNT: 400 },
        { RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 16 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 2 },
    ],
    // Level 12
    [
        { RESOURCE: RESOURCES.EMERALD.ID, AMOUNT: 11 },
        { RESOURCE: RESOURCES.WIND_GEM.ID, AMOUNT: 70 },
        { RESOURCE: RESOURCES.WIND_FRAGMENT.ID, AMOUNT: 550 },
        { RESOURCE: RESOURCES.KILO_ENERGY.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 3 },
    ],
    // Level 13
    [
        { RESOURCE: RESOURCES.TOPAZ.ID, AMOUNT: 13 },
        { RESOURCE: RESOURCES.THUNDER_GEM.ID, AMOUNT: 80 },
        { RESOURCE: RESOURCES.THUNDER_FRAGMENT.ID, AMOUNT: 700 },
        { RESOURCE: RESOURCES.KILO_ENERGY.ID, AMOUNT: 8 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 4 },
    ],
    // Level 14
    [
        { RESOURCE: RESOURCES.RUBY.ID, AMOUNT: 15 },
        { RESOURCE: RESOURCES.FIRE_GEM.ID, AMOUNT: 90 },
        { RESOURCE: RESOURCES.FIRE_FRAGMENT.ID, AMOUNT: 850 },
        { RESOURCE: RESOURCES.KILO_ENERGY.ID, AMOUNT: 16 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 5 },
    ],
    // Level 15
    [
        { RESOURCE: RESOURCES.SAPPHIRE.ID, AMOUNT: 17 },
        { RESOURCE: RESOURCES.WATER_GEM.ID, AMOUNT: 100 },
        { RESOURCE: RESOURCES.WATER_FRAGMENT.ID, AMOUNT: 1000 },
        { RESOURCE: RESOURCES.MEGA_ENERGY.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 6 },
    ],
    // Level 16
    [
        { RESOURCE: RESOURCES.DIAMOND.ID, AMOUNT: 19 },
        { RESOURCE: RESOURCES.LIGHT_GEM.ID, AMOUNT: 130 },
        { RESOURCE: RESOURCES.LIGHT_FRAGMENT.ID, AMOUNT: 1200 },
        { RESOURCE: RESOURCES.MEGA_ENERGY.ID, AMOUNT: 2 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 7 },
    ],
    // Level 17
    [
        { RESOURCE: RESOURCES.OBSIDIAN.ID, AMOUNT: 21 },
        { RESOURCE: RESOURCES.DARK_GEM.ID, AMOUNT: 160 },
        { RESOURCE: RESOURCES.DARK_FRAGMENT.ID, AMOUNT: 1400 },
        { RESOURCE: RESOURCES.DATA_BOOST.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 8 },
    ],
    // Level 18
    [
        { RESOURCE: RESOURCES.QUARTZ.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.MEGA_ENERGY.ID, AMOUNT: 8 },
        { RESOURCE: RESOURCES.DATA_BOOST.ID, AMOUNT: 3 },
    ],
    // Level 19
    [
        { RESOURCE: RESOURCES.EMERALD.ID, AMOUNT: 25 },
        { RESOURCE: RESOURCES.ZIRCON.ID, AMOUNT: 25 },
        { RESOURCE: RESOURCES.TOPAZ.ID, AMOUNT: 25 },
        { RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 9000 },
    ],
    // Level 20
    [
        { RESOURCE: RESOURCES.RUBY.ID, AMOUNT: 27 },
        { RESOURCE: RESOURCES.SAPPHIRE.ID, AMOUNT: 27 },
        { RESOURCE: RESOURCES.GIGA_ENERGY.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.DATA_BOOST.ID, AMOUNT: 10 },
        { RESOURCE: RESOURCES.QUARTZ.ID, AMOUNT: 2 },
    ],
    // Level 21
    [
        { RESOURCE: RESOURCES.OBSIDIAN.ID, AMOUNT: 29 },
        { RESOURCE: RESOURCES.DIAMOND.ID, AMOUNT: 29 },
        { RESOURCE: RESOURCES.GIGA_ENERGY.ID, AMOUNT: 4 },
        { RESOURCE: RESOURCES.DATA_BOOST.ID, AMOUNT: 15 },
        { RESOURCE: RESOURCES.QUARTZ.ID, AMOUNT: 2 },
    ],
    // Level 22
    [
        { RESOURCE: RESOURCES.QUARTZ.ID, AMOUNT: 3 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 18 },
        { RESOURCE: RESOURCES.RAINBOW_FRAGMENT.ID, AMOUNT: 41 },
        { RESOURCE: RESOURCES.CLEAR_FRAGMENT.ID, AMOUNT: 15000 },
        { RESOURCE: RESOURCES.CLEAR_SHARD.ID, AMOUNT: 350000 },
    ],
    // Level 23
    [
        { RESOURCE: RESOURCES.GIGA_ENERGY.ID, AMOUNT: 16 },
        { RESOURCE: RESOURCES.MEGA_ENERGY.ID, AMOUNT: 48 },
        { RESOURCE: RESOURCES.KILO_ENERGY.ID, AMOUNT: 96 },
        { RESOURCE: RESOURCES.BYTE_ENERGY.ID, AMOUNT: 192 },
        { RESOURCE: RESOURCES.DATA_BOOST.ID, AMOUNT: 30 },
    ],
    // Level 24
    [
        { RESOURCE: RESOURCES.QUARTZ.ID, AMOUNT: 4 },
        { RESOURCE: RESOURCES.TERA_ENERGY.ID, AMOUNT: 1 },
        { RESOURCE: RESOURCES.DATA_BOOST.ID, AMOUNT: 40 },
        { RESOURCE: RESOURCES.RAINBOW_GEM.ID, AMOUNT: 22 },
        { RESOURCE: RESOURCES.GIGA_ENERGY.ID, AMOUNT: 24 },
    ],
];