import { IPushbackReader } from './IPushbackReader';
/**
 * Wraps string to provide unlimited pushback that allows tokenizers
 * to look ahead through stream to perform lexical analysis.
 */
export declare class StringPushbackReader implements IPushbackReader {
    static readonly Eof: number;
    private _content;
    private _position;
    private _pushbackCharsCount;
    private _pushbackSingleChar;
    private _pushbackChars;
    /**
     * Creates an instance of this class.
     * @param content A text content to be read.
     */
    constructor(content: string);
    /**
     * Reads character from the top of the stream.
     * A read character or <code>-1</code> if stream processed to the end.
     */
    read(): number;
    /**
     * Returns the character from the top of the stream without moving the stream pointer.
     * @returns A character from the top of the stream or <code>-1</code> if stream is empty.
     */
    peek(): number;
    /**
     * Puts the specified character to the top of the stream.
     * @param value A character to be pushed back.
     */
    pushback(value: number): void;
    /**
     * Pushes the specified string to the top of the stream.
     * @param value A string to be pushed back.
     */
    pushbackString(value: string): void;
}
