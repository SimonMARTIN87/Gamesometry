import { ENEMY_HALF_SIZE, ENEMY_SIZE, GAME_LIMITS } from "../Constants";
import { Entity } from "../Entity";
import { PlayerInputs } from "../PlayerInput";
import Projectile from "../Projectile";
import { IVector, Vector } from "../Vector";

export default abstract class Enemy extends Entity {
    lives:number = 3;
    fire_delay: number = 2500;
    last_fire_timestamp: number = 0;

    constructor(pos: IVector, speed: IVector) {
        super(pos, speed, ENEMY_SIZE);
    }

    move(input?: PlayerInputs, target?: Entity): void {
        const tmpPos = new Vector(this.position);
        tmpPos.add(this.speed);

        if (tmpPos.x-ENEMY_HALF_SIZE <= 0 || tmpPos.x+ENEMY_HALF_SIZE >= GAME_LIMITS.x) {
            this.speed.x *= -1;
        }
        if (tmpPos.y-ENEMY_HALF_SIZE <= 0 || tmpPos.y+ENEMY_HALF_SIZE >= GAME_LIMITS.y) {
            this.speed.y *= -1;
        }
        this.position.add(this.speed);
    }

    decreaseLife(val: number = 1) {
        this.lives -= val;
        if (this.lives <= 0) {
            this.die();
        }
    }

    fire(targetPos: Vector, timestamp: number): Array<Projectile> {
        // delay first shot - too hard to dodge !
        if (this.last_fire_timestamp === 0) {
            this.last_fire_timestamp = timestamp;
        }
        else if (timestamp - this.last_fire_timestamp > this.fire_delay) {
            this.last_fire_timestamp = timestamp;
            const speed = (new Vector(targetPos)).minus(this.position);
            return [new Projectile(this.position, speed , timestamp) ];
        }
        return [];
    }

}