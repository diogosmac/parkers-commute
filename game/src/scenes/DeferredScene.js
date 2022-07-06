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
        setTimeout(() => {
            overlay.style.display = 'none'
        }, 2000)
        fetch(this.url)
            .then(response => {
                console.log('response:', response)
                return response.json()
            })
            .then((data) => {
                console.log('data:', data)
                this.level.return = data
                overlay.style.display = 'none'
                LEVEL.processApiCall(this.level)
            })
    }
}
