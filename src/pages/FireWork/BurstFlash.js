export default class BurstFlash {
    active = [];

    _pool = [];    // eslint-disable-line

    _new = () => ({})

    add (x, y, radius) {
        const instance = this._pool.pop() || this._new();   // eslint-disable-line

        instance.x = x;
        instance.y = y;
        instance.radius = radius;

        this.active.push(instance);
        return instance;
    }

    returnInstance (instance) {
        this._pool.push(instance);  // eslint-disable-line
    }
}
