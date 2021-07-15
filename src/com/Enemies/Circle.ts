import { Entity } from "../Entity";
import { PlayerInputs } from "../PlayerInput";
import { Vector } from "../Vector";
import Enemy from "./Enemy";

export default class Circle extends Enemy {
    
    move(input?: PlayerInputs, target?: Entity): void {
        if (!target) {
            throw "Target needed !";
        }

        const tmpSpeed = new Vector(target.position);
        tmpSpeed.minus(this.position);
        this.speed = tmpSpeed.normalize();

        super.move(input, target);
    }
}