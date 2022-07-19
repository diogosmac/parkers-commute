import { CST } from '../CST'
import { LEVELCONFIG } from '../LevelConfig'
import { UTILS } from '../Utils'

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
            this.scene.start(
                CST.SCENES.LEVEL,
                UTILS.copy(LEVELCONFIG.LEVELS[LEVELCONFIG.NEXT++])
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
            this.scene.start(CST.SCENES.CREDITS)
        })

    }
}
