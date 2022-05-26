import { CST } from '../CST'

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data) {
        if (Object.keys(data).length > 0) console.info('The data from the loading scene was received')
        else console.info('No data was received from the loading scene')
    }
    preload() {

    }
    create() {      // creating the menu screen

        // create images (z order)
        this.add.image(0, 0, 'title_bg').setOrigin(0).setDepth(0)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logo').setDepth(2)
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play_button').setDepth(2)
        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'options_button').setDepth(2)

        // create sprites (if using pixel art, remove sharpen)
        let hoverSprite = this.add.image(100, 100, 'mini')
        hoverSprite.setScale(0.75)
        hoverSprite.setVisible(false)

        // create audio, disable pauseonblur
        // this.sound.pauseOnBlur = false
        // this.sound.play('title_music', {
        //     loop: true
        // })

        // make image buttons interactive

        // /*
        //     PointerEvents:
        //         pointerover - hovering
        //         pointerout - not hovering
        //         pointerup - click and release
        //         pointerdown - just click
        // */

        playButton.setInteractive()
        playButton.on('pointerover', () => {
            hoverSprite.x = playButton.x - playButton.width * 0.8
            hoverSprite.y = playButton.y
            hoverSprite.setVisible(true)
        })
        playButton.on('pointerout', () => {
            hoverSprite.setVisible(false)
        })
        playButton.on('pointerup', () => {
            console.info('PLAY: button clicked')
        })

        optionsButton.setInteractive()
        optionsButton.on('pointerover', () => {
            hoverSprite.x = optionsButton.x - optionsButton.width * 0.8
            hoverSprite.y = optionsButton.y
            hoverSprite.setVisible(true)
        })
        optionsButton.on('pointerout', () => {
            hoverSprite.setVisible(false)
        })
        optionsButton.on('pointerup', () => {
            console.info('OPTIONS: button clicked')
        })

    }
}
