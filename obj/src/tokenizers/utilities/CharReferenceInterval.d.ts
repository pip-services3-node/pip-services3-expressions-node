/**
 * Represents a character interval that keeps a reference.
 * This class is internal and used by CharacterReferenceMap.
 */
export declare class CharReferenceInterval<T> {
    private _start;
    private _end;
    private _reference;
    constructor(start: number, end: number, reference: T);
    readonly start: number;
    readonly end: number;
    readonly reference: T;
    inRange(symbol: number): boolean;
}
