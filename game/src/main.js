import { CreditsScene } from './scenes/CreditsScene';
import { DeferredScene } from './scenes/DeferredScene';
import { LevelScene } from './scenes/LevelScene';
import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { ModalEndOfLevelScene } from './scenes/ModalEndOfLevelScene';
import { ModalGameOverScene } from './scenes/ModalGameOverScene';
import { ModalScene } from './scenes/ModalScene';
import { ModalTransitionScene } from './scenes/ModalTransitionScene';
import { UTILS } from './modules/Utils'

let game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        LoadScene,
        MenuScene,
        LevelScene,
        DeferredScene,
        CreditsScene,
        ModalScene,
        ModalTransitionScene,
        ModalEndOfLevelScene,
        ModalGameOverScene
    ]
});

UTILS.reposition()
window.addEventListener('resize', UTILS.reposition)
