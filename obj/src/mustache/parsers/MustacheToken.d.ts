/** @module mustache */
import { MustacheTokenType } from "./MustacheTokenType";
/**
 * Defines a mustache token holder.
 */
export declare class MustacheToken {
    private _type;
    private _value;
    private _tokens;
    /**
     * Creates an instance of a mustache token.
     * @param type a token type.
     * @param value a token value.
     */
    constructor(type: MustacheTokenType, value: string);
    /**
     * Gets the token type.
     */
    get type(): MustacheTokenType;
    /**
     * Gets the token value or variable name.
     */
    get value(): string;
    /**
     * Gets a list of subtokens is this token a section.
     */
    get tokens(): MustacheToken[];
}
