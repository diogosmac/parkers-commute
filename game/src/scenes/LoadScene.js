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

    }
    create() {
        this.scene.start(CST.SCENES.MENU, { string: 'Hello from the Load scene' })
    }
}
