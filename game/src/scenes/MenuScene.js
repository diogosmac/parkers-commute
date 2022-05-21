import { CST } from '../CST'

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data) {
        console.log(data.string)
        console.log('I got it!')
    }
    preload() {

    }
    create() {      // creating the menu screen

        // create images (z order)
        this.add.image(0, 0, 'name_of_bg').setOrigin(0).setDepth(0)
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, 'logo').setDepth(1)
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play_button').setDepth(1)
        let optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, 'play_button').setDepth(1)

        // create sprites (if using pixel art, remove sharpen)
        let hoverSprite = this.add.sprite(100, 100, 'cat')
        hoverSprite.setScale(2)
        hoverSprite.setVisible(false)

        // create audio, disable pauseonblur
        this.sound.pauseOnBlur = false
        this.sound.play('title_music', {
            loop: true
        })

        // create animation
        this.anims.create({
            key: 'walk',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNames('cat', {
                frames: [0,1,2,3]
            })
        })

        // make image buttons interactive

        /*
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just click
        */

        playButton.setInteractive()
        playButton.on('pointerover', () => {
            hoverSprite.x = playButton.x - playButton.width
            hoverSprite.y = playButton.y
            hoverSprite.setVisible(true)
            hoverSprite.play('walk')
        })
        playButton.on('pointerout', () => {
            hoverSprite.setVisible(false)
        })
        playButton.on('pointerup', () => {
            console.info('PLAY: open the gates, AY')
        })

        optionsButton.setInteractive()
        optionsButton.on('pointerover', () => {
            hoverSprite.x = optionsButton.x - optionsButton.width
            hoverSprite.y = optionsButton.y
            hoverSprite.setVisible(true)
            hoverSprite.play('walk')
        })
        optionsButton.on('pointerout', () => {
            hoverSprite.setVisible(false)
        })
        optionsButton.on('pointerup', () => {
            console.info('OPTIONS: open the gates, AY')
        })

    }
}
