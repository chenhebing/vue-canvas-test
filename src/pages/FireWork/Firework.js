
import Stage from './Stage';
import Shell from './Shell';
import Base from './Base';

import Star from './Star';
import Spark from './Spark';
import BurstFlash from './BurstFlash';

const RAF = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function RAF (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

export default class Firework extends Base {
    constructor (id1, id2) {
        super();
        this.trailsStage = new Stage(id1, window.innerWidth, window.innerHeight);
        this.mainStage = new Stage(id2, window.innerWidth, window.innerHeight);
        this.Star = new Star();
        this.Spark = new Spark();
        this.BurstFlash = new BurstFlash();

        this.starSparkBurst = {
            Star: this.Star,
            Spark: this.Spark,
            BurstFlash: this.BurstFlash,
        };
        this.stopAnimation = false;
    }

    lastTimesStamp = 0

    currentFrame = 0

    autoLaunchTime = 0

    speedBarOpacity = 0

    shellTypes = () => ({
        Random: this.randomShell,
        Crackle: this.crackleShell,
        Crossette: this.crossetteShell,
        Crysanthemum: this.crysanthemumShell,
        'Falling Leaves': this.fallingLeavesShell,
        Floral: this.floralShell,
        Ghost: this.ghostShell,
        'Horse Tail': this.horsetailShell,
        Palm: this.palmShell,
        Ring: this.ringShell,
        Strobe: this.strobeShell,
        Willow: this.willowShell,
    })

    shellNames = Object.keys(this.shellTypes())

    crysanthemumShell = (size = 1) => {
        const glitter = Math.random() < 0.25;
        const singleColor = Math.random() < 0.72;
        const color = singleColor
            ? this.randomColor({ limitWhite: true })
            : [this.randomColor(), this.randomColor({ notSame: true })];
        const pistil = singleColor && Math.random() < 0.42;
        const pistilColor = pistil && this.makePistilColor(color);
        const secondColor = singleColor && (Math.random() < 0.2 || color === this.COLOR.White)
            ? pistilColor || this.randomColor({ notColor: color, limitWhite: true })
            : null;
        const streamers = !pistil && color !== this.COLOR.White && Math.random() < 0.42;
        let starDensity = glitter ? 1.1 : 1.25;
        if (this.isLowQuality) starDensity *= 0.8;
        if (this.isHighQuality) starDensity = 1.2;
        return {
            shellSize: size,
            spreadSize: 300 + size * 100,
            starLife: 900 + size * 200,
            starDensity,
            color,
            secondColor,
            glitter: glitter ? 'light' : '',
            glitterColor: this.whiteOrGold(),
            pistil,
            pistilColor,
            streamers,
        };
    }

    ghostShell = (size = 1) => {
        const shell = this.crysanthemumShell(size);
        shell.starLife *= 1.5;
        // Ensure we always have a single color other than white
        const ghostColor = this.randomColor({ notColor: this.COLOR.White });
        // Always use streamers, and sometimes a pistil
        shell.streamers = true;
        // Ghost effect - transition from invisible to chosen color
        shell.color = this.INVISIBLE;
        shell.secondColor = ghostColor;
        // We don't want glitter to be spewed by invisible stars, and we don't currently
        // have a way to transition glitter state. So we'll disable it.
        shell.glitter = '';
        return shell;
    }

    strobeShell = (size = 1) => {
        const color = this.randomColor({ limitWhite: true });
        return {
            shellSize: size,
            spreadSize: 280 + size * 92,
            starLife: 1100 + size * 200,
            starLifeVariation: 0.40,
            starDensity: 1.1,
            color,
            glitter: 'light',
            glitterColor: this.COLOR.White,
            strobe: true,
            strobeColor: Math.random() < 0.5 ? this.COLOR.White : null,
            pistil: Math.random() < 0.5,
            pistilColor: this.makePistilColor(color),
        };
    }

    palmShell = (size = 1) => {
        const color = this.randomColor();
        const thick = Math.random() < 0.5;
        return {
            shellSize: size,
            color,
            spreadSize: 250 + size * 75,
            starDensity: thick ? 0.15 : 0.4,
            starLife: 1800 + size * 200,
            glitter: thick ? 'thick' : 'heavy',
        };
    }

    ringShell = (size = 1) => {
        const color = this.randomColor();
        const pistil = Math.random() < 0.75;
        return {
            shellSize: size,
            ring: true,
            color,
            spreadSize: 300 + size * 100,
            starLife: 900 + size * 200,
            starCount: 2.2 * this.PI_2 * (size + 1),
            pistil,
            pistilColor: this.makePistilColor(color),
            glitter: !pistil ? 'light' : '',
            glitterColor: color === this.COLOR.Gold ? this.COLOR.Gold : this.COLOR.White,
            streamers: Math.random() < 0.3,
        };
    }

    crossetteShell = (size = 1) => {
        const color = this.randomColor({ limitWhite: true });
        return {
            shellSize: size,
            spreadSize: 300 + size * 100,
            starLife: 750 + size * 160,
            starLifeVariation: 0.4,
            starDensity: 0.85,
            color,
            crossette: true,
            pistil: Math.random() < 0.5,
            pistilColor: this.makePistilColor(color),
        };
    }

    floralShell = (size = 1) => {
        let color;
        if (Math.random() < 0.65) {
            color = 'random';
        } else {
            color = Math.random() < 0.15
                ? this.randomColor()
                : [this.randomColor(), this.randomColor({ notSame: true })];
        }
        return {
            shellSize: size,
            spreadSize: 300 + size * 120,
            starDensity: 0.12,
            starLife: 500 + size * 50,
            starLifeVariation: 0.5,
            color,
            floral: true,
        };
    }

    fallingLeavesShell = (size = 1) => ({
        shellSize: size,
        color: this.INVISIBLE,
        spreadSize: 300 + size * 120,
        starDensity: 0.12,
        starLife: 500 + size * 50,
        starLifeVariation: 0.5,
        glitter: 'medium',
        glitterColor: this.COLOR.Gold,
        fallingLeaves: true,
    })

    willowShell = (size = 1) => ({
        shellSize: size,
        spreadSize: 300 + size * 100,
        starDensity: 0.6,
        starLife: 3000 + size * 300,
        glitter: 'willow',
        glitterColor: this.COLOR.Gold,
        color: this.INVISIBLE,
    })

    crackleShell = (size = 1) => {
        const color = Math.random() < 0.75 ? this.COLOR.Gold : this.randomColor();
        return {
            shellSize: size,
            spreadSize: 380 + size * 75,
            starDensity: this.isLowQuality ? 0.65 : 1,
            starLife: 600 + size * 100,
            starLifeVariation: 0.32,
            glitter: 'light',
            glitterColor: this.COLOR.Gold,
            color,
            crackle: true,
            pistil: Math.random() < 0.65,
            pistilColor: this.makePistilColor(color),
        };
    }

    horsetailShell = (size = 1) => {
        const color = this.randomColor();
        return {
            shellSize: size,
            horsetail: true,
            color,
            spreadSize: 250 + size * 38,
            starDensity: 0.9,
            starLife: 2500 + size * 300,
            glitter: 'medium',
            glitterColor: Math.random() < 0.5 ? this.whiteOrGold() : color,
            // Add strobe effect to white horsetails, to make them more interesting
            strobe: color === this.COLOR.White,
        };
    }

    randomShell = size => this.shellTypes()[this.randomShellName()](size)

    randomShellName () {
        return Math.random() < 0.5 ? 'Crysanthemum' : this.shellNames[(Math.random() * (this.shellNames.length - 1) + 1) | 0];
    }

    isFirstSeq = true

    finaleCount = 32

    currentFinaleCount = 0

    baseSize = 3

    fitShellPositionInBoundsH = (position) => {
        const edge = 0.18;
        return (1 - edge * 2) * position + edge;
    }

    fitShellPositionInBoundsV = position => position * 0.75

    getRandomShellSize () {
        const maxVariance = Math.min(2.5, this.baseSize);
        const variance = Math.random() * maxVariance;
        const size = this.baseSize - variance;
        const height = maxVariance === 0 ? Math.random() : 1 - (variance / maxVariance);
        const centerOffset = Math.random() * (1 - height * 0.65) * 0.5;
        const x = Math.random() < 0.5 ? 0.5 - centerOffset : 0.5 + centerOffset;
        return {
            size,
            x: this.fitShellPositionInBoundsH(x),
            height: this.fitShellPositionInBoundsV(height),
        };
    }

    shellFromConfig (size) {
        return this.shellTypes().Random(size);
    }

    seqTwoRandom () {
        const size1 = this.getRandomShellSize();
        const size2 = this.getRandomShellSize();
        const shell1 = new Shell(this.shellFromConfig(size1.size), this.starSparkBurst);
        const shell2 = new Shell(this.shellFromConfig(size2.size), this.starSparkBurst);
        const leftOffset = Math.random() * 0.2 - 0.1;
        const rightOffset = Math.random() * 0.2 - 0.1;
        shell1.launch(0.3 + leftOffset, size1.height);
        setTimeout(() => {
            shell2.launch(0.7 + rightOffset, size2.height);
        }, 100);

        let extraDelay = Math.max(shell1.starLife, shell2.starLife);
        if (shell1.fallingLeaves || shell2.fallingLeaves) {
            extraDelay = 4600;
        }

        return 900 + Math.random() * 600 + extraDelay;
    }

    fastShellBlacklist = ['Falling Leaves', 'Floral', 'Willow'];

    randomFastShell () {
        let shellName = this.randomShellName();
        while (this.fastShellBlacklist.includes(shellName)) {
            shellName = this.randomShellName();
        }
        return this.shellTypes()[shellName];
    }

    seqSmallBarragelastCalled = Date.now()

    seqSmallBarrage () {
        this.seqSmallBarragelastCalled = Date.now();
        const barrageCount = 5;
        const specialIndex = 1;
        const shellSize = 1;
        const randomMainShell = Math.random() < 0.78 ? this.crysanthemumShell : this.ringShell;
        const randomSpecialShell = this.randomFastShell();

        const launchShell = (x, useSpecial) => {
            const shellType = useSpecial ? randomSpecialShell : randomMainShell;
            const shell = new Shell(shellType(shellSize), this.starSparkBurst);
            const height = (Math.cos(x * 5 * Math.PI + this.PI_HALF) + 1) / 2;
            shell.launch(x, height * 0.75);
        };

        let count = 0;
        let delay = 0;
        while (count < barrageCount) {
            if (count === 0) {
                launchShell(0.5, false);
                count += 1;
            } else {
                const offset = (count + 1) / barrageCount / 2;
                const delayOffset = Math.random() * 30 + 30;
                const useSpecial = count === specialIndex;
                setTimeout(() => {
                    launchShell(0.5 + offset, useSpecial);
                }, delay);
                setTimeout(() => {
                    launchShell(0.5 - offset, useSpecial);
                }, delay + delayOffset);
                count += 2;
            }
            delay += 200;
        }

        return 3400 + barrageCount * 120;
    }

    seqPyramid () {
        const barrageCountHalf = 4;
        const largeSize = 3;
        const smallSize = 0;
        const randomMainShell = Math.random() < 0.78 ? this.crysanthemumShell : this.ringShell;
        const randomSpecialShell = this.randomShell;

        const launchShell = (x, useSpecial) => {
            const shellType = useSpecial ? randomSpecialShell : randomMainShell;
            const shell = new Shell(shellType(useSpecial ? largeSize : smallSize),
                this.starSparkBurst);
            const height = x <= 0.5 ? x / 0.5 : (1 - x) / 0.5;
            shell.launch(x, useSpecial ? 0.75 : height * 0.42);
        };

        let count = 0;
        let delay = 0;
        while (count <= barrageCountHalf) {
            if (count === barrageCountHalf) {
                setTimeout(() => {
                    launchShell(0.5, true);
                }, delay);
            } else {
                const offset = count / barrageCountHalf * 0.5;
                const delayOffset = Math.random() * 30 + 30;
                setTimeout(() => {
                    launchShell(offset, false);
                }, delay);
                setTimeout(() => {
                    launchShell(1 - offset, false);
                }, delay + delayOffset);
            }

            count++;
            delay += 200;
        }

        return 3400 + barrageCountHalf * 250;
    }

    seqRandomShell () {
        const size = this.getRandomShellSize();
        const shell = new Shell(this.shellFromConfig(size.size), this.starSparkBurst);
        shell.launch(size.x, size.height);

        let extraDelay = shell.starLife;
        if (shell.fallingLeaves) {
            extraDelay = 4600;
        }

        return 900 + Math.random() * 600 + extraDelay;
    }

    seqTriple () {
        const shellType = this.randomFastShell();
        const smallSize = Math.max(0, this.baseSize - 1.25);

        const offset = Math.random() * 0.08 - 0.04;
        const shell1 = new Shell(shellType(this.baseSize), this.starSparkBurst);
        shell1.launch(0.5 + offset, 0.7);

        const leftDelay = 1000 + Math.random() * 400;
        const rightDelay = 1000 + Math.random() * 400;

        setTimeout(() => {
            const soffset = Math.random() * 0.08 - 0.04;
            const shell2 = new Shell(shellType(smallSize), this.starSparkBurst);
            shell2.launch(0.2 + soffset, 0.1);
        }, leftDelay);

        setTimeout(() => {
            const soffset = Math.random() * 0.08 - 0.04;
            const shell3 = new Shell(shellType(smallSize), this.starSparkBurst);
            shell3.launch(0.8 + soffset, 0.1);
        }, rightDelay);

        return 4000;
    }

    startSequence () {
        if (this.isFirstSeq) {
            this.isFirstSeq = false;
            const shell = new Shell(this.crysanthemumShell(this.baseSize), this.starSparkBurst);
            shell.launch(0.5, 0.5);
            return 2400;
        }

        const rand = Math.random();

        if (rand < 0.08 && Date.now() - this.seqSmallBarragelastCalled > 15000) {
            return this.seqSmallBarrage();
        }

        if (rand < 0.1) {
            return this.seqPyramid();
        }

        if (rand < 0.6) {
            return this.seqRandomShell();
        }
        if (rand < 0.8) {
            return this.seqTwoRandom();
        }
        if (rand < 1) {
            return this.seqTriple();
        }
        return null;
    }

    stop () {
        this.stopAnimation = true;
    }

    start () {
        this.stopAnimation = false;
        this.update();
    }

    updateGlobals (timeStep) {
        this.currentFrame++;
        this.autoLaunchTime -= timeStep;
        if (this.autoLaunchTime <= 0) {
            this.autoLaunchTime = this.startSequence() * 1.25;
        }
    }

    update = (nowTime = 16.67) => {
        if (this.stopAnimation) {
            return;
        }
        let timeStep = nowTime - this.lastTimesStamp;
        this.lastTimesStamp = nowTime;
        if (timeStep < 0) {
            timeStep = 17;
        } else if (timeStep > 68) {
            timeStep = 68;
        }
        const speed = 1;
        this.updateGlobals(timeStep, 1);

        const starDrag = 1 - (1 - this.Star.airDrag) * speed;
        const starDragHeavy = 1 - (1 - this.Star.airDragHeavy) * speed;
        const sparkDrag = 1 - (1 - this.Spark.airDrag) * speed;
        const gAcc = timeStep / 1000 * this.GRAVITY;

        this.COLOR_CODES_W_INVIS.forEach((color) => {
            // Stars
            const stars = this.Star.active[color];
            for (let i = stars.length - 1; i >= 0; i -= 1) {
                const star = stars[i];
                if (star.updateFrame === this.currentFrame) {
                    continue;
                }
                star.updateFrame = this.currentFrame;

                star.life -= timeStep;
                if (star.life <= 0) {
                    stars.splice(i, 1);
                    this.Star.returnInstance(star);
                } else {
                    const burnRate = (star.life / star.fullLife) ** 0.5;
                    const burnRateInverse = 1 - burnRate;

                    star.prevX = star.x;
                    star.prevY = star.y;
                    star.x += star.speedX * speed;
                    star.y += star.speedY * speed;
                    if (!star.heavy) {
                        star.speedX *= starDrag;
                        star.speedY *= starDrag;
                    } else {
                        star.speedX *= starDragHeavy;
                        star.speedY *= starDragHeavy;
                    }
                    star.speedY += gAcc;

                    if (star.spinRadius) {
                        star.spinAngle += star.spinSpeed * speed;
                        star.x += Math.sin(star.spinAngle) * star.spinRadius * speed;
                        star.y += Math.cos(star.spinAngle) * star.spinRadius * speed;
                    }

                    if (star.sparkFreq) {
                        star.sparkTimer -= timeStep;
                        while (star.sparkTimer < 0) {
                            star.sparkTimer += star.sparkFreq * 0.75 +
                                star.sparkFreq * burnRateInverse * 4;
                            this.Spark.add(
                                star.x,
                                star.y,
                                star.sparkColor,
                                Math.random() * this.PI_2,
                                Math.random() * star.sparkSpeed * burnRate,
                                star.sparkLife * 0.8 +
                                Math.random() * star.sparkLifeVariation * star.sparkLife
                            );
                        }
                    }

                    // Handle star transitions
                    if (star.life < star.transitionTime) {
                        if (star.secondColor && !star.colorChanged) {
                            star.colorChanged = true;
                            star.color = star.secondColor;
                            stars.splice(i, 1);
                            this.Star.active[star.secondColor].push(star);
                            if (star.secondColor === this.INVISIBLE) {
                                star.sparkFreq = 0;
                            }
                        }

                        if (star.strobe) {
                            star.visible = Math.floor(star.life / star.strobeFreq) % 3 === 0;
                        }
                    }
                }
            }

            // Sparks
            const sparks = this.Spark.active[color];
            for (let i = sparks.length - 1; i >= 0; i -= 1) {
                const spark = sparks[i];
                spark.life -= timeStep;
                if (spark.life <= 0) {
                    sparks.splice(i, 1);
                    this.Spark.returnInstance(spark);
                } else {
                    spark.prevX = spark.x;
                    spark.prevY = spark.y;
                    spark.x += spark.speedX * speed;
                    spark.y += spark.speedY * speed;
                    spark.speedX *= sparkDrag;
                    spark.speedY *= sparkDrag;
                    spark.speedY += gAcc;
                }
            }
        });
        this.updateThenRender(speed);
        RAF(this.update);
    }

    updateThenRender (speed) {
        const { dpr } = this.mainStage;
        const width = this.stageW;
        const height = this.stageH;
        const trailsCtx = this.trailsStage.ctx;
        const mainCtx = this.mainStage.ctx;

        // Account for high DPI screens, and custom scale factor.
        const scaleFactor = this.scaleFactorSelector();
        trailsCtx.scale(dpr * scaleFactor, dpr * scaleFactor);
        mainCtx.scale(dpr * scaleFactor, dpr * scaleFactor);

        trailsCtx.globalCompositeOperation = 'source-over';
        trailsCtx.fillStyle = `rgba(0, 0, 0, ${0.175 * speed})`;
        trailsCtx.fillRect(0, 0, width, height);

        mainCtx.clearRect(0, 0, width, height);

        // Draw queued burst flashes
        // Thankfully, these burst flashes look pretty much the same either way.
        while (this.BurstFlash.active.length) {
            const bf = this.BurstFlash.active.pop();

            const burstGradient = trailsCtx.createRadialGradient(bf.x, bf.y, 0, bf.x, bf.y, bf.radius);     // eslint-disable-line
            burstGradient.addColorStop(0.024, 'rgba(255, 255, 255, 1)');
            burstGradient.addColorStop(0.125, 'rgba(255, 160, 20, 0.2)');
            burstGradient.addColorStop(0.32, 'rgba(255, 140, 20, 0.11)');
            burstGradient.addColorStop(1, 'rgba(255, 120, 20, 0)');
            trailsCtx.fillStyle = burstGradient;
            trailsCtx.fillRect(bf.x - bf.radius, bf.y - bf.radius, bf.radius * 2, bf.radius * 2);

            this.BurstFlash.returnInstance(bf);
        }

        // Remaining drawing on trails canvas will use 'lighten' blend mode
        trailsCtx.globalCompositeOperation = 'lighten';

        // Draw stars
        trailsCtx.lineWidth = this.Star.drawWidth;
        trailsCtx.lineCap = this.isLowQuality ? 'square' : 'round';
        mainCtx.strokeStyle = '#fff';
        mainCtx.lineWidth = 1;
        mainCtx.beginPath();
        this.COLOR_CODES.forEach((color) => {
            const stars = this.Star.active[color];
            trailsCtx.strokeStyle = color;
            trailsCtx.beginPath();
            stars.forEach((star) => {
                if (star.visible) {
                    trailsCtx.moveTo(star.x, star.y);
                    trailsCtx.lineTo(star.prevX, star.prevY);
                    mainCtx.moveTo(star.x, star.y);
                    mainCtx.lineTo(star.x - star.speedX * 1.6, star.y - star.speedY * 1.6);
                }
            });
            trailsCtx.stroke();
        });
        mainCtx.stroke();

        // Draw sparks
        trailsCtx.lineWidth = this.Spark.drawWidth;
        trailsCtx.lineCap = 'butt';
        this.COLOR_CODES.forEach((color) => {
            const sparks = this.Spark.active[color];
            trailsCtx.strokeStyle = color;
            trailsCtx.beginPath();
            sparks.forEach((spark) => {
                // console.log(spark)
                trailsCtx.moveTo(spark.x, spark.y);
                trailsCtx.lineTo(spark.prevX, spark.prevY);
            });
            trailsCtx.stroke();
        });
        trailsCtx.setTransform(1, 0, 0, 1, 0, 0);
        mainCtx.setTransform(1, 0, 0, 1, 0, 0);
    }
}
