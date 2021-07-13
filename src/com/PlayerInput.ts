import { Vector } from "./Vector";

export interface PlayerInputs {
    positionInput: Vector;
    fireInput: Vector;
    buttons: {
        'L1': boolean,
        'R1': boolean,
        'Pause': boolean
    }
};

export function gamePadRumble(force: number, duration: number) {
    const gamePad = navigator.getGamepads()[0];
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
    const gamePad = navigator.getGamepads()[0];

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

