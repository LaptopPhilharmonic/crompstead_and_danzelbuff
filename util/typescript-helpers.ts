export interface IndexableClass {
    [key: string]: any;
}

/** For when things may or may not exist, without falsey rubbish */
export type Maybe<T> = T | null | undefined;

/** For when things had better exist or you'll get mad */
export function definitely<T>(maybe: Maybe<T>): T {
    if (maybe === null || maybe === undefined) {
        throw new Error('Expected the supplied argument to definitely be not null/undefined');
    }
    return maybe;
}

/** Takes an array of <Maybe>s, only returns the ones that defintely aren't null */
export function filterDefinitely<T>(maybes: Maybe<T>[]): T[] {
    return maybes.filter((m) => m !== undefined && m !== null) as T[];
}