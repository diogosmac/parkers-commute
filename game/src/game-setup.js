const home_input = document.getElementById('home-input')
const work_input = document.getElementById('work-input')
const market_input = document.getElementById('market-input')
const gym_input = document.getElementById('gym-input')

home_input.value = localStorage.getItem('home') || ''
work_input.value = localStorage.getItem('work') || ''
market_input.value = localStorage.getItem('market') || ''
gym_input.value = localStorage.getItem('gym') || ''

home_input.addEventListener('change', (event) => {
    const v = event.target.value
    if (v.length > 0) {
        localStorage.setItem('home', v)
    } else {
        localStorage.removeItem('home')
    }
})

work_input.addEventListener('change', (event) => {
    const v = event.target.value
    if (v.length > 0) {
        localStorage.setItem('work', v)
    } else {
        localStorage.removeItem('work')
    }
})

market_input.addEventListener('change', (event) => {
    const v = event.target.value
    if (v.length > 0) {
        localStorage.setItem('market', v)
    } else {
        localStorage.removeItem('market')
    }
})

gym_input.addEventListener('change', (event) => {
    const v = event.target.value
    if (v.length > 0) {
        localStorage.setItem('gym', v)
    } else {
        localStorage.removeItem('gym')
    }
})
