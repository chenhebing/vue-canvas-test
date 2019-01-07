import Base from './Base';

export default class Spark extends Base {
    drawWidth = 0

    airDrag = 0.9

    active = this.createParticleCollection()

    _pool = []

    _new = () => ({})

    add (x, y, color, angle, speed, life) {
        const instance = this._pool.pop() || this._new();   // eslint-disable-line

        instance.x = x;
        instance.y = y;
        instance.prevX = x;
        instance.prevY = y;
        instance.color = color;
        instance.speedX = Math.sin(angle) * speed;
        instance.speedY = Math.cos(angle) * speed;
        instance.life = life;

        this.active[color].push(instance);
        return instance;
    }

    // Public method for cleaning up and returning an instance back to the pool.
    returnInstance (instance) {
        // Add back to the pool.
        this._pool.push(instance);  // eslint-disable-line
    }
}
