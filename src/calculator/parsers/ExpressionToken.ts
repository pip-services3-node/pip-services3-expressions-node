import { ExpressionTokenType } from "./ExpressionTokenType";
import { Variant } from "../../variants/Variant";

/**
 * Defines an expression token holder.
 */
export class ExpressionToken {
    private _type: ExpressionTokenType;
    private _value: Variant;

    /**
     * Creates an instance of this token and initializes it with specified values.
     * @param type The type of this token.
     * @param value The value of this token.
     */
    public constructor(type: ExpressionTokenType, value?: Variant) {
        this._type = type;
        this._value = value;
    }

    /**
     * The type of this token.
     */
    public get type(): ExpressionTokenType {
        return this._type;
    }

    /**
     * The value of this token.
     */
    public get value(): Variant {
        return this._value;
    }
}