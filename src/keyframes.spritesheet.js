export default (Keyframes) => {
    Keyframes.spriteSheets = {};
    Keyframes.spriteSheet = (opts) => {
        const defaults = {
            name: '',
            rows: 1,
            cols: 1,
            height: 0,
            width: 0,
            offsetX: 0,
            offsetY: 0,
            count: (opts.rows * opts.cols),
            spriteWidth: (opts.width / opts.cols),
            spriteHeight: (opts.height / opts.rows),
            loop: true,
        };

        opts = Object.assign({}, defaults, opts);

        Keyframes.spriteSheets[opts.name] = opts;

        const spriteStep = 100 / opts.count;
        const spriteFrames = {};
        let x = opts.offsetX;
        let y = opts.offsetY;
        for (let i = 0; i < opts.count; i += 1) {
            spriteFrames[`${Math.round(spriteStep * i)}%`] = {
                'background-position': `-${x}px -${y}px`,
            };
            if (x >= opts.width - opts.spriteWidth) {
                y += opts.spriteHeight;
                x = opts.offsetX;
            } else {
                x += opts.spriteWidth;
            }
        }

        return Object.assign({}, { name: opts.name }, spriteFrames);
    };

    Keyframes.prototype.playSpriteSheet = function (name, time, loops, keyframes) {
        if (keyframes) {
            Keyframes.define(keyframes);
        }
        if (loops) {
            if (loops < 0) {
                loops = 'infinite';
            }
        } else {
            loops = 'infinite';
        }

        let animate = `${name} ${time} steps(1) ${loops}`;
        const existingAnimation = this.elem.style.animation;
        if (existingAnimation && existingAnimation.split(' ')[0] !== 'none') {
            animate = `${existingAnimation}, ${animate}`;
        }

        this.elem.style.animation = animate;
        return this;
    };
};
