import { CST } from '../CST'
import { LEVEL } from '../Level'

export class DeferredScene extends Phaser.Scene {
    constructor() {
        super({key: CST.SCENES.DEFER})
    }
    init(data) {
        this.level = data.scene
        this.url = data.url
    }
    preload() {

    }
    create() {
        const overlay = document.getElementById('overlay')
        overlay.style.display = 'block'
        const timeout = setTimeout(() => {
            overlay.style.display = 'none'
        }, 3000)
        fetch(this.url)
            .then(response => response.json())
            .then((data) => {
                this.level.return = data
                LEVEL.processApiCall(this.level)
                overlay.style.display = 'none'
            })
        clearTimeout(timeout)
    }
}
