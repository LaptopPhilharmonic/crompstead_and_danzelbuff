/**
 * Nice functions to help detect and set the size of your chunky pixels relative to the
 * player's current resolution and OS scaling
 */
export declare type ScreenInfo = {
    /** Width of the game window in pixels */
    width: number;
    /** Height of the game window in pixels */
    height: number;
    /** The scaling factor applied to things by the player's operating system */
    devicePixelRatio: number;
};
/** Get basic info about the game window */
export declare function getScreenInfo(): ScreenInfo;
