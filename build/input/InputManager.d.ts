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
/** A snapshot of data for a key for one cycle of the engine */
export declare class KeyData {
    /** Did a keydown register this cycle for this key? */
    justPressed: boolean;
    /** Is this key currently held? (this will return true at the same time as justPressed) */
    held: boolean;
    /** Did a keyup register this cycle for this key? */
    justReleased: boolean;
    constructor(held: boolean, justPressed: boolean, justReleased: boolean);
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
export declare class InputManager {
    private previousKeys;
    private config;
    keys: Keys;
    constructor(config?: InputConfig);
    listenTo(listenTarget: Window | HTMLElement): void;
    private handleKey;
    cycleKeyData(): InputData;
    private getKeyData;
}
