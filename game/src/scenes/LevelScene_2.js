import { CONFIG } from '../config'
import { CST } from '../CST'
import { LEVEL } from '../Level'

export class LevelTwoScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL_TWO
        })
    }
    init(data) {
        if (Object.keys(data).length > 0) console.info('The data from the loading scene was received')
        else console.info('No data was received from the loading scene')

        // flavor data for the level
        this.level_data = {
            weather: CST.WEATHER.REGULAR.ICON,
            temperature: CST.WEATHER.REGULAR.TEMP,
            humidity: '77',
            max_battery: '40',
            max_battery_dec: 0.4,
        }

        // gameplay elements for the level
        this.gameplay = {
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
        }

    }
    preload() {
        // constant between levels - will be in general "generateLevel" function
        this.visual = {
            map_place: document.getElementById('gm-place'),
            map_directions: document.getElementById('gm-directions')
        }

        this.visual.map_place.style.display = 'block'
        LEVEL.updateGMapsUrl(this)
    }
    create() {

        // open routes are the white squares that signal an available route slot
        // the first slot is always occupied (home)
        this.visual.openRoutes = [ null ]
        // closed routes are the grey squares that signal an unavailable route slot
        // first and second routes will never be closed, as the first route is always set
        this.visual.closedRoutes = [ null, null ]

        this.input.mouse.disableContextMenu()
        LEVEL.setupInterface(this)

        for (let i in this.gameplay.destinations) {
            LEVEL.placeDestinationSquare(this, i)
        }

        LEVEL.setupBatteryBar(this)

        for (let i = 0; i < 8; i++) {
            LEVEL.placeRouteSlot(this, i, 53 + i * 90, 429)
        }

        LEVEL.setupRoutes(this)

        this.visual.goButton = LEVEL.setupGoButton(this)

    }

}
