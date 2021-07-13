import { PROJECTILE_LIFETIME_MS, PROJECTILE_SIZE, PROJECTILE_SPEED } from "./Constants";
import { Entity } from "./Entity";
import { IVector } from "./Vector";

export default class Projectile extends Entity {
    deathTimestamp: number;

    constructor(pos: IVector, speed: IVector, spawnTimestamp: number) {
        super(pos, speed, PROJECTILE_SIZE);

        this.speed.normalize().multByScalar(PROJECTILE_SPEED);

        this.deathTimestamp = spawnTimestamp+PROJECTILE_LIFETIME_MS;
    }

    move(): void {
        this.position.add(this.speed);
    }

    isAlive(timestamp: number): boolean {
        return this.alive && this.deathTimestamp > timestamp;
    }

}