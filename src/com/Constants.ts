import {Vector} from "./Vector";

export const GAME_LIMITS: Vector = new Vector({x: 800, y: 400});
export const PLAYER_SIZE: number = 20;
export const PLAYER_HALF_SIZE: number = PLAYER_SIZE / 2.;
export const PLAYER_SPEED: number = 2;
export const ENEMY_SIZE: number = 15;
export const ENEMY_HALF_SIZE: number = ENEMY_SIZE / 2.;
export const ENEMY_MAX_LINEAR_SPEED: number = 1.5;
export const FIRE_INPUT_MIN_LENGTH: number = 0.20;
export const PROJECTILE_SIZE: number = 4;
export const PROJECTILE_SPEED: number = 4;
export const PROJECTILE_LIFETIME_MS: number = 1500;
export const MAX_SPAWN_TIME: number = 4000;
export const PLAYER_INVINCIBILITY_TIMEFRAME = 1000;
export const SPECIAL_INPUTS_LATENCY = 1000;
export const PLAYER_LIFES = 3;
export const LIFE_DISPLAY_SIZE = 15;