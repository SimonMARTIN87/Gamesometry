import { ENEMY_MAX_LINEAR_SPEED, FIRE_INPUT_MIN_LENGTH, GAME_LIMITS, MAX_SPAWN_TIME, PLAYER_SIZE, PLAYER_SPEED } from "./Constants";
import Circle from "./Enemies/Circle";
import Enemy from "./Enemies/Enemy";
import Square from "./Enemies/Square";
import { Entity } from "./Entity";
import Player from "./Player";
import { PlayerInputs } from "./PlayerInput";
import Projectile from "./Projectile";
import { Vector } from "./Vector";

export default class Game {
    player: Player;
    enemies: Array<Enemy> = [];

    nextSpawnTimestamp: number = 0;

    allies_projectiles: Array<Projectile> = [];
    enemies_projectiles: Array<Projectile> = [];

    particules?: any;

    constructor() {
        this.player = new Player();
    }

    reset() {
        this.player = new Player();
        this.enemies = [];
        this.allies_projectiles = [];
        this.enemies_projectiles = [];
        this.nextSpawnTimestamp = 0;
    }


    schedule(timestamp: number, inputs: PlayerInputs) {
        // check player status
        if (!this.player.alive) {
            // console.log('terminé');
            return;
        }

        this.player.checkInvincibility(timestamp);

        // move player
        this.player.move(inputs);

        // fire
        this.allies_projectiles.push(...this.player.fire(inputs, timestamp));

        // move projectiles
        for (const proj of this.allies_projectiles) {
            proj.move();

            // allies_proj collisions
            for (const enemy of this.enemies) {
                if (enemy.intersect(proj)) {
                    enemy.decreaseLife();
                    proj.die();
                }
            }
        }
        
        // purge enemies
        this.enemies = this.enemies.filter(e => e.alive);

        // move enemies
        for (const enemy of this.enemies) {
            enemy.move(inputs, this.player);

            // +  enemy body collision w/ player
            if (enemy.intersect(this.player)) {
                this.player.decreaseLife(timestamp);
            }
            // +  enemy fire
            this.enemies_projectiles.push(...enemy.fire(this.player.position, timestamp));
        }

        // enemy_proj move + collisions
        for (const proj of this.enemies_projectiles) {
            proj.move();

            if (proj.intersect(this.player)) {
                this.player.decreaseLife(timestamp);
                proj.die();
            }
        }

        // purge projectiles
        this.allies_projectiles = this.allies_projectiles.filter(proj => proj.isAlive(timestamp));
        this.enemies_projectiles = this.enemies_projectiles.filter(proj => proj.isAlive(timestamp));

        // spawn
        if (timestamp > this.nextSpawnTimestamp || this.enemies.length == 0) {
            this.enemies.push(this.spawnRandomEnemy());

            this.nextSpawnTimestamp = timestamp + MAX_SPAWN_TIME;
        }
        
    }
    
    spawnRandomEnemy() {
        let rdmPos = Vector.getRandomVector(GAME_LIMITS);
        while (rdmPos.distanceTo(this.player.position) < PLAYER_SIZE) {
            rdmPos = Vector.getRandomVector(GAME_LIMITS);
        }

        // TODO: better spawn randomization
        if (Math.random() < .5) {
            return new Square(rdmPos, Vector.getRandomVector().multByScalar(ENEMY_MAX_LINEAR_SPEED) );
        } else {
            return new Circle(rdmPos, Vector.getRandomVector().multByScalar(ENEMY_MAX_LINEAR_SPEED) );
        }
    }

}