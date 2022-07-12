import { DeferredScene } from './scenes/DeferredScene';
import { LevelOneScene } from './scenes/LevelScene_1';
import { LevelTwoScene } from './scenes/LevelScene_2';
import { LoadScene } from './scenes/LoadScene'
import { MenuScene } from './scenes/MenuScene'

let game = new Phaser.Game({
    width: 800,
    height: 600,
    scene: [
        LoadScene,
        MenuScene,
        LevelOneScene,
        LevelTwoScene,
        DeferredScene,
    ]
});
