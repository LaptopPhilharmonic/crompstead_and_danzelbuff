export interface IndexableClass {
    [key: string]: any;
}
/** For when things may or may not exist, without falsey rubbish */
export declare type Maybe<T> = T | null | undefined;
/** For when things had better exist or you'll get mad */
export declare function definitely<T>(maybe: Maybe<T>): T;
/** Takes an array of <Maybe>s, only returns the ones that defintely aren't null */
export declare function filterDefinitely<T>(maybes: Maybe<T>[]): T[];
