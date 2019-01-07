import Base from './Base';

export default class Star extends Base {
    drawWidth = 3

    airDrag = 0.98

    airDragHeavy = 0.992

    // Star particles will be keyed by color
    active = this.createParticleCollection()

    _pool = []

    _new = () => ({})

    add (x, y, color, angle, speed, life, speedOffX, speedOffY) {
        const instance = this._pool.pop() || this._new();   // eslint-disable-line
        instance.visible = true;
        instance.heavy = false;
        instance.x = x;
        instance.y = y;
        instance.prevX = x;
        instance.prevY = y;
        instance.color = color;
        instance.speedX = Math.sin(angle) * speed + (speedOffX || 0);
        instance.speedY = Math.cos(angle) * speed + (speedOffY || 0);
        instance.life = life;
        instance.fullLife = life;
        instance.spinAngle = Math.random() * this.PI_2;
        instance.spinSpeed = 0.8;
        instance.spinRadius = 0;
        instance.sparkFreq = 0; // ms between spark emissions
        instance.sparkSpeed = 1;
        instance.sparkTimer = 0;
        instance.sparkColor = color;
        instance.sparkLife = 750;
        instance.sparkLifeVariation = 0.25;
        instance.strobe = false;

        this.active[color].push(instance);
        return instance;
    }

    // Public method for cleaning up and returning an instance back to the pool.
    returnInstance (ins) {
        // Call onDeath handler if available (and pass it current star instance)
        const instance = ins;
        if (instance.onDeath) instance.onDeath(instance);
        // Clean up
        instance.onDeath = null;
        instance.secondColor = null;
        instance.transitionTime = 0;
        instance.colorChanged = false;
        // Add back to the pool.
        this._pool.push(instance);  // eslint-disable-line
    }
}
