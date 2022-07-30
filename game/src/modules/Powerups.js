import { CST } from "./CST"

const POWERUP_UTILS = {

    decreaseBattery(l, multiplier) {

        const full = l.visual.battery_full
        const usable = l.visual.battery_ref
        l.GAMEPLAY.AUTONOMY_MULTIPLIER *= multiplier
        const m = l.GAMEPLAY.AUTONOMY_MULTIPLIER
        usable.displayWidth = full.frame.width * l.DATA.max_battery_dec / m
        const battery_level = Math.round(+l.DATA.max_battery / m)
        l.visual.BATTERY.setText(battery_level + '%')

    },

    restoreBattery(l, multiplier) {

        const full = l.visual.battery_full
        const usable = l.visual.battery_ref
        l.GAMEPLAY.AUTONOMY_MULTIPLIER /= multiplier
        const m = l.GAMEPLAY.AUTONOMY_MULTIPLIER
        usable.displayWidth = full.frame.width * l.DATA.max_battery_dec / m
        const battery_level = Math.round(+l.DATA.max_battery / m)
        l.visual.BATTERY.setText(battery_level + '%')

    },

    changeWeather(l, weather, powerup) {

        this.prev_weather = {
            // save to restore later
            icon: l.visual.weather,
            data: l.DATA.WEATHER,
            check: powerup
        }

        if (this.hasOwnProperty('weather_icon')) {
            this.weather_icon.destroy()
        }
        l.visual.weather.setVisible(false)
        this.weather_icon = l.add.image(53, 24, weather.ICON).setOrigin(0).setDepth(2)

        l.visual.temperature.setText(weather.TEMP + 'ºC')
        l.visual.humidity.setText(weather.HUMIDITY + '%')

    },

    restoreWeather(l, powerup) {

        if (this.prev_weather.check !== powerup) return

        this.weather_icon.destroy()
        delete this.weather_icon

        this.prev_weather.icon.setVisible(true)
        l.visual.temperature.setText(this.prev_weather.data.TEMP + 'ºC')
        l.visual.humidity.setText(this.prev_weather.data.HUMIDITY + '%')

    }

}

export const POWERUPS = {

    POSITION: {
        X: 685.4,
        Y: 146.4,
        DELTA: 62.4,
    },

    'Cold': {
        name: 'Cold',
        description: 'The cold temperature has reduced the autonomy of the car.',
        icon: CST.LEVEL.POWERUPS.COLD,
        visuals: CST.WEATHER.COLD,
        multiplier: 1.15,
        incompatible: ['Hot'],
        apply: function (l) {
            // POWERUP_UTILS.decreaseBattery(l, this.multiplier)
            l.GAMEPLAY.DIST_MULTIPLIER *= this.multiplier
            POWERUP_UTILS.changeWeather(l, this.visuals, this.name)
        },
        unapply: function (l) {
            // POWERUP_UTILS.restoreBattery(l, this.multiplier)
            l.GAMEPLAY.DIST_MULTIPLIER /= this.multiplier
            POWERUP_UTILS.restoreWeather(l, this.name)
        }
    },

    'Heating': {
        name: 'Heating',
        description: 'Increases battery expenditure in cold temperatures.',
        icon: CST.LEVEL.POWERUPS.HEAT,
        multiplier: 1.5,
        requires: ['Cold'],
        apply: function (l) {
            l.GAMEPLAY.DIST_MULTIPLIER *= this.multiplier
        },
        unapply: function (l) {
            l.GAMEPLAY.DIST_MULTIPLIER /= this.multiplier
        }
    },

    'Hot': {
        name: 'Hot',
        description: 'The hot temperature has reduced the autonomy of the car.',
        icon: CST.LEVEL.POWERUPS.HOT,
        visuals: CST.WEATHER.HOT,
        multiplier: 1.05,
        incompatible: ['Cold'],
        apply: function (l) {
            // POWERUP_UTILS.decreaseBattery(l, this.multiplier)
            l.GAMEPLAY.DIST_MULTIPLIER *= this.multiplier
            POWERUP_UTILS.changeWeather(l, this.visuals, this.name)
        },
        unapply: function (l) {
            // POWERUP_UTILS.restoreBattery(l, this.multiplier)
            l.GAMEPLAY.DIST_MULTIPLIER /= this.multiplier
            POWERUP_UTILS.restoreWeather(l, this.name)
        }
    },

    'Cooling': {
        name: 'Cooling',
        icon: CST.LEVEL.POWERUPS.COOL,
        description: 'Increases battery expenditure in hot temperatures.',
        multiplier: 1.15,
        requires: ['Hot'],
        apply: function (l) {
            l.GAMEPLAY.DIST_MULTIPLIER *= this.multiplier
        },
        unapply: function (l) {
            l.GAMEPLAY.DIST_MULTIPLIER /= this.multiplier
        }
    },

    'Double-Time': {
        name: 'Double-Time',
        icon: CST.LEVEL.POWERUPS.DOUBLETIME,
        description: 'We\'re in a rush! Battery expenditure is doubled for this level.',
        multiplier: 1.25,
        apply: function (l) {
            l.GAMEPLAY.DIST_MULTIPLIER *= this.multiplier
        },
        unapply: function (l) {
            l.GAMEPLAY.DIST_MULTIPLIER /= this.multiplier
        }
    },

    'Power-Down': {
        name: 'Power-Down',
        icon: CST.LEVEL.POWERUPS.POWERDOWN,
        description: 'The battery is malfunctioning! Battery autonomy is reduced for this level.',
        multiplier: 2,
        apply: function (l) {
            POWERUP_UTILS.decreaseBattery(l, this.multiplier)
        },
        unapply: function (l) {
            POWERUP_UTILS.restoreBattery(l, this.multiplier)
        }
    },

}
