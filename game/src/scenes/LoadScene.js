import { CONFIG } from '../modules/config'
import { CST } from '../modules/CST'
import { LEVEL, REQUESTS } from '../modules/Level'
import { LEVELCONFIG } from '../modules/LevelConfig'

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

        // // // powerups
        this.load.image(CST.LEVEL.POWERUPS.BAR, 'level/powerups/bar.png')
        this.load.image(CST.LEVEL.POWERUPS.HOT, 'level/powerups/hot.png')
        this.load.image(CST.LEVEL.POWERUPS.HEAT, 'level/powerups/heating.png')
        this.load.image(CST.LEVEL.POWERUPS.COLD, 'level/powerups/cold.png')
        this.load.image(CST.LEVEL.POWERUPS.COOL, 'level/powerups/cooling.png')
        this.load.image(CST.LEVEL.POWERUPS.DOUBLETIME, 'level/powerups/double-time.png')
        this.load.image(CST.LEVEL.POWERUPS.POWERDOWN, 'level/powerups/power-down.png')
        this.load.image(CST.LEVEL.POWERUPS.SELECTED, 'level/powerups/selected.png')
        this.load.image(CST.LEVEL.POWERUPS.DISABLED, 'level/powerups/unusable.png')

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

        // // // modals
        this.load.image(CST.MODALS.BG, 'modals/overlay-bg.png')
        this.load.image(CST.MODALS.INTRO, 'modals/1_intro.png')
        this.load.image(CST.MODALS.TUTORIAL_1, 'modals/2_tutorial_1-3.png')
        this.load.image(CST.MODALS.TUTORIAL_2, 'modals/2_tutorial_2-3.png')
        this.load.image(CST.MODALS.TUTORIAL_3, 'modals/2_tutorial_3-3.png')
        this.load.image(CST.MODALS.POWERUPS_1, 'modals/3_powerups_1-3.png')
        this.load.image(CST.MODALS.POWERUPS_2, 'modals/3_powerups_2-3.png')
        this.load.image(CST.MODALS.POWERUPS_3, 'modals/3_powerups_3-3.png')
        this.load.image(CST.MODALS.NOMOREHELP, 'modals/4_no-more-help.png')
        this.load.image(CST.MODALS.EOL, 'modals/5_end-of-level.png')
        this.load.image(CST.MODALS.GAMEOVER_1, 'modals/6_end-of-game_1-2.png')
        this.load.image(CST.MODALS.GAMEOVER_2, 'modals/6_end-of-game_2-2.png')
        this.load.image(CST.MODALS.NAV_L, 'modals/button_left.png')
        this.load.image(CST.MODALS.NAV_R, 'modals/button_right.png')
        this.load.image(CST.MODALS.BTN_INTRO, 'modals/button_lets-go.png')
        this.load.image(CST.MODALS.BTN_TUTORIAL, 'modals/button_got-it.png')
        this.load.image(CST.MODALS.BTN_POWERUPS, 'modals/button_im-ready.png')
        this.load.image(CST.MODALS.BTN_NOMOREHELP, 'modals/button_thumbs-up.png')
        this.load.image(CST.MODALS.BTN_EOL_BACK, 'modals/button_level-repeat.png')
        this.load.image(CST.MODALS.BTN_EOL_ADVANCE, 'modals/button_level-advance.png')
        this.load.image(CST.MODALS.BTN_MAINMENU, 'modals/button_main-menu.png')

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
