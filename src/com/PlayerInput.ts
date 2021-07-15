import { Vector } from "./Vector";

// TODO : check axes and buttons order in all browser. Use userAgent for better detection.

export let usedGamePad: number;

export interface PlayerInputs {
    positionInput: Vector;
    fireInput: Vector;
    buttons: {
        'L1': boolean,
        'R1': boolean,
        'Pause': boolean
    }
};

function getLastUsedGamePad(): Gamepad|null {
    const pads = Array.from(navigator.getGamepads());
    pads?.sort( (a,b) => {
        return (a?.timestamp??0) < (b?.timestamp??0) ? 1 : -1;
    });
    
    return pads ? pads[0] : null;
}

export function gamePadRumble(force: number, duration: number) {
    const gamePad = getLastUsedGamePad();
    if (gamePad) {
        gamePad.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration,
            weakMagnitude: force,
            strongMagnitude: force
        });
    }
}

export function getCurrentInput(): PlayerInputs {
    const gamePad = getLastUsedGamePad();

    // L1 = 4
    // R1 = 5
    // options/start = 9
    const buttons = {
        'L1': gamePad?.buttons[4].pressed ?? false,
        'R1': gamePad?.buttons[5].pressed ?? false,
        'Pause': gamePad?.buttons[9].pressed ?? false
    };

    const positionInput = new Vector({
        x: gamePad?.axes[0] ?? 0,
        y: gamePad?.axes[1] ?? 0
    });
    const fireInput = new Vector({
        x: gamePad?.axes[2] ?? 0,
        y: gamePad?.axes[3] ?? 0
    });
    return {
        positionInput,
        fireInput,
        buttons
    };
};

