import { CST } from '../modules/CST'
import { LEVELCONFIG } from '../modules/LevelConfig'
import { UTILS } from '../modules/Utils'

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    preload() {
        const map_place = document.getElementById('gm-place')
        map_place.style.display = 'none'
        const map_directions = document.getElementById('gm-directions')
        map_directions.style.display = 'none'
    }
    create() {      // creating the menu screen

        // create images (z order)
        this.add.image(0, 0, CST.TITLE.BACKGROUND).setOrigin(0).setDepth(0)
        let playButton = this.add.image(
            this.game.renderer.width / 2,
            this.game.renderer.height / 2,
            CST.TITLE.PLAY
        ).setDepth(2)
        let optionsButton = this.add.image(
            this.game.renderer.width / 2,
            this.game.renderer.height / 2 + 100,
            CST.TITLE.CREDITS
        ).setDepth(2)

        // create sprites (if using pixel art, remove sharpen)
        let hoverSprite = this.add.image(
            100,
            100,
            CST.TITLE.MINI
        ).setScale(0.75).setVisible(false)

        // make image buttons interactive

        // /*
        //     PointerEvents:
        //         pointerover - hovering
        //         pointerout - not hovering
        //         pointerup - click and release
        //         pointerdown - just click
        // */

        playButton.setInteractive()
        playButton.on(CST.MOUSE.HOVER, () => {
            hoverSprite.x = playButton.x - playButton.width * 0.8
            hoverSprite.y = playButton.y
            hoverSprite.setVisible(true)
        })
        playButton.on(CST.MOUSE.LEAVE, () => {
            hoverSprite.setVisible(false)
        })
        playButton.on(CST.MOUSE.CLICK_RELEASE, () => {
            // only allows playing once all of
            // the levels have been calculated
            for (const level of Object.values(LEVELCONFIG.LEVELS)) {
                if (!level.hasOwnProperty('MAX_AUTONOMY')) return
            }
            // if it passes the check, the player may start
            this.scene.launch(
                CST.SCENES.MODAL_T,
                {
                    content: {
                        text: CST.MODALS.INTRO,
                        btn: CST.MODALS.BTN_INTRO,
                    },
                    next: CST.SCENES.LEVEL,
                    next_data: UTILS.copy(LEVELCONFIG.LEVELS[LEVELCONFIG.NEXT++]),
                    prev_scene: this.scene
                }
            )
        })

        optionsButton.setInteractive()
        optionsButton.on(CST.MOUSE.HOVER, () => {
            hoverSprite.x = optionsButton.x - optionsButton.width * 0.8
            hoverSprite.y = optionsButton.y
            hoverSprite.setVisible(true)
        })
        optionsButton.on(CST.MOUSE.LEAVE, () => {
            hoverSprite.setVisible(false)
        })
        optionsButton.on(CST.MOUSE.CLICK_RELEASE, () => {
            this.scene.launch(CST.SCENES.CREDITS)
        })

    }
}
