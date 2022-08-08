import { CST } from '../modules/CST'
import { LEVEL } from '../modules/Level'
import { UTILS } from '../modules/Utils'

export class ModalGameOverScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MODAL_GAMEOVER
        })
    }
    preload() {

    }
    create() {
        this.add.image(0, 0, CST.TITLE.BACKGROUND).setOrigin(0).setDepth(0)
        const bg = this.add.image(0, 0, CST.MODALS.BG).setOrigin(0).setDepth(1)
        // block accidental inputs
        bg.setInteractive()

        const total_dist = LEVEL.accumulated_distance

        const distance = UTILS.roundToDecimals(total_dist / 1000, 1)
        const grams = UTILS.roundToDecimals(CST.CALC.PREDICTED_DIST_TO_EMISSIONS * distance, 0)
        const fuel = UTILS.roundToDecimals(CST.CALC.PREDICTED_DIST_TO_FUEL * distance, 2)
        const money = UTILS.roundToDecimals(CST.CALC.PREDICTED_FUEL_TO_MONEY * fuel, 2)


        const modal1 = this.add.image(58, 50, CST.MODALS.GAMEOVER_1).setOrigin(0).setDepth(2)
        const t_dist = this.add.text(
            171, 272,
            `Traveled ${distance} kilometers`,
            CST.STYLES.END_OF_LEVEL
        ).setOrigin(0).setDepth(3)
        const t_emissions = this.add.text(
            171, 328,
            `Saved ${grams} grams of CO2 emissions`,
            CST.STYLES.END_OF_LEVEL
        ).setOrigin(0).setDepth(3)
        const t_fuel = this.add.text(
            171, 384,
            `Saved ${fuel} liters of gas, saving around ${money}€`,
            CST.STYLES.END_OF_LEVEL
        ).setOrigin(0).setDepth(3)
        const r_btn = this.add.image(
            703.25,
            280.95,
            CST.MODALS.NAV_R
        ).setOrigin(0).setDepth(3)

        const m1 = [modal1, t_dist, t_emissions, t_fuel, r_btn]

        const modal2 = this.add.image(58, 50, CST.MODALS.GAMEOVER_2).setOrigin(0).setDepth(2).setVisible(false)
        const l_btn = this.add.image(
            79,
            280.95,
            CST.MODALS.NAV_L
        ).setOrigin(0).setDepth(3).setVisible(false)
        const button = this.add.image(
            302.64,
            450,
            CST.MODALS.BTN_MAINMENU
        ).setOrigin(0).setDepth(3).setVisible(false)

        const m2 = [modal2, l_btn, button]

        l_btn.setInteractive()
        l_btn.on(CST.MOUSE.CLICK_RELEASE, () => {
            for (const i of m1) i.setVisible(true)
            for (const i of m2) i.setVisible(false)
        })
        r_btn.setInteractive()
        r_btn.on(CST.MOUSE.CLICK_RELEASE, () => {
            for (const i of m1) i.setVisible(false)
            for (const i of m2) i.setVisible(true)
        })
        button.setInteractive()
        button.on(CST.MOUSE.CLICK_RELEASE, () => {
            this.scene.start(CST.SCENES.LOAD)
        })
    }
}
