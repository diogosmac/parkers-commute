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
}