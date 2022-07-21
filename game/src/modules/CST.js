export const CST = {
    SCENES: {
        LOAD: 'LOAD',
        MENU: 'MENU',
        LEVEL: 'LEVEL',
        DEFER: 'DEFER',
        CREDITS: 'CREDITS',
    },
    STYLES: {
        BATTERY_PERCENTAGE: {
            font: 'bold 16px Roboto',
            fill: '#fff',
        },
        DEST_USES: {
            font: 'bold 16px Roboto',
            fill: '#fff',
        },
        FLAVOR_SMALL: {
            font: 'bold 18px Roboto',
            fill: '#fff',
        },
        FLAVOR_LARGE: {
            font: 'bold 32px Roboto',
            fill: '#fff',
        }
    },
    DEST: {
        HOME: 'level_dest_home',
        HOME_OUT: 'level_dest_home_out',
        WORK: 'level_dest_work',
        WORK_OUT: 'level_dest_work_out',
        SUPERMARKET: 'level_dest_supermarket',
        SUPERMARKET_OUT: 'level_dest_supermarket_out',
        SELECTED: 'level_dest_selected',
    },
    LEVEL: {
        BACKGROUND: 'level_bg',
        BATTERY: {
            FULL: 'level_battery_full_bar',
            USABLE: 'level_battery_usable_bar',
            USED: 'level_battery_used_bar',
        },
        ROUTE: {
            OPEN: 'level_route_open',
            CLOSED: 'level_route_closed',
            BAR_EMPTY: 'level_route_bar_empty',
            BAR_FULL: 'level_route_bar_full',
            HOME: 'level_route_home',
            WORK: 'level_route_work',
            SUPERMARKET: 'level_route_supermarket',
        },
        GO: {
            UNUSABLE: 'level_go_unusable',
            USABLE: 'level_go_button'
        },
        LOAD: 'level_load_overlay',
        POWERUPS: {
            BAR: 'level_powerups_bar',
            HEAT: 'level_powerups_heat',
            COOL: 'level_powerups_cool',
            DOUBLETIME: 'level_powerups_doubletime',
            POWERDOWN: 'level_powerups_powerdown',
        }
    },
    ICONS: {
        TEMPERATURE: 'level_temperature',
        HUMIDITY: 'level_humidity',
        BATTERY: 'level_battery',
    },
    PLACEHOLDER: {
        MAP: 'level_map',
        POWERUPS: 'level_powerups',
    },
    TITLE: {
        BACKGROUND: 'title_bg',
        PLAY: 'title_play_button',
        OPTIONS: 'title_options_button',
        CREDITS: 'title_credits_button',
        MINI: 'title_mini'
    },
    CREDITS: {
        TEXT: 'credits_text',
        BUTTON: 'credits_button',
    },
    MOUSE: {
        CLICK_RELEASE: 'pointerup',
        CLICK: 'pointerdown',
        HOVER: 'pointerover',
        LEAVE: 'pointerout'
    },
    WEATHER: {
        REGULAR: {
            ICON: 'weather_regular',
            PRECIPITATION: 35,
            TEMP: 20,
        },
        CHILL: {
            ICON: 'weather_chill',
            PRECIPITATION: 70,
            TEMP: 9,
        },
        COLD: {
            ICON: 'weather_cold',
            PRECIPITATION: 85,
            TEMP: -6,
        },
        HOT: {
            ICON: 'weather_hot',
            PRECIPITATION: 0,
            TEMP: 35,
        },
        WARM: {
            ICON: 'weather_warm',
            PRECIPITATION: 10,
            TEMP: 29,
        },
    },
    CALC: {
        BASE: 376.59,
        FACTOR: {
            CHILL: 0.88,
            COLD: 0.60,
            HOT: 0.83,
            WARM: 0.96,
        },
    },
    ANIM: {
        DURATION: 1000
    }
}