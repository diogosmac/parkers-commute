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
            max_battery_dec: 0.4,
        }

        // gameplay elements for the level
        this.gameplay = {
            current_battery: '0%',
            next_route: 1,
            selected_route: null,
            destinations: {
                'Home': {
                    icon: CST.DEST.HOME,
                    icon_out: CST.DEST.HOME_OUT,
                    route: CST.LEVEL.ROUTE.HOME,
                    uses: 1,
                    screen_position: {
                        x: 282,
                        y: 23
                    },
                    // eventually coordinates
                    // to calculate distance
                },
                'Work': {
                    icon: CST.DEST.WORK,
                    icon_out: CST.DEST.WORK_OUT,
                    route: CST.LEVEL.ROUTE.WORK,
                    uses: 1,
                    screen_position: {
                        x: 373.18, // 282 + 91.18
                        y: 23
                    },
                }
            },
            routes: [
                {
                    name: CST.LEVEL.ROUTE.HOME,
                    icon: null,
                },
            ],
        }

        this.visual = {
            // first route will never be open, as it is always "home"
            openRoutes: [
                { occupied: true, name: 'Home', icon: null }
            ],
            // first and second routes will never be closed, as the first route is always set
            closedRoutes: [null, null],
        }
    }
    preload() {

    }
    create() {
        this.setupInterface()

        for (let i in this.gameplay.destinations) {
            this.placeDestinationSquare(i)
        }

        this.setupBatteryBar()

        for (let i = 0; i < 8; i++) {
            this.placeRouteSlot(i, 53 + i * 90, 429)
        }

        // iterating over indexes, not the actual closed routes
        for (let i in this.visual.closedRoutes) {
            if (i < 1) { continue }
            this.visual.openRoutes[i].setInteractive()
            if (i > 1) this.visual.closedRoutes[i].setInteractive()
            this.visual.openRoutes[i].on(CST.MOUSE.CLICK_RELEASE, () => {
                if (this.gameplay.selected_route !== null) {
                    if (this.visual.openRoutes[i].occupied) {
                        return
                    }
                    let selected = this.gameplay.selected_route
                    let last = this.gameplay.routes[this.gameplay.next_route - 1]
                    if (selected !== last.name) {
                        this.gameplay.routes[this.gameplay.next_route] = {
                            name: selected,
                            icon: this.add.image(
                                this.visual.openRoutes[this.gameplay.next_route].x,
                                this.visual.openRoutes[this.gameplay.next_route].y,
                                this.gameplay.destinations[this.gameplay.selected_route].route
                            ).setOrigin(0).setDepth(2),
                            occupied: true
                        }
                        this.gameplay.next_route++
                        this.visual.closedRoutes[this.gameplay.next_route].setVisible(false)
                        let dest = this.gameplay.destinations[selected]
                        dest.uses--
                        this.updateDestDisplay(dest)
                        this.gameplay.selected_route = null
                        this.visual.dest_outline.setVisible(false)
                    }
                }
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
         * *** End of Progress Update Demo Code
         */

    }

    /**
     * +++ AUX FUNCTIONS
     */
    setupInterface() {
        /**
         * @@@  Centering text:
         *      x = position_x + (width / 2)
         *      y = position_y + (height / 2)
         *      Then, place the text in (x,y), and call setOrigin(0.5)
         */

        // // set background
        this.add.image(0, 0, CST.LEVEL.BACKGROUND).setOrigin(0).setDepth(0)

        // // set weather on top left
        this.add.image(53, 24, this.level_data.weather).setOrigin(0).setDepth(1)
        // // // set temperature and icon
        this.add.text(153.5, 41.5, this.level_data.temperature, CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        this.add.image(177, 29, CST.ICONS.TEMPERATURE).setOrigin(0).setDepth(1)
        // // // set humidity and icon
        this.add.text(153.5, 76.5, this.level_data.humidity, CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        this.add.image(177, 64, CST.ICONS.HUMIDITY).setOrigin(0).setDepth(1)

        // // set max battery for level on top right
        this.add.image(695.55, 28, CST.ICONS.BATTERY).setOrigin(0).setDepth(1)
        this.add.text(661.78, 64, this.level_data.max_battery, CST.STYLES.FLAVOR_LARGE).setOrigin(0.5)

        // // place map and power-up bar placeholders
        this.add.image(53, 136, CST.PLACEHOLDER.MAP).setOrigin(0).setDepth(1)
        this.add.image(688, 136, CST.PLACEHOLDER.POWERUPS).setOrigin(0).setDepth(1)

        // // add destination selection outline image
        this.visual.dest_outline = this.add.image(
            0,
            18,
            CST.DEST.SELECTED
        ).setOrigin(0).setDepth(1).setVisible(false)
    }

    // place possible destinations on top of screen
    placeDestinationSquare(i) {
        let dest = this.gameplay.destinations[i]
        dest.icon = this.add.image(
            dest.screen_position.x,
            dest.screen_position.y,
            dest.icon
        ).setOrigin(0).setDepth(1)
        dest.icon_out = this.add.image(
            dest.screen_position.x,
            dest.screen_position.y,
            dest.icon_out
        ).setOrigin(0).setDepth(1).setVisible(false)
        // let route = this.add.image(
        //     dest.screen_position.x,
        //     dest.screen_position.y,
        //     dest.icon
        // ).setOrigin(0).setDepth(1)
        dest.icon.setInteractive()
        dest.icon.on(CST.MOUSE.CLICK_RELEASE, () => {
            if (i === this.gameplay.selected_route) {
                this.gameplay.selected_route = null
                this.visual.dest_outline.setVisible(false)
            } else if (dest.uses > 0) {
                this.gameplay.selected_route = i
                this.visual.dest_outline.x = dest.screen_position.x
                this.visual.dest_outline.setVisible(true)
            }
        })
        dest.text = this.add.text(
            dest.screen_position.x + 68.63,
            dest.screen_position.y + 13.56,
            dest.uses,
            CST.STYLES.DEST_USES
        ).setOrigin(0.5).setDepth(2)
    }

    updateDestDisplay(dest) {
        dest.icon.setVisible(dest.uses > 0)
        dest.icon_out.setVisible(dest.uses === 0)
        dest.text.setText(dest.uses)
    }

    // place route slots on bottom of screen
    placeRouteSlot(i, x, y) {
        if (i) {
            this.visual.openRoutes.push(
                this.add.image(x, y, CST.LEVEL.ROUTE.OPEN).setOrigin(0).setDepth(1)
            )
            if (i > 1) {
                this.visual.closedRoutes.push(
                    this.add.image(x, y, CST.LEVEL.ROUTE.CLOSED).setOrigin(0).setDepth(2)
                )
            }
        } else {
            let icon = this.add.image(x, y, CST.LEVEL.ROUTE.HOME).setOrigin(0).setDepth(1)
            this.gameplay.routes[0].icon = icon
        }
    }

    // place battery bar and cut usable portion based on percentage
    setupBatteryBar() {
        /**
         * @@@ INFO ON CROPPING IMAGES
         * https://www.html5gamedevs.com/topic/36973-showing-cropped-image/
         */
        let full = this.add.image(53, 528, CST.LEVEL.BATTERY.FULL).setOrigin(0).setDepth(1)
        let usable = this.add.image(53, 528, CST.LEVEL.BATTERY.USABLE).setOrigin(0).setDepth(2)
        usable.frame.cutWidth = full.frame.width * this.level_data.max_battery_dec
        usable.frame.updateUVs();
        this.add.text(542.64, 546.5, this.gameplay.current_battery, CST.STYLES.BATTERY_PERCENTAGE).setOrigin(0.5).setDepth(3)
    }
}
