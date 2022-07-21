import { CST } from "./CST"

export const POWERUPS = {
    POSITION: {
        X: 685.4,
        Y_START: 146.4,
        Y_DELTA: 62.4,
    },
    'Heating': {
        name: 'Heating',
        description: 'Increases battery expenditure in cold temperatures.',
        icon: CST.LEVEL.POWERUPS.HEAT,
        multiplier: 1.5,
        apply: function(l) {
            console.info(`Power-Up Used | %c${this.name}%c\t${this.description}`, 'color:orangered;font-weight:bold')
            l.GAMEPLAY.DIST_MULTIPLIER *= this.multiplier
        },
        unapply: function(l) {
            l.GAMEPLAY.DIST_MULTIPLIER /= this.multiplier
        }
    },
    'Cooling': {
        name: 'Cooling',
        icon: CST.LEVEL.POWERUPS.COOL,
        description: 'Increases battery expenditure in hot temperatures.',
        multiplier: 1.5,
        apply: function(l) {
            console.info(`Power-Up Used | %c${this.name}%c\t${this.description}`, 'color:lightblue;font-weight:bold')
            l.GAMEPLAY.DIST_MULTIPLIER *= this.multiplier
        },
        unapply: function(l) {
            l.GAMEPLAY.DIST_MULTIPLIER /= this.multiplier
        }
    },
    'Double-Time': {
        name: 'Double-Time',
        icon: CST.LEVEL.POWERUPS.DOUBLETIME,
        description: 'We\'re in a rush! Battery expenditure is doubled for this level.',
        multiplier: 2,
        apply: function(l) {
            console.info(`Power-Up Used | %c${this.name}%c\t${this.description}`, 'color:green;font-weight:bold')
            l.GAMEPLAY.DIST_MULTIPLIER *= this.multiplier
        },
        unapply: function(l) {
            l.GAMEPLAY.DIST_MULTIPLIER /= this.multiplier
        }
    },
    'Power-Down': {
        name: 'Power-Down',
        icon: CST.LEVEL.POWERUPS.POWERDOWN,
        description: 'The battery is malfunctioning! Battery autonomy is reduced for this level.',
        multiplier: 2,
        apply: function(l) {
            console.info(`Power-Up Used | %c${this.name}%c\t${this.description}`, 'color:yellow;font-weight:bold')
            const full = l.visual.battery_full
            const usable = l.visual.battery_ref
            usable.displayWidth = full.frame.width * l.DATA.max_battery_dec / this.multiplier
            l.GAMEPLAY.AUTONOMY_MULTIPLIER /= this.multiplier
            const battery_level = Math.round(+l.DATA.max_battery / this.multiplier)
            l.visual.BATTERY.setText(battery_level + '%')
        },
        unapply: function(l) {
            const full = l.visual.battery_full
            const usable = l.visual.battery_ref
            usable.displayWidth = full.frame.width * l.DATA.max_battery_dec
            l.GAMEPLAY.AUTONOMY_MULTIPLIER *= this.multiplier
            l.visual.BATTERY.setText(l.DATA.max_battery + '%')
        }
    },
}