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
    }
}