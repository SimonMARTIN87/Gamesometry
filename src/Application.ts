import { GAME_LIMITS, SPECIAL_INPUTS_LATENCY } from "./com/Constants";
import Game from "./com/Game";
import Drawer from "./draw/Drawer";
import {getCurrentInput, PlayerInputs} from './com/PlayerInput';

export default class Application {
    pause: boolean = true;
    game: Game;
    drawer: Drawer;
    lastPauseTimeStamp: number = 0;
    lastResetTimeStamp: number = 0;

    tmpTimeStamp: number = 0;
    timeSpentInPause: number = 0;
    realGameTime: number = 0;

    displayedMessageForPause: string = "Waiting for gamePad...";

    constructor(canvasID: string) {
        const canvas = document.getElementById(canvasID) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error("Cant find canvas with id "+canvasID);
        } else {
            canvas.style.width = GAME_LIMITS.x+'px';
            canvas.style.height = GAME_LIMITS.y+'px';
            canvas.setAttribute('width', GAME_LIMITS.x.toString());
            canvas.setAttribute('height', GAME_LIMITS.y.toString());

            this.game = new Game();
            this.drawer = new Drawer(canvas);
        }

        // input gamepad events
        window.addEventListener("gamepadconnected", (e) => {            
            this.pause = false;
            this.displayedMessageForPause = "Pause !";
        });
    }

    checkSpecialInputs(inputs: PlayerInputs, timestamp: number = 0) {
        if (inputs.buttons.L1 && inputs.buttons.R1) {
            if (timestamp - this.lastResetTimeStamp > SPECIAL_INPUTS_LATENCY) {
                this.game.reset();
                this.lastResetTimeStamp = timestamp;
            }
        }

        if (inputs.buttons.Pause) {
            if (timestamp - this.lastPauseTimeStamp > SPECIAL_INPUTS_LATENCY) {
                this.pause = !this.pause;
                this.lastPauseTimeStamp = timestamp;
            }
        }
    }

    correctTimeStamps(timestamp:number = 0) {
        const diff = timestamp - this.tmpTimeStamp;
        this.tmpTimeStamp = timestamp;
        if (this.pause) {
            this.timeSpentInPause += diff;
        } else {
            this.realGameTime += diff;
        }
    }
    
    loop = (timestamp?: number) => {
        this.correctTimeStamps(timestamp);

        const inputs = getCurrentInput();

        this.checkSpecialInputs(inputs, timestamp);

        if (!this.pause) {
            this.game.schedule(this.realGameTime, inputs);
        }

        this.drawer.draw(this.game);

        if (this.pause) {
            this.drawer.displayMessage(this.displayedMessageForPause);
        }

        requestAnimationFrame(this.loop);
    }

}