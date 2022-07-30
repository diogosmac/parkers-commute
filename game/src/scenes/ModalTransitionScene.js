import { CST } from '../modules/CST'

export class ModalTransitionScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MODAL_T
        })
    }
    init(data) {
        if (Object.keys(data).length == 0) {
            console.error('No data was received from the loading scene')
        }

        this.next = data.next
        this.next_data = data.next_data
        this.prev_scene = data.prev_scene

        if (data.hasOwnProperty('maps')) {
            this.maps = data.maps.filter(x => x.style.display === 'block')
        } else {
            this.maps = []
        }

        if (!Array.isArray(data.content.text)) {
            data.content.text = [data.content.text]
        }
        this.page_content = data.content.text
        this.max_page = this.page_content.length - 1
        this.button = data.content.btn
        this.pages = []
        this.page_number = 0
    }
    preload() {

    }
    create() {
        for (const m of this.maps) {
            m.style.display = 'none'
        }
        const bg = this.add.image(0, 0, CST.MODALS.BG).setOrigin(0).setDepth(0)
        // block accidental inputs
        bg.setInteractive()

        for (const [i, p] of this.page_content.entries()) {
            this.pages.push(this.add.image(53, 45, p).setOrigin(0).setDepth(1).setVisible(i == 0))
        }

        const multipage = (this.max_page > 0)

        const l_btn = this.add.image(
            79,
            280.95,
            CST.MODALS.NAV_L
        ).setOrigin(0).setDepth(2).setVisible(false)
        const r_btn = this.add.image(
            703.25,
            280.95,
            CST.MODALS.NAV_R
        ).setOrigin(0).setDepth(2).setVisible(multipage)
        const button = this.add.image(
            this.max_page === 0 ? 302.64 : 511,
            450,
            this.button
        ).setOrigin(0).setDepth(2).setVisible(!multipage)

        l_btn.setInteractive()
        l_btn.on(CST.MOUSE.CLICK_RELEASE, () => {
            this.pages[this.page_number--].setVisible(false)
            this.pages[this.page_number].setVisible(true)
            r_btn.setVisible(true)
            l_btn.setVisible(this.page_number > 0)
            button.setVisible(this.page_number === this.max_page)
        })
        r_btn.setInteractive()
        r_btn.on(CST.MOUSE.CLICK_RELEASE, () => {
            this.pages[this.page_number++].setVisible(false)
            this.pages[this.page_number].setVisible(true)
            l_btn.setVisible(true)
            r_btn.setVisible(this.page_number < this.max_page)
            button.setVisible(this.page_number === this.max_page)
        })
        button.setInteractive()
        button.on(CST.MOUSE.CLICK_RELEASE, () => {
            for (const m of this.maps) {
                m.style.display = 'block'
            }
            this.prev_scene.stop()
            this.scene.start(this.next, this.next_data)
        })
    }
}
