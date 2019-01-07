export default class Base {
    constructor () {
        this.stageW = window.innerWidth / this.scaleFactorSelector();
        this.stageH = window.innerHeight / this.scaleFactorSelector();
    }

    COLOR = {
        Red: '#ff0043',
        Green: '#14fc56',
        Blue: '#1e7fff',
        Purple: '#e60aff',
        Gold: '#ffbf36',
        White: '#ffffff',
    }

    IS_HEADER = false

    PI_2 = Math.PI * 2

    PI_HALF = Math.PI * 0.5

    quality = 1

    INVISIBLE = '_INVISIBLE_'

    isLowQuality = false

    isNormalQuality = true

    isHighQuality = false

    GRAVITY = 0.9

    QUALITY_LOW = 1

    QUALITY_NORMAL = 2

    QUALITY_HIGH = 3

    SKY_LIGHT_NONE = 0

    SKY_LIGHT_DIM = 1

    SKY_LIGHT_NORMAL = 2

    COLOR_NAMES = Object.keys(this.COLOR)

    COLOR_CODES = Object.values(this.COLOR)

    COLOR_CODES_W_INVIS = [...this.COLOR_CODES, this.INVISIBLE]

    COLOR_TUPLES = this.COLOR_CODES.reduce((result, item) => {
        const curResult = result;
        curResult[item] = {
            r: parseInt(item.substr(1, 2), 16),
            g: parseInt(item.substr(3, 2), 16),
            b: parseInt(item.substr(5, 2), 16),
        };
        return curResult;
    }, {})

    lastColor = ''

    scaleFactorSelector = () => 0.75;

    MyMath = {
        random: (min, max) => Math.random() * (max - min) + min,
        pointDist: (x1, y1, x2, y2) => {
            const distX = x2 - x1;
            const distY = y2 - y1;
            return Math.sqrt((distX ** 2) + (distY ** 2));
        },
        pointAngle: (x1, y1, x2, y2) => this.PI_HALF + Math.atan2(y2 - y1, x2 - x1),
    }

    createParticleCollection () {
        return this.COLOR_CODES_W_INVIS.reduce((r, item) => {
            const result = r;
            result[item] = [];
            return result;
        }, {});
    }

    randomColorSimple () {
        return this.COLOR_CODES[Math.random() * this.COLOR_CODES.length | 0];
    }

    randomColor (options = {}) {
        const { notSame, notColor, limitWhite } = options;
        let color = this.randomColorSimple();

        // limit the amount of white chosen randomly
        if (limitWhite && color === this.COLOR.White && Math.random() < 0.6) {
            color = this.randomColorSimple();
        }
        if (notSame) {
            while (color === this.lastColor) {
                color = this.randomColorSimple();
            }
        } else if (notColor) {
            while (color === notColor) {
                color = this.randomColorSimple();
            }
        }
        this.lastColor = color;
        return color;
    }

    whiteOrGold () {
        return Math.random() < 0.5 ? this.COLOR.Gold : this.COLOR.White;
    }

    makePistilColor (shellColor) {
        return (shellColor === this.COLOR.White || shellColor === this.COLOR.Gold)
            ? this.randomColor({ notColor: shellColor })
            : this.whiteOrGold();
    }
}
