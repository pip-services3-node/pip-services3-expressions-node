/** @module mustache */

import { MustacheTokenType } from "./MustacheTokenType";

/**
 * Defines a mustache token holder.
 */
export class MustacheToken {
    private _type: MustacheTokenType;
    private _value: string;
    private _tokens: MustacheToken[] = [];

    /**
     * Creates an instance of a mustache token.
     * @param type a token type.
     * @param value a token value.
     */
    public constructor(type: MustacheTokenType, value: string) {
        this._type = type;
        this._value = value;
    }

    /**
     * Gets the token type.
     */
    public get type(): MustacheTokenType {
        return this._type;
    }

    /**
     * Gets the token value or variable name.
     */
    public get value(): string {
        return this._value;
    }

    /**
     * Gets a list of subtokens is this token a section.
     */
    public get tokens(): MustacheToken[] {
        return this._tokens;
    }
}