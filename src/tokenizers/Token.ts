/** @module tokenizers */

import { TokenType } from './TokenType';

/**
 * A token represents a logical chunk of a string. For example, a typical tokenizer would break
 * the string "1.23 &lt;= 12.3" into three tokens: the number 1.23, a less-than-or-equal symbol,
 * and the number 12.3. A token is a receptacle, and relies on a tokenizer to decide precisely how
 * to divide a string into tokens.
 */
export class Token {
    private _type: TokenType;
    private _value: string;

    /**
     * Constructs this token with type and value.
     * @param type The type of this token.
     * @param value The token string value.
     */
    public constructor(type: TokenType, value: string) {
        this._type = type;
        this._value = value;
    }

    /**
     * The token type.
     */
    public get type(): TokenType {
        return this._type;
    }

    /**
     * The token value.
     */
    public get value(): string {
        return this._value;
    }

    public equals(obj: any): boolean {
        if (obj instanceof Token) {
            let token = <Token>obj;
            return token._type == this._type && token._value == this._value;
        }
        return false;
    }

    // public getHashCode(): number {
    //     return super.getHashCode();
    // }
}