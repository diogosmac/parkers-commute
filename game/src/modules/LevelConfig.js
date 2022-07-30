import { CONFIG } from './config'
import { CST } from './CST'
import { LEVEL } from './Level'

export const LEVELCONFIG = {
    NEXT: 2,

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
                            x: 282,
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
                            x: 373.18, // 282 + 91.18
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.WORK,
                    }
                },
                routes: [
                    {
                        name: 'Home',
                        icon: CST.LEVEL.ROUTE.HOME,
                    },
                ],
            },
            DESIRED_ROUTE: ['Home', 'Work', 'Home']
        },
        2: {
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
                            x: 282,
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
                            x: 373.18, // 282 + 91.18
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
                            x: 464.36, // 282 + 91.18 * 2
                            y: 23
                        },
                        map_url: CONFIG.LOCATIONS.SUPERMARKET,
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
                    // 'Cold',
                    // 'Heating',
                    'Double-Time',
                    'Power-Down',
                ]
            },
            DESIRED_ROUTE: ['Home', 'Work', 'Home', 'Supermarket', 'Home'],
            DESIRED_POWERUPS: ['Hot', 'Cooling', 'Double-Time', 'Power-Down'],
            script_key: 2,
            script: function (l) {
                LEVEL.launchModal(l, {
                    text: [CST.MODALS.TUTORIAL_1, CST.MODALS.TUTORIAL_2, CST.MODALS.TUTORIAL_3],
                    btn: CST.MODALS.BTN_TUTORIAL
                })
            }
        }
    }
}