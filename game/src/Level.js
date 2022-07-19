import { CONFIG } from './config'
import { CST } from './CST'
import { LEVELCONFIG } from './LevelConfig'

export const REQUESTS = {
    INIT: 'REQUEST_INIT',
    CHECK: 'REQUEST_CHECK'
}

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
        level.add.image(53, 24, level.DATA.weather).setOrigin(0).setDepth(1)
        // // // set temperature and icon
        level.add.text(153.5, 41.5, level.DATA.temperature + 'ºC', CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        level.add.image(177, 29, CST.ICONS.TEMPERATURE).setOrigin(0).setDepth(1)
        // // // set humidity and icon
        level.add.text(153.5, 76.5, level.DATA.humidity + '%', CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        level.add.image(177, 64, CST.ICONS.HUMIDITY).setOrigin(0).setDepth(1)

        // // set max battery for level on top right
        level.add.image(695.55, 28, CST.ICONS.BATTERY).setOrigin(0).setDepth(1)
        level.add.text(661.78, 64, level.DATA.max_battery + '%', CST.STYLES.FLAVOR_LARGE).setOrigin(0.5)

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
        let dest = level.GAMEPLAY.destinations[i]
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
            if (i === level.GAMEPLAY.selected_route) {
                level.GAMEPLAY.selected_route = null
                level.visual.dest_outline.setVisible(false)
            } else if (dest.uses > 0) {
                level.GAMEPLAY.selected_route = i
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

    placeRouteBar(level) {
        /**
         * @@@ INFO ON CROPPING IMAGES
         * https://www.html5gamedevs.com/topic/36973-showing-cropped-image/
         */
        const full = level.add.image(53, 457 + 0, CST.LEVEL.ROUTE.BAR_FULL).setOrigin(0).setDepth(1)
        level.add.image(53, 457, CST.LEVEL.ROUTE.BAR_EMPTY).setOrigin(0).setDepth(0)
        full.displayWidth = 65
        level.visual.bar = full
    },

    advanceRouteBar(level, index) {
        // delta between squares = 90
        // square width = 65
        // therefore, the animated bit is 25 pixels long
        const target = 90 * (index + 1)
        const bar = level.visual.bar
        bar.displayWidth = target - 25
        level.tweens.add({
            targets: bar,
            displayWidth: target,
            // animation takes one second
            duration: 1000,
            ease: Phaser.Math.Easing.Linear,
            onComplete: () => {
                level.return.index++
                this.levelCheck(level)
            },
        })
    },

    resetRouteBar(level) {
        const bar = level.visual.bar
        bar.frame.cutWidth = 65
        bar.frame.updateUVs()
    },

    // place route slots on bottom of screen
    placeRouteSlot(level, i, x, y) {
        if (i) {
            level.visual.openRoutes.push(
                level.add.image(x, y, CST.LEVEL.ROUTE.OPEN).setOrigin(0).setDepth(2)
            )
            if (i > 1) {
                level.visual.closedRoutes.push(
                    level.add.image(x, y, CST.LEVEL.ROUTE.CLOSED).setOrigin(0).setDepth(3)
                )
            }
        } else {
            let icon = level.add.image(x, y, level.GAMEPLAY.routes[0].icon).setOrigin(0).setDepth(1)
            level.GAMEPLAY.routes[0].icon = icon
        }
    },

    // place battery bar and cut usable portion based on percentage
    setupBatteryBar(level) {
        /**
         * @@@ INFO ON CROPPING IMAGES
         * https://www.html5gamedevs.com/topic/36973-showing-cropped-image/
         */
        const full = level.add.image(53, 528, CST.LEVEL.BATTERY.FULL).setOrigin(0).setDepth(1)
        const usable = level.add.image(53, 528, CST.LEVEL.BATTERY.USABLE).setOrigin(0).setDepth(2)
        usable.frame.cutWidth = full.frame.width * level.DATA.max_battery_dec
        usable.frame.updateUVs();
        level.add.text(542.64, 546.5, level.GAMEPLAY.current_battery, CST.STYLES.BATTERY_PERCENTAGE).setOrigin(0.5).setDepth(3)
    },

    checkAndRemoveRoute(level, curr) {
        let next = curr + 1
        if (
            level.GAMEPLAY.routes[curr] !== undefined &&
            level.GAMEPLAY.routes[next] === undefined
        ) {
            let route = level.GAMEPLAY.routes[curr]
            let dest = level.GAMEPLAY.destinations[route.name]
            route.icon.destroy()
            dest.uses++
            LEVEL.updateDestDisplay(dest)
            level.GAMEPLAY.routes.pop(curr)
            level.visual.closedRoutes[level.GAMEPLAY.next_route--].setVisible(true)
            this.updateGMapsUrl(level)
            if (level.GAMEPLAY.next_route == 1) {
                level.visual.goButton.setVisible(false)
            }
        }
    },

    checkAndAddRoute(level, curr) {
        if (level.GAMEPLAY.selected_route !== null) {
            if (level.GAMEPLAY.routes[curr] !== undefined) {
                return
            }
            let selected = level.GAMEPLAY.selected_route
            let last = level.GAMEPLAY.routes[level.GAMEPLAY.next_route - 1]
            if (selected !== last.name) {
                level.GAMEPLAY.routes[level.GAMEPLAY.next_route] = {
                    name: selected,
                    icon: level.add.image(
                        level.visual.openRoutes[level.GAMEPLAY.next_route].x,
                        level.visual.openRoutes[level.GAMEPLAY.next_route].y,
                        level.GAMEPLAY.destinations[level.GAMEPLAY.selected_route].route
                    ).setOrigin(0).setDepth(2),
                    occupied: true
                }
                level.visual.closedRoutes[++level.GAMEPLAY.next_route].setVisible(false)
                let dest = level.GAMEPLAY.destinations[selected]
                dest.uses--
                LEVEL.updateDestDisplay(dest)
                level.GAMEPLAY.selected_route = null
                level.visual.dest_outline.setVisible(false)
                this.updateGMapsUrl(level)
                if (level.GAMEPLAY.next_route > 1) {
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
                type: REQUESTS.CHECK,
                data: level,
                url: apiUrl
            })
        })

        return goButton
    },

    processInitCall(level) {
        const response = level.return
        if (response.status !== 'OK') {
            level.return = undefined
            delete level.return
            return
        }

        const route = response.routes[0]
        let distance = 0
        for (const s of route.legs) {
            distance += s.distance.value
        }
        level.MAX_AUTONOMY = distance
        level.DATA.max_battery_dec = (distance / 1000) / CST.CALC.BASE
        level.DATA.max_battery = Math.round(level.DATA.max_battery_dec * 100)

        level.return = undefined
        delete level.return
    },

    processCheckCall(level) {
        const response = level.return
        if (response.status !== 'OK') {
            level.return = undefined
            delete level.return
            return
        }

        const route = response.routes[0].legs.map(
            x => x.distance.value
        )

        level.return = {
            route: route,
            distance: 0,
            index: 0,
        }
        this.levelCheck(level)
    },

    levelCheck(level) {
        if (level.return === undefined) return
        const data = level.return

        if (data.route.length === 0) {
            if (data.distance >= level.GAMEPLAY.MAX_AUTONOMY) {
                level.return = undefined
                if (LEVELCONFIG.LEVELS.hasOwnProperty(LEVELCONFIG.NEXT)) {
                    level.scene.start(
                        CST.SCENES.LEVEL,
                        LEVELCONFIG.LEVELS[LEVELCONFIG.NEXT++]
                    )
                } else {
                    LEVELCONFIG.NEXT = 1
                    level.scene.start(CST.SCENES.LOAD)
                }    
            } else {
                level.return = undefined
                this.resetRouteBar(level)
            }
            return
        }

        const segment = data.route.shift()
        data.distance += segment
        this.advanceRouteBar(level, data.index)
    },

    getDirectionsUrl(level) {
        let waypoints = this.generateGMapsWaypoints(level.GAMEPLAY)
        if (waypoints.length < 2) return
        return this.makeUrlFromWaypoints(waypoints)
    },

    makeUrlFromWaypoints(waypoints) {
        let base = 'http://' + CONFIG.API_URL + '/get_directions'
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

        let waypoints = this.generateGMapsWaypoints(level.GAMEPLAY)
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

    generateGMapsWaypoints(data) {
        return data.routes.map(
            x => data.destinations[x.name].map_url
        )
    },

}