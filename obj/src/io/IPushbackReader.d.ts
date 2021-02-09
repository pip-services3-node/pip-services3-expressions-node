/** @module io */
/**
 * Defines reader with ability to push back characters.
 * This reader is used by tokenizers to process input streams.
 */
export interface IPushbackReader {
    /**
     * Reads character from the top of the stream.
     * @returns A read character or <code>-1</code> if stream processed to the end.
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
