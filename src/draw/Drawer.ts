import { ENEMY_HALF_SIZE, ENEMY_SIZE, GAME_LIMITS, PLAYER_HALF_SIZE, PLAYER_SIZE, PROJECTILE_SIZE } from "../com/Constants";
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
        ctx.strokeStyle = 'purple';
        for (const proj of game.enemies_projectiles) {
            ctx.beginPath();
            ctx.moveTo(proj.position.x, proj.position.y);
            const tmp = new Vector(proj.position);
            tmp.add(proj.speed);
            ctx.lineTo(tmp.x, tmp.y);
            ctx.stroke();
        }
    }

}