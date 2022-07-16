import { CST } from '../CST'
import { LEVEL } from '../Level'

export class LevelScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL
        })
    }
    init(data) {
        if (Object.keys(data).length == 0) {
            console.error('No data was received from the loading scene')
        }

        this.level_data = data.DATA
        this.gameplay = data.GAMEPLAY
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
