import { CST } from '../CST'

export class LevelScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVEL
        })
    }
    init(data) {
        if (Object.keys(data).length > 0) console.info('The data from the loading scene was received')
        else console.info('No data was received from the loading scene')

        // flavor data for the level
        this.level_data = {
            weather: CST.WEATHER.SUNNY,
            temperature: '20ºC',
            humidity: '77%',
            max_battery: '40%',
            current_battery: '0%',
        }

        // gameplay elements for the level
        this.gameplay = {
            destinations: [
                {
                    name: 'Home',
                    icon: CST.DEST.HOME,
                    icon_out: CST.DEST.HOME_OUT,
                    uses: 1
                    // eventually coordinates
                    // to calculate distance
                },
                {
                    name: 'Work',
                    icon: CST.DEST.WORK,
                    icon_out: CST.DEST.WORK_OUT,
                    uses: 1
                }
            ],
            routes: [],
        }
    }
    preload() {

    }
    create() {

        // INTERFACE SETUP

        this.add.image(0, 0, CST.LEVEL.BACKGROUND).setOrigin(0).setDepth(0)
        this.add.image(53, 24, this.level_data.weather).setOrigin(0).setDepth(1)
        this.add.image(177, 29, CST.ICONS.TEMPERATURE).setOrigin(0).setDepth(1)
        this.add.image(177, 64, CST.ICONS.HUMIDITY).setOrigin(0).setDepth(1)
        this.add.image(695.55, 28, CST.ICONS.BATTERY).setOrigin(0).setDepth(1)
        this.add.image(53, 136, CST.PLACEHOLDER.MAP).setOrigin(0).setDepth(1)
        this.add.image(688, 136, CST.PLACEHOLDER.POWERUPS).setOrigin(0).setDepth(1)

        /**
         * Centering text:
         *      x = position_x + (width / 2)
         *      y = position_y + (height / 2)
         *      Then, place the text in (x,y), and call setOrigin(0.5)
         */
        this.add.text(153.5, 41.5, this.level_data.temperature, CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        this.add.text(153.5, 76.5, this.level_data.humidity, CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        this.add.text(661.78, 64, this.level_data.max_battery, CST.STYLES.FLAVOR_LARGE).setOrigin(0.5)

        for (let i in this.gameplay.destinations) {
            let dest = this.gameplay.destinations[i]
            this.add.image(282 + i * 91.18, 23, dest.icon).setOrigin(0).setDepth(1)
            this.add.text(350.63 + i * 91.18, 36.56, dest.uses, CST.STYLES.DEST_USES).setOrigin(0.5).setDepth(2)
        }

        this.add.image(53, 528, CST.LEVEL.BATTERY.FULL).setOrigin(0).setDepth(1)
        this.add.text(542.64, 546.5, this.level_data.current_battery, CST.STYLES.BATTERY_PERCENTAGE).setOrigin(0.5).setDepth(2)

        /**
         * Actual Code
         */

        // // for (let i = 0; i < 8; i++) {
        // //     let show = this.add.image(53 + i * 90, 429, CST.LEVEL.ROUTE.OPEN).setOrigin(0).setDepth(1)
        // //     if (i) {
        // //         let hide = this.add.image(53 + i * 90, 429, CST.LEVEL.ROUTE.CLOSED).setOrigin(0).setDepth(2)
        // //         this.gameplay.routes.push([show, hide])
        // //     } else {
        // //         this.gameplay.routes.push([show])
        // //     }
        // // }

        // //  this.add.image(593, 528, CST.LEVEL.GO.UNUSABLE).setOrigin(0).setDepth(1)
        // //  this.add.image(593, 528, CST.LEVEL.GO.USABLE).setOrigin(0).setDepth(1)

        /**
         * End of Actual Code
         */

        /**
         * Progress Update Demo Code
         */
        let canShow = []
        let canHide = []

        for (let i = 0; i < 8; i++) {
            if (i) {
                canShow.push(
                    this.add.image(53 + i * 90, 429, CST.LEVEL.ROUTE.OPEN).setOrigin(0).setDepth(1)
                )
                canHide.push(
                    this.add.image(53 + i * 90, 429, CST.LEVEL.ROUTE.CLOSED).setOrigin(0).setDepth(2)
                )
            } else this.add.image(53 + i * 90, 429, CST.LEVEL.ROUTE.OPEN).setOrigin(0).setDepth(1)
        }

        for (let i in canHide) {
            canShow[i].setInteractive()
            canHide[i].setInteractive()
            canHide[i].on(CST.MOUSE.CLICK_RELEASE, () => {
                canHide[i].setVisible(!canHide[i].visible)
            })
            canShow[i].on(CST.MOUSE.CLICK_RELEASE, () => {
                canHide[i].setVisible(!canHide[i].visible)
            })
        }

        let goUnusable = this.add.image(593, 528, CST.LEVEL.GO.UNUSABLE).setOrigin(0).setDepth(1)
        let goButton = this.add.image(593, 528, CST.LEVEL.GO.USABLE).setOrigin(0).setDepth(1)

        goButton.setVisible(false)

        goUnusable.setInteractive()
        goUnusable.on(CST.MOUSE.HOVER, () => {
            goButton.setVisible(true)
        })
        goUnusable.on(CST.MOUSE.LEAVE, () => {
            goButton.setVisible(false)
        })
        /**
         * End of Progress Update Demo Code
         */

    }
}
