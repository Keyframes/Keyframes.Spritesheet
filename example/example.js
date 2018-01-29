import Keyframes from '@keyframes/core';
import Spritesheet from '../src/keyframes.spritesheet';

Keyframes.plugin(Spritesheet);

window.onload = function () {
    const ss = Keyframes.spriteSheet({
        name: 'gem',
        rows: 6,
        cols: 7,
        width: 210,
        height: 180,
        offsetX: 0,
        offsetY: 0,
        count: 39,
    });

    const container = new Keyframes(document.querySelectorAll('.spriteContainer')[0]);
    container.playSpriteSheet('gem', '3s', -1, ss);
};
