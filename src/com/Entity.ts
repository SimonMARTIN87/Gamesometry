import { PlayerInputs } from "./PlayerInput";
import {Vector, IVector} from "./Vector";

export abstract class Entity {
    position: Vector;
    speed: Vector;
    size: number;
    alive: boolean = true;

    constructor(pos: IVector, speed: IVector, size?: number) {
        this.position = new Vector(pos);
        this.speed = new Vector(speed);
        this.size = size ?? 0;
    }

    abstract move(input?: PlayerInputs, target?: Entity): void;
    
    intersect(other: Entity): boolean {
        if (!this.alive || !other.alive) {
            return false;
        }
        const threshold = this.size/2 + other.size/2;

        const distance = (new Vector(this.position)).minus(other.position).lenght();
        return distance < threshold;
    }

    die(): void {
        this.alive = false;
    }


}