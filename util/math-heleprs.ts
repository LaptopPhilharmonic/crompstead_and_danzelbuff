export function randomInt(from: number, to: number): number {
    const roundedFrom = Math.round(from);
    const roundedTo = Math.round(to);
    const diff = roundedTo - roundedFrom;
    return roundedFrom + Math.round(Math.random() * diff);
}