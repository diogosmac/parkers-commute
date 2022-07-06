import { CONFIG } from './config'
import { CST } from './CST'

export const LEVEL = {
    /**
     * +++ AUX FUNCTIONS
     */
    setupInterface(level) {
        /**
         * @@@  Centering text:
         *      x = position_x + (width / 2)
         *      y = position_y + (height / 2)
         *      Then, place the text in (x,y), and call setOrigin(0.5)
         */

        // // set background
        level.add.image(0, 0, CST.LEVEL.BACKGROUND).setOrigin(0).setDepth(0)

        // // set weather on top left
        level.add.image(53, 24, level.level_data.weather).setOrigin(0).setDepth(1)
        // // // set temperature and icon
        level.add.text(153.5, 41.5, level.level_data.temperature + 'ºC', CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        level.add.image(177, 29, CST.ICONS.TEMPERATURE).setOrigin(0).setDepth(1)
        // // // set humidity and icon
        level.add.text(153.5, 76.5, level.level_data.humidity + '%', CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        level.add.image(177, 64, CST.ICONS.HUMIDITY).setOrigin(0).setDepth(1)

        // // set max battery for level on top right
        level.add.image(695.55, 28, CST.ICONS.BATTERY).setOrigin(0).setDepth(1)
        level.add.text(661.78, 64, level.level_data.max_battery + '%', CST.STYLES.FLAVOR_LARGE).setOrigin(0.5)

        // // place map and power-up bar placeholders
        level.add.image(53, 136, CST.PLACEHOLDER.MAP).setOrigin(0).setDepth(1)
        level.add.image(688, 136, CST.PLACEHOLDER.POWERUPS).setOrigin(0).setDepth(1)

        // // add destination selection outline image
        level.visual.dest_outline = level.add.image(
            0,
            18,
            CST.DEST.SELECTED
        ).setOrigin(0).setDepth(1).setVisible(false)
    },

    // place possible destinations on top of screen
    placeDestinationSquare(level, i) {
        let dest = level.gameplay.destinations[i]
        dest.icon = level.add.image(
            dest.screen_position.x,
            dest.screen_position.y,
            dest.icon
        ).setOrigin(0).setDepth(1)
        dest.icon_out = level.add.image(
            dest.screen_position.x,
            dest.screen_position.y,
            dest.icon_out
        ).setOrigin(0).setDepth(1).setVisible(false)
        dest.icon.setInteractive()
        dest.icon.on(CST.MOUSE.CLICK_RELEASE, () => {
            if (i === level.gameplay.selected_route) {
                level.gameplay.selected_route = null
                level.visual.dest_outline.setVisible(false)
            } else if (dest.uses > 0) {
                level.gameplay.selected_route = i
                level.visual.dest_outline.x = dest.screen_position.x
                level.visual.dest_outline.setVisible(true)
            }
        })
        dest.text = level.add.text(
            dest.screen_position.x + 68.63,
            dest.screen_position.y + 13.56,
            dest.uses,
            CST.STYLES.DEST_USES
        ).setOrigin(0.5).setDepth(2)
    },

    updateDestDisplay(dest) {
        dest.icon.setVisible(dest.uses > 0)
        dest.icon_out.setVisible(dest.uses === 0)
        dest.text.setText(dest.uses)
    },

    // place route slots on bottom of screen
    placeRouteSlot(level, i, x, y) {
        if (i) {
            level.visual.openRoutes.push(
                level.add.image(x, y, CST.LEVEL.ROUTE.OPEN).setOrigin(0).setDepth(1)
            )
            if (i > 1) {
                level.visual.closedRoutes.push(
                    level.add.image(x, y, CST.LEVEL.ROUTE.CLOSED).setOrigin(0).setDepth(2)
                )
            }
        } else {
            let icon = level.add.image(x, y, level.gameplay.routes[0].icon).setOrigin(0).setDepth(1)
            level.gameplay.routes[0].icon = icon
        }
    },

    // place battery bar and cut usable portion based on percentage
    setupBatteryBar(level) {
        /**
         * @@@ INFO ON CROPPING IMAGES
         * https://www.html5gamedevs.com/topic/36973-showing-cropped-image/
         */
        let full = level.add.image(53, 528, CST.LEVEL.BATTERY.FULL).setOrigin(0).setDepth(1)
        let usable = level.add.image(53, 528, CST.LEVEL.BATTERY.USABLE).setOrigin(0).setDepth(2)
        usable.frame.cutWidth = full.frame.width * level.level_data.max_battery_dec
        usable.frame.updateUVs();
        level.add.text(542.64, 546.5, level.gameplay.current_battery, CST.STYLES.BATTERY_PERCENTAGE).setOrigin(0.5).setDepth(3)
    },

    checkAndRemoveRoute(level, curr) {
        let next = curr + 1
        if (
            level.gameplay.routes[curr] !== undefined &&
            level.gameplay.routes[next] === undefined
        ) {
            let route = level.gameplay.routes[curr]
            let dest = level.gameplay.destinations[route.name]
            route.icon.destroy()
            dest.uses++
            LEVEL.updateDestDisplay(dest)
            level.gameplay.routes.pop(curr)
            level.visual.closedRoutes[level.gameplay.next_route--].setVisible(true)
            this.updateGMapsUrl(level)
            if (level.gameplay.next_route == 1) {
                level.visual.goButton.setVisible(false)
            }
        }
    },

    checkAndAddRoute(level, curr) {
        if (level.gameplay.selected_route !== null) {
            if (level.gameplay.routes[curr] !== undefined) {
                return
            }
            let selected = level.gameplay.selected_route
            let last = level.gameplay.routes[level.gameplay.next_route - 1]
            if (selected !== last.name) {
                level.gameplay.routes[level.gameplay.next_route] = {
                    name: selected,
                    icon: level.add.image(
                        level.visual.openRoutes[level.gameplay.next_route].x,
                        level.visual.openRoutes[level.gameplay.next_route].y,
                        level.gameplay.destinations[level.gameplay.selected_route].route
                    ).setOrigin(0).setDepth(2),
                    occupied: true
                }
                level.visual.closedRoutes[++level.gameplay.next_route].setVisible(false)
                let dest = level.gameplay.destinations[selected]
                dest.uses--
                LEVEL.updateDestDisplay(dest)
                level.gameplay.selected_route = null
                level.visual.dest_outline.setVisible(false)
                this.updateGMapsUrl(level)
                if (level.gameplay.next_route > 1) {
                    level.visual.goButton.setVisible(true)
                }
            }
        }
    },

    setupRoutes(level) {
        // iterating over indexes, not the actual closed routes
        for (let i in level.visual.closedRoutes) {
            if (i < 1) { continue }
            level.visual.openRoutes[i].setInteractive()
            if (i > 1) level.visual.closedRoutes[i].setInteractive()
            level.visual.openRoutes[i].on(CST.MOUSE.CLICK, (pointer) => {
                let curr = parseInt(i)
                if (pointer.rightButtonDown()) {
                    this.checkAndRemoveRoute(level, curr)
                    return
                }
                this.checkAndAddRoute(level, curr)
            })
        }
    },

    setupGoButton(level) {
        level.add.image(593, 528, CST.LEVEL.GO.UNUSABLE).setOrigin(0).setDepth(1)
        let goButton = level.add.image(593, 528, CST.LEVEL.GO.USABLE).setOrigin(0).setDepth(1)

        goButton.setVisible(false)
        goButton.setInteractive()

        goButton.on(CST.MOUSE.CLICK, () => {
            let apiUrl = this.getDirectionsUrl(level)
            level.scene.launch(CST.SCENES.DEFER, {
                scene: level,
                url: apiUrl
            })
        })

        return goButton
    },

    processApiCall(level) {
        let response = level.return
        level.return = undefined
        console.log('api response:', response)
    },

    getDirectionsUrl(level) {
        let waypoints = this.generateGMapsWaypoints(level.gameplay)
        if (waypoints.length < 2) return
        let base = CONFIG.API_URL
        let pref = '?mode=driving&units=metric'
        let orig = '&origin=' + waypoints[0]
        let dest = '&destination=' + waypoints[waypoints.length-1]
        let url = base + pref + orig + dest
        if (waypoints.length > 2) {
            let wayp = '&waypoints=' + waypoints.slice(1, waypoints.length-1).join('|')
            url += wayp
        }
        return url
    },

    updateGMapsUrl(level) {
        let map_place = level.visual.map_place
        let map_directions = level.visual.map_directions

        let waypoints = this.generateGMapsWaypoints(level.gameplay)
        let base = 'https://www.google.com/maps/embed/v1/'
        let mode = (waypoints.length < 2 ? 'place' : 'directions')
        let api = '?key=' + CONFIG.API_KEY
        if (waypoints.length < 2) {
            let params = '&q=' + waypoints[0]
            let url = base + mode + api + params
            if (map_place.src !== url) {
                map_place.src = url
            }
            map_directions.style.display = 'none'
            map_place.style.display = 'block'
        } else {
            let pref = '&mode=driving&units=metric'
            let orig = '&origin=' + waypoints[0]
            let dest = '&destination=' + waypoints[waypoints.length-1]
            let params = pref + orig + dest
            if (waypoints.length > 2) {
                let wayp = '&waypoints=' + waypoints.slice(1, waypoints.length-1).join('|')
                params += wayp
            }
            let url = base + mode + api + params
            if (map_directions.src !== url) {
                map_directions.src = url
            }
            map_place.style.display = 'none'
            map_directions.style.display = 'block'
        }
    },

    generateGMapsWaypoints(level_data) {
        return level_data.routes.map(
            x => level_data.destinations[x.name].map_url
        )
    },

}