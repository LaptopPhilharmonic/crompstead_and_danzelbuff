
/** For each field, provide the keycode from Event.key */
export interface InputConfig {
    /** Default 'ArrowUp' */
    up: string;
    /** Default 'ArrowDown' */
    down: string;
    /** Default 'ArrowLeft' */
    left: string;
    /** Default 'ArrowRight' */    
    right: string;
    /** Default ' ' - i.e. Space */    
    interact: string;
}

const defaultConfig: InputConfig = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    interact: ' ',
}

/** A snapshot of data for a key for one cycle of the engine */
export class KeyData {
    /** Did a keydown register this cycle for this key? */
    justPressed: boolean;
    /** Is this key currently held? (this will return true at the same time as justPressed) */
    held: boolean;
    /** Did a keyup register this cycle for this key? */
    justReleased: boolean;

    constructor(held: boolean, justPressed: boolean, justReleased: boolean) {
        this.justPressed = justPressed;
        this.held = held;
        this.justReleased = justReleased;
    }
}

export interface InputData {
    up: KeyData;
    down: KeyData;
    left: KeyData;
    right: KeyData;
    interact: KeyData;
}

export interface Keys {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    interact: boolean;
}

function blankKeys(): Keys {
    return {
        up: false,
        down: false,
        left: false,
        right: false,
        interact: false,
    }
}

function cloneKeys(keys: Keys) {
    return {
        up: keys.up,
        down: keys.down,
        left: keys.left,
        right: keys.right,
        interact: keys.interact,
    }
}

export class InputManager {
    private previousKeys: Keys;
    private config: InputConfig;
    keys: Keys;

    constructor(config?: InputConfig) {
        this.config = config ?? defaultConfig;
        this.previousKeys = blankKeys();
        this.keys = blankKeys();
    }

    listenTo(listenTarget: Window | HTMLElement) {
        listenTarget.addEventListener('keydown', (event) => {
            this.handleKey((event as KeyboardEvent).key, true);
        });
        listenTarget.addEventListener('keyup', (event) => {
            this.handleKey((event as KeyboardEvent).key, false);
        });        
    }

    private handleKey(keyName: string, pressedDown: boolean) {
        switch(keyName) {
            case this.config.up:
                this.keys.up = pressedDown;
                break;
            case this.config.down:
                this.keys.down = pressedDown;
                break;
            case this.config.left:
                this.keys.left = pressedDown;
                break;
            case this.config.right:
                this.keys.right = pressedDown;                        
                break;
            case this.config.interact:
                this.keys.interact = pressedDown;
                break;    
        }        
    }

    cycleKeyData(): InputData {
        const keyData = {
            up: this.getKeyData(this.keys.up, this.previousKeys.up),
            down: this.getKeyData(this.keys.down, this.previousKeys.down),
            left: this.getKeyData(this.keys.left, this.previousKeys.left),
            right: this.getKeyData(this.keys.right, this.previousKeys.right),
            interact: this.getKeyData(this.keys.interact, this.previousKeys.interact),                   
        }
        this.previousKeys = Object.assign({}, this.keys);
        return keyData;
    }

    private getKeyData(key: boolean, previousKey: boolean): KeyData {
        return new KeyData(key, key && !previousKey, !key && previousKey);
    }
}