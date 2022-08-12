import { CST } from '../modules/CST'
import { LEVEL, REQUESTS } from '../modules/Level'

export class DeferredScene extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.DEFER })
    }
    init(data) {
        this.type = data.type
        this.data = data.data
        this.url = data.url
    }
    preload() {

    }
    create() {
        switch (this.type) {
            case REQUESTS.INIT:
                for (const [i, v] of Object.entries(this.url)) {
                    for (const url of v) {
                        fetch(url)
                            .then(response => response.json())
                            .then((data) => {
                                this.data[i].return = data
                                LEVEL.processInitCall(this.data[i], url)
                            })
                    }
                }
                break
            case REQUESTS.CHECK:
                const overlay = document.getElementById('overlay')
                overlay.style.display = 'block'
                const timeout = setTimeout(() => {
                    overlay.style.display = 'none'
                }, 3000)
                fetch(this.url)
                    .then(response => response.json())
                    .then((data) => {
                        this.data.return = data
                        overlay.style.display = 'none'
                        LEVEL.processCheckCall(this.data)
                    })
                clearTimeout(timeout)
                break
            default:
                console.log('Request type was not defined')
        }
    }
}
