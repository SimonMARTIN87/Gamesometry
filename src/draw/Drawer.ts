import { ENEMY_HALF_SIZE, ENEMY_SIZE, GAME_LIMITS, LIFE_DISPLAY_SIZE, PLAYER_HALF_SIZE, PLAYER_LIFES, PLAYER_SIZE, PROJECTILE_SIZE } from "../com/Constants";
import Game from "../com/Game";
import { Vector } from "../com/Vector";

export default class Drawer {
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    displayMessage(message: string) {
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = 'black';
            ctx.font = '48px serif';
            ctx.fillText(message, 10, 50);
        }
    }

    draw(game: Game) {
        const ctx = this.canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, GAME_LIMITS.x, GAME_LIMITS.y);
            this.drawBG(ctx);
            this.drawPlayer(game, ctx);
            this.drawEnemies(game, ctx);
            this.drawAlliesProjectiles(game, ctx);
            this.drawEnemyProjectiles(game, ctx);
            this.drawLifes(game, ctx);
        }
    }

    drawBG(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(200,200,200,.8)';
        ctx.fillRect(0, 0, GAME_LIMITS.x, GAME_LIMITS.y);
    }

    drawPlayer(game: Game, ctx: CanvasRenderingContext2D) {
        const {position, speed} = game.player;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = game.player.is_invincible ? 'red' : 'orange';
        ctx.fillRect(
            position.x - PLAYER_HALF_SIZE,
            position.y - PLAYER_HALF_SIZE,
            PLAYER_SIZE,
            PLAYER_SIZE);

        // ctx.beginPath();
        // ctx.moveTo(position.x,position.y);
        // const tmp = new Vector(position);
        // tmp.add(speed);
        // ctx.lineTo(tmp.x, tmp.y);
        // ctx.stroke();
    }

    drawEnemies(game: Game, ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'green';
        for (const enemy of game.enemies) {
            ctx.strokeRect(
                enemy.position.x - ENEMY_HALF_SIZE,
                enemy.position.y - ENEMY_HALF_SIZE,
                ENEMY_SIZE,
                ENEMY_SIZE
            );
        }

    }

    drawAlliesProjectiles(game: Game, ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'brown';
        for (const proj of game.allies_projectiles) {
            ctx.beginPath();
            ctx.moveTo(proj.position.x, proj.position.y);
            const tmp = new Vector(proj.position);
            tmp.add(proj.speed);
            ctx.lineTo(tmp.x, tmp.y);
            ctx.stroke();
        }
    }

    drawEnemyProjectiles(game: Game, ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'red';
        for (const proj of game.enemies_projectiles) {
            ctx.beginPath();
            ctx.moveTo(proj.position.x, proj.position.y);
            const tmp = new Vector(proj.position);
            tmp.add(proj.speed);
            ctx.lineTo(tmp.x, tmp.y);
            ctx.stroke();
        }
    }

    drawLifes(game: Game, ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'red';
        for (let idxLives = 0; idxLives < PLAYER_LIFES; idxLives++) {
            ctx.beginPath();
            ctx.moveTo(idxLives*LIFE_DISPLAY_SIZE + 10, 10);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 8,9);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 5,4);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 6,3);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 9,3);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 10,5);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 11,3);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 14,3);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 15,4);
            ctx.lineTo(idxLives*LIFE_DISPLAY_SIZE + 12,9);
            ctx.closePath();
            if (game.player.lives > idxLives) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
        }
    }

}