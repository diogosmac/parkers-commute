import { CST } from '../CST'

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {

    }
    preload() {

        // change screen res to 800x600

        // load images, spritesheets, sounds

        // // for title screen
        this.load.image(CST.TITLE.BACKGROUND, './assets/title/bg.png')
        this.load.image(CST.TITLE.PLAY, './assets/title/button_play.png')
        this.load.image(CST.TITLE.OPTIONS, './assets/title/button_options.png')
        this.load.image(CST.TITLE.MINI, './assets/title/mini.png')

        // // for levels
        this.load.image(CST.LEVEL.BACKGROUND, './assets/level/bg.png')
        this.load.image(CST.WEATHER.SUNNY, './assets/level/status_icons/weather/sunny.png')
        this.load.image(CST.ICONS.TEMPERATURE, './assets/level/status_icons/temperature_icon.png')
        this.load.image(CST.ICONS.HUMIDITY, './assets/level/status_icons/humidity_icon.png')
        this.load.image(CST.ICONS.BATTERY, './assets/level/status_icons/battery_icon.png')

        // // // destinations
        this.load.image(CST.DEST.SELECTED, './assets/level/dest/selected.png')
        this.load.image(CST.DEST.HOME, './assets/level/dest/home.png')
        this.load.image(CST.DEST.HOME_OUT, './assets/level/dest/home_out.png')
        this.load.image(CST.DEST.WORK, './assets/level/dest/work.png')
        this.load.image(CST.DEST.WORK_OUT, './assets/level/dest/work_out.png')

        // // // routes
        this.load.image(CST.LEVEL.ROUTE.OPEN, './assets/level/routes/open.png')
        this.load.image(CST.LEVEL.ROUTE.CLOSED, './assets/level/routes/closed.png')
        this.load.image(CST.LEVEL.ROUTE.HOME, './assets/level/routes/home.png')
        this.load.image(CST.LEVEL.ROUTE.WORK, './assets/level/routes/work.png')

        // // // battery bar
        this.load.image(CST.LEVEL.BATTERY.FULL, './assets/level/battery_full_bar.png')
        this.load.image(CST.LEVEL.BATTERY.USABLE, './assets/level/battery_usable_bar.png')

        // // // mockups
        this.load.image(CST.PLACEHOLDER.MAP, './assets/level/mocks/map.png')
        this.load.image(CST.PLACEHOLDER.POWERUPS, './assets/level/mocks/powerups.png')

        // // // go button
        this.load.image(CST.LEVEL.GO.USABLE, './assets/level/go_button.png')
        this.load.image(CST.LEVEL.GO.UNUSABLE, './assets/level/go_unusable.png')

        // // // loading gray overlay
        this.load.image(CST.LEVEL.LOAD, './assets/level/loading_overlay.png')

        /*
            Create a loading bar
            Loader events:
                complete - when done loading everything
                progress - loader number progress in decimal
        */         

    }
    create() {
        this.scene.start(CST.SCENES.MENU, { string: 'Hello from the Load scene' })
    }
}
