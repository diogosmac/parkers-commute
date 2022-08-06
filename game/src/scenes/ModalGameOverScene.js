import { CST } from '../modules/CST'

export class ModalGameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MODAL_GAMEOVER
        })
    }
    init(data) {
        if (Object.keys(data).length == 0) {
            console.error('No data was received from the loading scene')
        }
    }
    preload() {

    }
    create() {
        this.add.image(0, 0, CST.TITLE.BACKGROUND).setOrigin(0).setDepth(0)
        const bg = this.add.image(0, 0, CST.MODALS.BG).setOrigin(0).setDepth(1)
        // block accidental inputs
        bg.setInteractive()

        this.add.image(58, 50, CST.MODALS.GAMEOVER).setOrigin(0).setDepth(2)

        const button = this.add.image(
            302.64,
            450,
            CST.MODALS.BTN_MAINMENU
        ).setOrigin(0).setDepth(3)
        button.setInteractive()
        button.on(CST.MOUSE.CLICK_RELEASE, () => {
            this.scene.start(CST.SCENES.LOAD)
        })
    }
}
