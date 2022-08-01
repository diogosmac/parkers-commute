import { CreditsScene } from './scenes/CreditsScene';
import { DeferredScene } from './scenes/DeferredScene';
import { LevelScene } from './scenes/LevelScene';
import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'
import { ModalEndOfLevelScene } from './scenes/ModalEndOfLevelScene';
import { ModalScene } from './scenes/ModalScene';
import { ModalTransitionScene } from './scenes/ModalTransitionScene';

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
        ModalEndOfLevelScene
    ]
});
