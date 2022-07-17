import { CONFIG } from "./config"
import { CST } from "./CST"

export const LEVELCONFIG = {
    NEXT: 1,

    // DATA: flavor data for the level
    // GAMEPLAY: gameplay elements for the level
    // DESIRED_ROUTE: used to calculate battery capacity
    LEVELS: {
        1: {
            DATA: {
                weather: CST.WEATHER.REGULAR.ICON,
                temperature: CST.WEATHER.REGULAR.TEMP,
                humidity: '77',
                max_battery: '40',
                max_battery_dec: 0.4,
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
                weather: CST.WEATHER.REGULAR.ICON,
                temperature: CST.WEATHER.REGULAR.TEMP,
                humidity: '77',
                max_battery: '40',
                max_battery_dec: 0.4,
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
            },
            DESIRED_ROUTE: ['Home', 'Work', 'Home', 'Supermarket', 'Home']
        }
    }
}