/** @module calculator */
import { ExpressionTokenType } from "./ExpressionTokenType";
import { Variant } from "../../variants/Variant";
/**
 * Defines an expression token holder.
 */
export declare class ExpressionToken {
    private _type;
    private _value;
    /**
     * Creates an instance of this token and initializes it with specified values.
     * @param type The type of this token.
     * @param value The value of this token.
     */
    constructor(type: ExpressionTokenType, value?: Variant);
    /**
     * The type of this token.
     */
    get type(): ExpressionTokenType;
    /**
     * The value of this token.
     */
    get value(): Variant;
}
