export const UTILS = {
    copy(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    arrayRemove(array, obj) {
        const index = array.indexOf(obj)
        if (index > -1) {
            array.splice(index, 1)
            return true
        }
        return false
    },
    roundToDecimals(n, digits) {
        const power_of_ten = 10**digits
        return Math.round(n * power_of_ten) / power_of_ten
    },
    reposition() {
        const map_place = document.getElementById('gm-place')
        const map_directions = document.getElementById('gm-directions')
        const overlay = document.getElementById('overlay')
    
        const canvas = document.getElementsByTagName('canvas')[0]
        const rect = canvas.getBoundingClientRect()
    
        overlay.style.left = (rect.left + 10) + 'px'
        overlay.style.top = (rect.top + 10) + 'px'
    
        const map_left = (rect.left + 10 + 142) + 'px'
        const map_top = (rect.top + 10 + 127) + 'px'
    
        map_place.style.left = map_left
        map_place.style.top = map_top
        map_directions.style.left = map_left
        map_directions.style.top = map_top
    },
}