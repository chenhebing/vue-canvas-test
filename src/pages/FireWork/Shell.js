import Base from './Base';

export default class Shell extends Base {
    constructor (options, starSparkBurst) {
        super();
        Object.assign(this, options, starSparkBurst);
        this.starSparkBurst = starSparkBurst;
        this.starLifeVariation = options.starLifeVariation || 0.125;
        this.color = options.color || this.randomColor();
        this.glitterColor = options.glitterColor || this.color;
        if (!this.starCount) {
            const density = options.starDensity || 1;
            const scaledSize = this.spreadSize / 54;
            this.starCount = Math.max(6, scaledSize * scaledSize * density);
        }
    }

    launch (position, launchHeight) {
        const width = this.stageW;
        const height = this.stageH;
        // Distance from sides of screen to keep shells.
        const hpad = 60;
        // Distance from top of screen to keep shell bursts.
        const vpad = 50;
        // Minimum burst height, as a percentage of stage height
        const minHeightPercent = 0.45;
        // Minimum burst height in px
        const minHeight = height - height * minHeightPercent;

        const launchX = position * (width - hpad * 2) + hpad;
        const launchY = height;
        const burstY = minHeight - (launchHeight * (minHeight - vpad));

        const launchDistance = launchY - burstY;
        // Magic numbers came from testing.
        const launchVelocity = (launchDistance * 0.04) ** 0.64;

        this.comet = this.Star.add(
            launchX,
            launchY,
            typeof this.color === 'string' && this.color !== 'random' ? this.color : this.COLOR.White,
            Math.PI,
            launchVelocity * (this.horsetail ? 1.2 : 1),
            // Hang time is derived linearly from Vi; exact number came from testing
            launchVelocity * (this.horsetail ? 100 : 400)
        );

        const comet = this.comet;

        // making comet "heavy" limits air drag
        comet.heavy = true;
        // comet spark trail
        comet.spinRadius = this.MyMath.random(0.32, 0.85);
        comet.sparkFreq = 32 / this.quality;
        if (this.isHighQuality) comet.sparkFreq = 8;
        comet.sparkLife = 320;
        comet.sparkLifeVariation = 3;
        if (this.glitter === 'willow' || this.fallingLeaves) {
            comet.sparkFreq = 20 / this.quality;
            comet.sparkSpeed = 0.5;
            comet.sparkLife = 500;
        }
        if (this.color === this.INVISIBLE) {
            comet.sparkColor = this.COLOR.Gold;
        }

        // Randomly make comet "burn out" a bit early.
        // This is disabled for horsetail shells, due to their very short airtime.
        if (Math.random() > 0.4 && !this.horsetail) {
            comet.secondColor = this.INVISIBLE;
            comet.transitionTime = (Math.random() ** 1.5) * 700 + 500;
        }

        comet.onDeath = cometItem => this.burst(cometItem.x, cometItem.y);
    }

    burst (x, y) {
        const speed = this.spreadSize / 96;

        let color, onDeath, sparkFreq, sparkSpeed, sparkLife;
        let sparkLifeVariation = 0.25;
        // Some death effects, like crackle, play a sound, but should only be played once.

        if (this.crossette) {
            onDeath = (star) => {
                this.crossetteEffect(star);
            };
        }
        if (this.crackle) {
            onDeath = (star) => {
                this.crackleEffect(star);
            };
        }
        if (this.floral) onDeath = this.floralEffect.bind(this);
        if (this.fallingLeaves) onDeath = this.fallingLeavesEffect.bind(this);

        if (this.glitter === 'light') {
            sparkFreq = 400;
            sparkSpeed = 0.3;
            sparkLife = 300;
            sparkLifeVariation = 2;
        } else if (this.glitter === 'medium') {
            sparkFreq = 200;
            sparkSpeed = 0.44;
            sparkLife = 700;
            sparkLifeVariation = 2;
        } else if (this.glitter === 'heavy') {
            sparkFreq = 80;
            sparkSpeed = 0.8;
            sparkLife = 1400;
            sparkLifeVariation = 2;
        } else if (this.glitter === 'thick') {
            sparkFreq = 16;
            sparkSpeed = this.isHighQuality ? 1.65 : 1.5;
            sparkLife = 1400;
            sparkLifeVariation = 3;
        } else if (this.glitter === 'streamer') {
            sparkFreq = 32;
            sparkSpeed = 1.05;
            sparkLife = 620;
            sparkLifeVariation = 2;
        } else if (this.glitter === 'willow') {
            sparkFreq = 120;
            sparkSpeed = 0.34;
            sparkLife = 1400;
            sparkLifeVariation = 3.8;
        }

        // Apply quality to spark count
        sparkFreq /= this.quality;

        const starFactory = (angle, speedMult) => {
            const standardInitialSpeed = this.spreadSize / 1800;

            const star = this.Star.add(
                x,
                y,
                color || this.randomColor(),
                angle,
                speedMult * speed,
                // add minor variation to star life
                this.starLife + Math.random() * this.starLife * this.starLifeVariation,
                this.horsetail ? this.comet && this.comet.speedX : 0,
                this.horsetail ? this.comet && this.comet.speedY : -standardInitialSpeed
            );

            if (this.secondColor) {
                star.transitionTime = this.starLife * (Math.random() * 0.05 + 0.32);
                star.secondColor = this.secondColor;
            }

            if (this.strobe) {
                star.transitionTime = this.starLife * (Math.random() * 0.08 + 0.46);
                star.strobe = true;
                star.strobeFreq = Math.random() * 20 + 40;
                if (this.strobeColor) {
                    star.secondColor = this.strobeColor;
                }
            }

            star.onDeath = onDeath;

            if (this.glitter) {
                star.sparkFreq = sparkFreq;
                star.sparkSpeed = sparkSpeed;
                star.sparkLife = sparkLife;
                star.sparkLifeVariation = sparkLifeVariation;
                star.sparkColor = this.glitterColor;
                star.sparkTimer = Math.random() * star.sparkFreq;
            }
        };

        if (typeof this.color === 'string') {
            if (this.color === 'random') {
                color = null; // falsey value creates random color in starFactory
            } else {
                color = this.color;
            }

            // Rings have positional randomness, but are rotated randomly
            if (this.ring) {
                const ringStartAngle = Math.random() * Math.PI;
                const ringSquash = (Math.random() ** 2) * 0.85 + 0.15;

                this.createParticleArc(0, this.PI_2, this.starCount, 0, (angle) => {
                    // Create a ring, squashed horizontally
                    const initSpeedX = Math.sin(angle) * speed * ringSquash;
                    const initSpeedY = Math.cos(angle) * speed;
                    // Rotate ring
                    const newSpeed = this.MyMath.pointDist(0, 0, initSpeedX, initSpeedY);
                    const newAngle = this.MyMath.pointAngle(0, 0, initSpeedX, initSpeedY) +
                        ringStartAngle;
                    const star = this.Star.add(
                        x,
                        y,
                        color,
                        newAngle,
                        newSpeed,
                        this.starLife + Math.random() * this.starLife * this.starLifeVariation
                    );

                    if (this.glitter) {
                        star.sparkFreq = sparkFreq;
                        star.sparkSpeed = sparkSpeed;
                        star.sparkLife = sparkLife;
                        star.sparkLifeVariation = sparkLifeVariation;
                        star.sparkColor = this.glitterColor;
                        star.sparkTimer = Math.random() * star.sparkFreq;
                    }
                });
            } else {
                this.createBurst(this.starCount, starFactory);
            }
        } else if (Array.isArray(this.color)) {
            if (Math.random() < 0.5) {
                const start = Math.random() * Math.PI;
                const start2 = start + Math.PI;
                const arc = Math.PI;
                color = this.color[0];
                // Not creating a full arc automatically reduces star count.
                this.createBurst(this.starCount, starFactory, start, arc);
                color = this.color[1];
                this.createBurst(this.starCount, starFactory, start2, arc);
            } else {
                color = this.color[0];
                this.createBurst(this.starCount / 2, starFactory);
                color = this.color[1];
                this.createBurst(this.starCount / 2, starFactory);
            }
        }

        if (this.pistil) {
            const innerShell = new Shell({
                spreadSize: this.spreadSize * 0.5,
                starLife: this.starLife * 0.6,
                starLifeVariation: this.starLifeVariation,
                starDensity: 1.4,
                color: this.pistilColor,
                glitter: 'light',
                glitterColor: this.pistilColor === this.COLOR.Gold
                    ? this.COLOR.Gold
                    : this.COLOR.White,
            }, this.starSparkBurst);
            innerShell.burst(x, y);
        }

        if (this.streamers) {
            const innerShell = new Shell({
                spreadSize: this.spreadSize * 0.9,
                starLife: this.starLife * 0.8,
                starLifeVariation: this.starLifeVariation,
                starCount: Math.floor(Math.max(6, this.spreadSize / 45)),
                color: this.COLOR.White,
                glitter: 'streamer',
            }, this.starSparkBurst);
            innerShell.burst(x, y);
        }
        this.BurstFlash.add(x, y, this.spreadSize / 4);
    }

    createParticleArc = (start, arcLength, count, randomness, particleFactory) => {
        const angleDelta = arcLength / count;
        // Would be nice to fix this a better way.
        const end = start + arcLength - (angleDelta * 0.5);

        if (end > start) {
            // Optimization: `angle=angle+angleDelta` vs. angle+=angleDelta
            // V8 deoptimises with let compound assignment
            for (let angle = start; angle < end; angle += angleDelta) {
                particleFactory(angle + Math.random() * angleDelta * randomness);
            }
        } else {
            // eslint-disable-next-line
            for (let angle = start; angle > end; angle = angle + angleDelta) {
                particleFactory(angle + Math.random() * angleDelta * randomness);
            }
        }
    }

    createBurst (count, particleFactory, startAngle = 0, arcLength = Math.PI * 2) {
        const R = 0.5 * Math.sqrt(count / Math.PI);
        // Circumference
        const C = 2 * R * Math.PI;
        // Half Circumference
        const C_HALF = C / 2;

        // Make a series of rings, sizing them as if they were spaced evenly
        // along the curved surface of a sphere.
        for (let i = 0; i <= C_HALF; i++) {
            const ringAngle = i / C_HALF * this.PI_HALF;
            const ringSize = Math.cos(ringAngle);
            const partsPerFullRing = C * ringSize;
            const partsPerArc = partsPerFullRing * (arcLength / this.PI_2);

            const angleInc = this.PI_2 / partsPerFullRing;
            const angleOffset = Math.random() * angleInc + startAngle;
            const maxRandomAngleOffset = angleInc * 0.33;

            for (let j = 0; j < partsPerArc; j++) {
                const randomAngleOffset = Math.random() * maxRandomAngleOffset;
                const angle = angleInc * j + angleOffset + randomAngleOffset;
                particleFactory(angle, ringSize);
            }
        }
    }

    floralEffect (star) {
        const count = 12 + 6 * this.quality;
        this.createBurst(count, (angle, speedMult) => {
            this.Star.add(
                star.x,
                star.y,
                star.color,
                angle,
                speedMult * 2.4,
                1000 + Math.random() * 300,
                star.speedX,
                star.speedY
            );
        });
        // Queue burst flash render
        this.BurstFlash.add(star.x, star.y, 46);
    }

    crackleEffect (star) {
        const count = this.isHighQuality ? 32 : 16;
        this.createParticleArc(0, this.PI_2, count, 1.8, (angle) => {
            this.Spark.add(
                star.x,
                star.y,
                this.COLOR.Gold,
                angle,
                // apply near cubic falloff to speed (places more particles towards outside)
                (Math.random() ** 0.45) * 2.4,
                300 + Math.random() * 200
            );
        });
    }

    crossetteEffect (star) {
        const startAngle = Math.random() * this.PI_HALF;
        this.createParticleArc(startAngle, this.PI_2, 4, 0.5, (angle) => {
            this.Star.add(
                star.x,
                star.y,
                star.color,
                angle,
                Math.random() * 0.6 + 0.75,
                600
            );
        });
    }

    fallingLeavesEffect (star) {
        this.createBurst(7, (angle, speedMult) => {
            const newStar = this.Star.add(
                star.x,
                star.y,
                this.INVISIBLE,
                angle,
                speedMult * 2.4,
                2400 + Math.random() * 600,
                star.speedX,
                star.speedY
            );

            newStar.sparkColor = this.COLOR.Gold;
            newStar.sparkFreq = 144 / this.quality;
            newStar.sparkSpeed = 0.28;
            newStar.sparkLife = 750;
            newStar.sparkLifeVariation = 3.2;
        });
        // Queue burst flash render
        this.BurstFlash.add(star.x, star.y, 46);
    }
}
