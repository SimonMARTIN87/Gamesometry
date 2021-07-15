import { FIRE_INPUT_MIN_LENGTH, GAME_LIMITS, PLAYER_HALF_SIZE, PLAYER_INVINCIBILITY_TIMEFRAME, PLAYER_LIFES, PLAYER_SIZE, PLAYER_SPEED } from "./Constants";
import { Entity } from "./Entity";
import { gamePadRumble, PlayerInputs } from "./PlayerInput";
import Projectile from "./Projectile";

export default class Player extends Entity {
    fire_delay: number = 250;
    last_fire_timestamp: number = 0;
    lives: number = PLAYER_LIFES;
    is_invincible: boolean = false;
    invincible_until_timestamp: number = 0;

    constructor() {
        super({x: 250, y: 250}, {}, PLAYER_SIZE);
    }

    move(input: PlayerInputs): void {
        this.speed = input.positionInput.multByScalar(PLAYER_SPEED);
        this.position.add(this.speed);

        if (this.position.x <= PLAYER_HALF_SIZE) {
            this.position.x = PLAYER_HALF_SIZE;
        }
        else if (this.position.x + PLAYER_HALF_SIZE >= GAME_LIMITS.x) {
            this.position.x = GAME_LIMITS.x - PLAYER_HALF_SIZE;
        }

        if (this.position.y <= PLAYER_HALF_SIZE) {
            this.position.y = PLAYER_HALF_SIZE;
        }
        else if (this.position.y + PLAYER_HALF_SIZE >= GAME_LIMITS.y) {
            this.position.y = GAME_LIMITS.y - PLAYER_HALF_SIZE;
        }

    }

    fire(inputs: PlayerInputs, timestamp: number): Array<Projectile> {
        if(inputs.fireInput.lenght() > FIRE_INPUT_MIN_LENGTH) {
            if (timestamp - this.last_fire_timestamp > this.fire_delay) {
                this.last_fire_timestamp = timestamp;
                return [new Projectile(this.position, inputs.fireInput, timestamp) ];
            }
        }
        return [];
    }

    decreaseLife(touchTimestamp: number): void {
        if (this.is_invincible) return;

        gamePadRumble(.5,500);

        this.lives--;

        if (this.lives <= 0){
            gamePadRumble(.8,1000);
            return this.die();
        }

        this.is_invincible = true;
        this.invincible_until_timestamp = touchTimestamp + PLAYER_INVINCIBILITY_TIMEFRAME;
    }

    checkInvincibility(timestamp: number): void {
        if (this.is_invincible && timestamp >= this.invincible_until_timestamp) {
            this.is_invincible = false;
        }
    }

};