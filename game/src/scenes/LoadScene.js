import { CONFIG } from '../config'
import { CST } from '../CST'
import { LEVEL, REQUESTS } from '../Level'
import { LEVELCONFIG } from '../LevelConfig'

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {

    }
    preload() {

        // load assets
        this.load.setBaseURL(CONFIG.ASSETS_URL)

        // // for title screen
        this.load.image(CST.TITLE.BACKGROUND, 'title/bg.png')
        this.load.image(CST.TITLE.PLAY, 'title/button_play.png')
        this.load.image(CST.TITLE.CREDITS, 'title/button_credits.png')
        this.load.image(CST.TITLE.MINI, 'title/mini.png')
        // this.load.image(CST.TITLE.OPTIONS, 'title/button_options.png')

        // // for credits screen
        this.load.image(CST.CREDITS.TEXT, 'credits/credits.png')
        this.load.image(CST.CREDITS.BUTTON, 'credits/exit_button.png')

        // // for levels
        this.load.image(CST.LEVEL.BACKGROUND, 'level/bg.png')
        this.load.image(CST.ICONS.TEMPERATURE, 'level/status_icons/temperature_icon.png')
        this.load.image(CST.ICONS.HUMIDITY, 'level/status_icons/humidity_icon.png')
        this.load.image(CST.ICONS.BATTERY, 'level/status_icons/battery_icon.png')
        // // // weather icons
        this.load.image(CST.WEATHER.REGULAR.ICON, 'level/status_icons/weather/regular.png')
        this.load.image(CST.WEATHER.CHILL.ICON, 'level/status_icons/weather/rain.png')
        this.load.image(CST.WEATHER.COLD.ICON, 'level/status_icons/weather/snow.png')
        this.load.image(CST.WEATHER.HOT.ICON, 'level/status_icons/weather/sunny.png')
        this.load.image(CST.WEATHER.WARM.ICON, 'level/status_icons/weather/warm.png')

        // // // destinations
        this.load.image(CST.DEST.SELECTED, 'level/dest/selected.png')
        this.load.image(CST.DEST.HOME, 'level/dest/home.png')
        this.load.image(CST.DEST.HOME_OUT, 'level/dest/home_out.png')
        this.load.image(CST.DEST.WORK, 'level/dest/work.png')
        this.load.image(CST.DEST.WORK_OUT, 'level/dest/work_out.png')
        this.load.image(CST.DEST.SUPERMARKET, 'level/dest/supermarket.png')
        this.load.image(CST.DEST.SUPERMARKET_OUT, 'level/dest/supermarket_out.png')

        // // // routes
        this.load.image(CST.LEVEL.ROUTE.OPEN, 'level/routes/open.png')
        this.load.image(CST.LEVEL.ROUTE.CLOSED, 'level/routes/closed.png')
        this.load.image(CST.LEVEL.ROUTE.BAR_EMPTY, 'level/routes/bar_empty.png')
        this.load.image(CST.LEVEL.ROUTE.BAR_FULL, 'level/routes/bar_full.png')
        this.load.image(CST.LEVEL.ROUTE.HOME, 'level/routes/home.png')
        this.load.image(CST.LEVEL.ROUTE.WORK, 'level/routes/work.png')
        this.load.image(CST.LEVEL.ROUTE.SUPERMARKET, 'level/routes/supermarket.png')

        // // // battery bar
        this.load.image(CST.LEVEL.BATTERY.FULL, 'level/battery_full_bar.png')
        this.load.image(CST.LEVEL.BATTERY.USABLE, 'level/battery_usable_bar.png')
        this.load.image(CST.LEVEL.BATTERY.USED, 'level/battery_used_bar.png')

        // // // mockups
        this.load.image(CST.PLACEHOLDER.MAP, 'level/mocks/map.png')
        this.load.image(CST.PLACEHOLDER.POWERUPS, 'level/mocks/powerups.png')

        // // // go button
        this.load.image(CST.LEVEL.GO.USABLE, 'level/go_button.png')
        this.load.image(CST.LEVEL.GO.UNUSABLE, 'level/go_unusable.png')

        /*
            @@@ JUST IN CASE @@@
            Creating a loading bar
            Loader events:
                complete - when done loading everything
                progress - loader number progress in decimal
        */

        const urls = {}
        for (const [i, level] of Object.entries(LEVELCONFIG.LEVELS)) {
            const waypoints = level.DESIRED_ROUTE.map(
                x => level.GAMEPLAY.destinations[x].map_url
            )
            if (waypoints.length < 2) return
            const url = LEVEL.makeUrlFromWaypoints(waypoints)
            urls[i] = url
        }
        this.scene.launch(CST.SCENES.DEFER, {
            type: REQUESTS.INIT,
            data: LEVELCONFIG.LEVELS,
            url: urls,
        })

    }
    create() {
        this.scene.start(CST.SCENES.MENU)
    }
}
