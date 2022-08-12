require('dotenv').config({ silent: true })

const API_KEY = process.env.API_KEY
const API_URL = process.env.API_URL

export const CONFIG = {
    API_KEY: API_KEY,
    API_URL: API_URL,
    ASSETS_URL: './assets',
    LOCATIONS: {
        HOME:           localStorage.getItem('home')    || 'Avenida dos Aliados',
        WORK:           localStorage.getItem('work')    || 'FEUP',
        SUPERMARKET:    localStorage.getItem('market')  || 'LIDL Areosa',
        GYM:            localStorage.getItem('gym')     || 'Fitness UP São João'
    },
}