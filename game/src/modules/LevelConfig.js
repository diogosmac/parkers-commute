import { CONFIG } from './config'
import { CST } from './CST'
import { LEVEL } from './Level'

export const LEVELCONFIG = {
    NEXT: 1,

    // DATA: flavor data for the level
    // GAMEPLAY: gameplay elements for the level
    // DESIRED_ROUTE: used to calculate battery capacity
    LEVELS: {
        1: {
            DATA: {
                WEATHER: CST.WEATHER.REGULAR,
            },
            GAMEPLAY: {
                current_battery: '0%',
                next_route: 1,
                selected_route: null,
                destinations: {
                    'Home': {
                        icon: CST.DEST.HOME,
                        icon_out: CST.DEST.HOME_OUT,
                        route: CST.LEVEL.ROUTE.HOME,
                        uses: 1,
                        screen_position: {
                            x: 253,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.HOME,
                    },
                    'Supermarket': {
                        icon: CST.DEST.SUPERMARKET,
                        icon_out: CST.DEST.SUPERMARKET_OUT,
                        route: CST.LEVEL.ROUTE.SUPERMARKET,
                        uses: 1,
                        screen_position: {
                            x: 253 + 91.18,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.SUPERMARKET,
                    }
                },
                routes: [
                    {
                        name: 'Home',
                        icon: CST.LEVEL.ROUTE.HOME,
                    },
                ],
            },
            DESIRED_ROUTES: [
                ['Home', 'Supermarket', 'Home'],
            ],
            script_key: 1,
            script: function (l) {
                LEVEL.launchModal(l, {
                    text: [CST.MODALS.TUTORIAL_1, CST.MODALS.TUTORIAL_2, CST.MODALS.TUTORIAL_3],
                    btn: CST.MODALS.BTN_TUTORIAL
                })
            }
        },
        2: {
            DATA: {
                WEATHER: CST.WEATHER.REGULAR,
            },
            GAMEPLAY: {
                current_battery: '0%',
                next_route: 1,
                selected_route: null,
                destinations: {
                    'Home': {
                        icon: CST.DEST.HOME,
                        icon_out: CST.DEST.HOME_OUT,
                        route: CST.LEVEL.ROUTE.HOME,
                        uses: 1,
                        screen_position: {
                            x: 253,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.HOME,
                    },
                    'Work': {
                        icon: CST.DEST.WORK,
                        icon_out: CST.DEST.WORK_OUT,
                        route: CST.LEVEL.ROUTE.WORK,
                        uses: 1,
                        screen_position: {
                            x: 253 + 91.18,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.WORK,
                    },

                },
                routes: [
                    {
                        name: 'Home',
                        icon: CST.LEVEL.ROUTE.HOME,
                    },
                ],
                powerups: [
                    'Hot',
                    'Cooling',
                ]
            },
            DESIRED_ROUTES: [
                ['Home', 'Work', 'Home'],
            ],
            DESIRED_POWERUPS: ['Hot', 'Cooling'],
            script_key: 2,
            script: function (l) {
                LEVEL.launchModal(l, {
                    text: [CST.MODALS.POWERUPS_1, CST.MODALS.POWERUPS_2, CST.MODALS.POWERUPS_3],
                    btn: CST.MODALS.BTN_POWERUPS
                })
            }
        },
        3: {
            DATA: {
                WEATHER: CST.WEATHER.REGULAR,
            },
            GAMEPLAY: {
                current_battery: '0%',
                next_route: 1,
                selected_route: null,
                destinations: {
                    'Home': {
                        icon: CST.DEST.HOME,
                        icon_out: CST.DEST.HOME_OUT,
                        route: CST.LEVEL.ROUTE.HOME,
                        uses: 1,
                        screen_position: {
                            x: 253,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.HOME,
                    },
                    'Supermarket': {
                        icon: CST.DEST.SUPERMARKET,
                        icon_out: CST.DEST.SUPERMARKET_OUT,
                        route: CST.LEVEL.ROUTE.SUPERMARKET,
                        uses: 1,
                        screen_position: {
                            x: 253 + 91.18,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.SUPERMARKET,
                    },
                    'Gym': {
                        icon: CST.DEST.GYM,
                        icon_out: CST.DEST.GYM_OUT,
                        route: CST.LEVEL.ROUTE.GYM,
                        uses: 1,
                        screen_position: {
                            x: 253 + 91.18 * 2,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.GYM,
                    },
                },
                routes: [
                    {
                        name: 'Home',
                        icon: CST.LEVEL.ROUTE.HOME,
                    },
                ],
                powerups: [
                    'Hot',
                    'Cooling',
                    'Cold',
                    'Heating',
                ]
            },
            DESIRED_ROUTES: [
                ['Home', 'Supermarket', 'Gym', 'Home'],
                ['Home', 'Gym', 'Supermarket', 'Home'],
            ],
            DESIRED_POWERUPS: ['Cold', 'Heating'],
            script_key: 3,
            script: function (l) {
                LEVEL.launchModal(l, {
                    text: CST.MODALS.NOMOREHELP,
                    btn: CST.MODALS.BTN_NOMOREHELP
                })
            }
        },
        4: {
            DATA: {
                WEATHER: CST.WEATHER.REGULAR,
            },
            GAMEPLAY: {
                next_route: 1,
                selected_route: null,
                destinations: {
                    'Home': {
                        icon: CST.DEST.HOME,
                        icon_out: CST.DEST.HOME_OUT,
                        route: CST.LEVEL.ROUTE.HOME,
                        uses: 2,
                        screen_position: {
                            x: 219,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.HOME,
                    },
                    'Work': {
                        icon: CST.DEST.WORK,
                        icon_out: CST.DEST.WORK_OUT,
                        route: CST.LEVEL.ROUTE.WORK,
                        uses: 1,
                        screen_position: {
                            x: 219 + 91.18,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.WORK,
                    },
                    'Supermarket': {
                        icon: CST.DEST.SUPERMARKET,
                        icon_out: CST.DEST.SUPERMARKET_OUT,
                        route: CST.LEVEL.ROUTE.SUPERMARKET,
                        uses: 1,
                        screen_position: {
                            x: 219 + 91.18 * 2,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.SUPERMARKET,
                    },
                    'Gym': {
                        icon: CST.DEST.GYM,
                        icon_out: CST.DEST.GYM_OUT,
                        route: CST.LEVEL.ROUTE.GYM,
                        uses: 1,
                        screen_position: {
                            x: 219 + 91.18 * 3,
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.GYM,
                    },
                },
                routes: [
                    {
                        name: 'Home',
                        icon: CST.LEVEL.ROUTE.HOME,
                    },
                ],
                powerups: [
                    'Hot',
                    'Cooling',
                    'Double-Time',
                    'Power-Down',
                ]
            },
            DESIRED_ROUTES: [
                ['Home', 'Work', 'Home', 'Gym', 'Supermarket', 'Home'],
                ['Home', 'Work', 'Home', 'Supermarket', 'Gym', 'Home'],
                ['Home', 'Work', 'Gym', 'Home', 'Supermarket', 'Home'],
                ['Home', 'Work', 'Supermarket', 'Home', 'Gym', 'Home'],
                ['Home', 'Gym', 'Home', 'Supermarket', 'Work', 'Home'],
                ['Home', 'Gym', 'Home', 'Work', 'Supermarket', 'Home'],
                ['Home', 'Gym', 'Supermarket', 'Home', 'Work', 'Home'],
                ['Home', 'Gym', 'Work', 'Home', 'Supermarket', 'Home'],
                ['Home', 'Supermarket', 'Home', 'Work', 'Gym', 'Home'],
                ['Home', 'Supermarket', 'Home', 'Gym', 'Work', 'Home'],
                ['Home', 'Supermarket', 'Work', 'Home', 'Gym', 'Home'],
                ['Home', 'Supermarket', 'Gym', 'Home', 'Work', 'Home'],
            ],
            DESIRED_POWERUPS: ['Hot', 'Cooling', 'Double-Time', 'Power-Down'],
        }
    }
}