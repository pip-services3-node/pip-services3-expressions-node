import { IPushbackReader } from './IPushbackReader';

/**
 * Wraps string to provide unlimited pushback that allows tokenizers
 * to look ahead through stream to perform lexical analysis.
 */
export class StringPushbackReader implements IPushbackReader {
    public static readonly Eof: number = -1;

    private _content: string;
    private _position: number;
    private _pushbackCharsCount: number = 0;
    private _pushbackSingleChar: number;
    private _pushbackChars: string = '';

    /**
     * Creates an instance of this class.
     * @param content A text content to be read.
     */
    public constructor(content: string) {
        if (content == null)
            throw new Error("Content cannot be null");

        this._content = content;
        this._position = 0;
    }

    /**
     * Reads character from the top of the stream.
     * A read character or <code>-1</code> if stream processed to the end.
     */
    public read(): number {
        if (this._pushbackCharsCount == 1) {
            this._pushbackCharsCount--;
            return this._pushbackSingleChar;
        } else if (this._pushbackCharsCount > 1) {
            let result = this._pushbackChars.charCodeAt(0);
            this._pushbackChars = this._pushbackChars.substring(1);
            this._pushbackCharsCount--;

            if (this._pushbackCharsCount == 1) {
                this._pushbackSingleChar = this._pushbackChars.charCodeAt(0);
                this._pushbackChars = '';
            }

            return result;
        } else {
            if (this._position < this._content.length) {
                this._position++;
                return this._content.charCodeAt(this._position - 1);
            }

            return StringPushbackReader.Eof;
        }
    }

    /**
     * Returns the character from the top of the stream without moving the stream pointer.
     * @returns A character from the top of the stream or <code>-1</code> if stream is empty.
     */
    public peek(): number {
        if (this._pushbackCharsCount == 1) {
            return this._pushbackSingleChar;
        } else if (this._pushbackCharsCount > 1) {
            return this._pushbackChars.charCodeAt(0);
        } else {
            return this._position < this._content.length
                ? this._content.charCodeAt(this._position)
                : StringPushbackReader.Eof;
        }
    }

    /**
     * Puts the specified character to the top of the stream.
     * @param value A character to be pushed back.
     */
    public pushback(value: number): void {
        // Skip EOF
        if (value == StringPushbackReader.Eof) {
            return;
        }

        if (this._pushbackCharsCount == 0) {
            this._pushbackSingleChar = value;
        } else if (this._pushbackCharsCount == 1) {
            this._pushbackChars = String.fromCharCode(value)
                + String.fromCharCode(this._pushbackSingleChar);
        } else {
            this._pushbackChars = String.fromCharCode(value) + this._pushbackChars;
        }
        this._pushbackCharsCount++;
    }

    /**
     * Pushes the specified string to the top of the stream.
     * @param value A string to be pushed back.
     */
    public pushbackString(value: string): void {
        if (value != '') {
            if (this._pushbackCharsCount == 1) {
                this._pushbackChars = String.fromCharCode(this._pushbackSingleChar);
            }
            this._pushbackChars = value + this._pushbackChars;
            this._pushbackCharsCount += value.length;
        }
    }

}