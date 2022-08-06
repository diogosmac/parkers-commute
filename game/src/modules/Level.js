import { CONFIG } from './config'
import { CST } from './CST'
import { LEVELCONFIG } from './LevelConfig'
import { POWERUPS } from './Powerups'
import { UTILS } from './Utils'

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

        const weather = level.DATA.WEATHER
        // // set weather on top left
        level.visual.weather = level.add.image(53, 24, weather.ICON).setOrigin(0).setDepth(1)
        // // // set temperature and icon
        level.visual.temperature = level.add.text(153.5, 41.5, weather.TEMP + 'ºC', CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        level.add.image(177, 29, CST.ICONS.TEMPERATURE).setOrigin(0).setDepth(1)
        // // // set humidity and icon
        level.visual.humidity = level.add.text(153.5, 76.5, weather.HUMIDITY + '%', CST.STYLES.FLAVOR_SMALL).setOrigin(0.5)
        level.add.image(177, 64, CST.ICONS.HUMIDITY).setOrigin(0).setDepth(1)

        // // set max battery for level on top right
        level.add.image(695.55, 28, CST.ICONS.BATTERY).setOrigin(0).setDepth(1)
        level.visual.BATTERY = level.add.text(661.78, 64, level.DATA.max_battery + '%', CST.STYLES.FLAVOR_LARGE).setOrigin(0.5)

        // // place map and power-up bar placeholders
        level.add.image(53, 136, CST.PLACEHOLDER.MAP).setOrigin(0).setDepth(1)

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

    placePowerUps(level) {
        if (!level.GAMEPLAY.hasOwnProperty('powerups')) {
            level.add.image(675, 136, CST.PLACEHOLDER.POWERUPS).setOrigin(0).setDepth(1)
            return
        }

        level.add.image(675, 136, CST.LEVEL.POWERUPS.BAR).setOrigin(0).setDepth(1)
        let i = 0
        level.visual.selected_powerups = {}
        level.visual.disabled_powerups = {}
        // only 4 maximum powerups allowed per level
        for (const name of level.GAMEPLAY.powerups.slice(0, 4)) {
            const p = POWERUPS[name]
            const x = POWERUPS.POSITION.X
            const y = POWERUPS.POSITION.Y + POWERUPS.POSITION.DELTA * i++

            const selected = level.add.image(
                x - 4, y - 4, CST.LEVEL.POWERUPS.SELECTED
            ).setOrigin(0).setDepth(2).setVisible(false)

            const icon = level.add.image(
                x, y, p.icon
            ).setOrigin(0).setDepth(3)

            const disabledAtStart = POWERUPS[name].hasOwnProperty('requires')
            const disabled = level.add.image(
                x, y, CST.LEVEL.POWERUPS.DISABLED
            ).setOrigin(0).setDepth(4).setVisible(disabledAtStart)
            // makes 'disabled' block the clicks
            disabled.setInteractive()

            level.visual.selected_powerups[name] = selected
            level.visual.disabled_powerups[name] = disabled

            icon.setInteractive()
            icon.on(CST.MOUSE.CLICK_RELEASE, () => {
                if (level.GAMEPLAY.ACTIVE_POWERUPS.includes(name)) {
                    this.removePowerup(level, name)
                } else {
                    this.addPowerup(level, name)
                }
                this.checkPowerups(level)
            })
        }
    },

    removePowerup(level, name) {
        if (UTILS.arrayRemove(level.GAMEPLAY.ACTIVE_POWERUPS, name)) {
            POWERUPS[name].unapply(level)
            level.visual.selected_powerups[name].setVisible(false)
        }
    },

    addPowerup(level, name) {
        level.GAMEPLAY.ACTIVE_POWERUPS.push(name)
        POWERUPS[name].apply(level)
        level.visual.selected_powerups[name].setVisible(true)
        if (POWERUPS[name].hasOwnProperty('incompatible')) {
            for (const p of POWERUPS[name].incompatible) {
                this.removePowerup(level, p)
            }
        }
    },

    checkPowerups(level) {
        for (const name of level.GAMEPLAY.powerups.slice(0, 4)) {
            let hasRequirements = true
            if (!POWERUPS[name].hasOwnProperty('requires')) {
                level.visual.disabled_powerups[name].setVisible(false)
            } else {
                hasRequirements = POWERUPS[name].requires.every(
                    p => level.GAMEPLAY.ACTIVE_POWERUPS.includes(p)
                )
                level.visual.disabled_powerups[name].setVisible(!hasRequirements)
            }
            if (!hasRequirements) {
                this.removePowerup(level, name)
            }
        }
    },

    placeRouteBar(level) {
        /**
         * @@@ INFO ON CROPPING IMAGES
         * https://www.html5gamedevs.com/topic/36973-showing-cropped-image/
         */
        const full = level.add.image(53, 457 + 0, CST.LEVEL.ROUTE.BAR_FULL).setOrigin(0).setDepth(1)
        level.add.image(53, 457, CST.LEVEL.ROUTE.BAR_EMPTY).setOrigin(0).setDepth(0)
        full.displayWidth = 32.5
        level.visual.route_bar = full
    },

    advanceRouteBar(level, index, dist) {
        // delta between squares = 90
        // square width = 65
        // therefore, the animated bit is 25 pixels long
        const route_target = 32.5 + 90 * (index + 1)
        const route_bar = level.visual.route_bar
        route_bar.displayWidth = route_target - 90

        const autonomy = level.GAMEPLAY.MAX_AUTONOMY / level.GAMEPLAY.AUTONOMY_MULTIPLIER
        const battery_perc = Math.min(1, dist / autonomy)
        const max_width = level.visual.battery_full.displayWidth
        const battery_ref = level.visual.battery_ref
        const battery_bar = level.visual.battery_bar
        const battery_target = battery_perc * battery_ref.displayWidth

        level.tweens.add({
            targets: [route_bar, battery_bar],
            // displayWidth: route_target,
            displayWidth: function (target, targetKey, value, targetIndex, totalTargets, tween) {
                switch (targetIndex) {
                    case 0:
                        return route_target
                    case 1:
                        return battery_target
                    default:
                        return 0
                }
            },
            duration: CST.ANIM.DURATION,
            ease: Phaser.Math.Easing.Linear,
            onUpdate: (e) => {
                const p = e.data[1].current / max_width
                this.updateBatteryPercentage(level, p)
            },
            onComplete: () => {
                level.return.index++
                this.levelCheck(level)
            },
        })
    },

    resetRouteBar(level) {
        level.visual.route_bar.displayWidth = 0
        level.visual.battery_bar.displayWidth = 0
        this.updateBatteryPercentage(level, 0)
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
        const used = level.add.image(53, 528, CST.LEVEL.BATTERY.USED).setOrigin(0).setDepth(2)
        level.visual.battery_full = full
        usable.displayWidth = full.frame.width * level.DATA.max_battery_dec
        level.visual.battery_ref = usable
        used.displayWidth = 0
        level.visual.battery_bar = used
        level.visual.battery_perc = level.add.text(542.64, 546.5, '0%', CST.STYLES.BATTERY_PERCENTAGE).setOrigin(0.5).setDepth(3)
    },

    updateBatteryPercentage(level, perc) {
        perc = Math.round(perc * 100)
        level.visual.battery_perc.setText(perc + '%')
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
            level.GAMEPLAY.routes.pop()
            level.visual.closedRoutes[level.GAMEPLAY.next_route--].setVisible(true)
            this.updateGMapsUrl(level)
            const last = level.GAMEPLAY.routes[--curr].name
            let visible = (last === 'Home') && (level.GAMEPLAY.next_route > 1)
            level.visual.goButton.setVisible(visible)
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
                level.visual.goButton.setVisible(selected === 'Home')
                this.updateGMapsUrl(level)
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
        let multiplier = 1
        if (level.hasOwnProperty('DESIRED_POWERUPS')) {
            for (const p of level.DESIRED_POWERUPS) {
                multiplier *= POWERUPS[p].multiplier
            }
        }

        level.MAX_AUTONOMY = distance * multiplier
        level.DATA.max_battery_dec = (level.MAX_AUTONOMY / 1000) / CST.CALC.BASE
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

        const game = level.GAMEPLAY

        const autonomy = game.MAX_AUTONOMY / game.AUTONOMY_MULTIPLIER

        if (data.distance >= autonomy) {
            level.return = undefined
            const hasNextLevel = LEVELCONFIG.LEVELS.hasOwnProperty(LEVELCONFIG.NEXT)
            const nextScene = hasNextLevel ? UTILS.copy(LEVELCONFIG.LEVELS[LEVELCONFIG.NEXT]) : undefined
            level.scene.launch(
                CST.SCENES.MODAL_EOL,
                {
                    maps: [level.visual.map_place, level.visual.map_directions],
                    content: {
                        level: {
                            dist: data.distance
                        },
                        parent: level,
                        hasNextLevel,
                        next: nextScene,
                    }
                }
            )
            return
        }

        if (data.route.length === 0) {
            console.log('FAILED:', data.distance, autonomy, game.ACTIVE_POWERUPS)
            level.return = undefined
            this.resetRouteBar(level)
            return
        }

        const segment = data.route.shift()
        data.distance += segment * game.DIST_MULTIPLIER
        this.advanceRouteBar(level, data.index, data.distance)
    },

    launchModal(level, content) {
        level.scene.launch(
            CST.SCENES.MODAL,
            {
                maps: [level.visual.map_place, level.visual.map_directions],
                content: content
            }
        )
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
        let dest = '&destination=' + waypoints[waypoints.length - 1]
        let url = base + pref + orig + dest
        if (waypoints.length > 2) {
            let wayp = '&waypoints=' + waypoints.slice(1, waypoints.length - 1).join('|')
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
            let dest = '&destination=' + waypoints[waypoints.length - 1]
            let params = pref + orig + dest
            if (waypoints.length > 2) {
                let wayp = '&waypoints=' + waypoints.slice(1, waypoints.length - 1).join('|')
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