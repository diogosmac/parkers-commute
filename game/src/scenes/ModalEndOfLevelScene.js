import { CST } from '../modules/CST'
import { LEVEL } from '../modules/Level'
import { LEVELCONFIG } from '../modules/LevelConfig'
import { UTILS } from '../modules/Utils'

export class ModalEndOfLevelScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MODAL_EOL
        })
    }
    init(data) {
        if (Object.keys(data).length == 0) {
            console.error('No data was received from the loading scene')
        }

        this.maps = data.maps.filter(x => x.style.display === 'block')

        this.page_content = data.content.level
        this.parentScene = data.content.parent
        this.hasNextLevel = data.content.hasNextLevel
        this.nextScene = data.content.next
    }
    preload() {

    }
    create() {
        for (const m of this.maps) {
            m.style.display = 'none'
        }
        const bg = this.add.image(0, 0, CST.MODALS.BG).setOrigin(0).setDepth(0)
        // block accidental inputs
        bg.setInteractive()

        this.add.image(53, 45, CST.MODALS.EOL).setOrigin(0).setDepth(1)

        const distance = UTILS.roundToDecimals(this.page_content.dist / 1000, 1)
        const grams = UTILS.roundToDecimals(CST.CALC.PREDICTED_DIST_TO_EMISSIONS * distance, 0)
        const fuel = UTILS.roundToDecimals(CST.CALC.PREDICTED_DIST_TO_FUEL * distance, 2)
        const money = UTILS.roundToDecimals(CST.CALC.PREDICTED_FUEL_TO_MONEY * fuel, 2)

        this.add.text(
            154, 169,
            `Traveled ${distance} kilometers`,
            CST.STYLES.END_OF_LEVEL
        ).setOrigin(0).setDepth(2)
        this.add.text(
            154, 225,
            `Saved ${grams} grams of CO2 emissions`,
            CST.STYLES.END_OF_LEVEL
        ).setOrigin(0).setDepth(2)
        this.add.text(
            154, 281,
            `Saved ${fuel} liters of gas, saving around ${money}€`,
            CST.STYLES.END_OF_LEVEL
        ).setOrigin(0).setDepth(2)

        const btn_back = this.add.image(
            149,
            428,
            CST.MODALS.BTN_EOL_BACK
        ).setOrigin(0).setDepth(2)

        const btn_advance = this.add.image(
            451,
            428,
            CST.MODALS.BTN_EOL_ADVANCE
        ).setOrigin(0).setDepth(2)

        btn_back.setInteractive()
        btn_back.on(CST.MOUSE.CLICK_RELEASE, () => {
            LEVEL.resetRouteBar(this.parentScene)
            for (const m of this.maps) {
                m.style.display = 'block'
            }
            this.parentScene.CLICKABLE = true
            this.scene.stop()
        })

        btn_advance.setInteractive()
        btn_advance.on(CST.MOUSE.CLICK_RELEASE, () => {
            this.parentScene.scene.stop()
            LEVEL.accumulated_distance += this.page_content.dist
            if (this.hasNextLevel) {
                LEVELCONFIG.NEXT++
                this.scene.start(CST.SCENES.LEVEL, this.nextScene)
            } else {
                LEVELCONFIG.NEXT = 1
                this.scene.start(CST.SCENES.MODAL_GAMEOVER)
            }
        })

    }
}
