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
        this.load.image('title_bg', './assets/title_bg.png')
        this.load.image('logo', './assets/logo.png')
        this.load.image('play_button', './assets/button_play.png')
        this.load.image('options_button', './assets/button_options.png')
        this.load.image('mini', './assets/mini.png')

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
