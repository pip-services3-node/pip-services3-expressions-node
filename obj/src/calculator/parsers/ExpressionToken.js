"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines an expression token holder.
 */
class ExpressionToken {
    /**
     * Creates an instance of this token and initializes it with specified values.
     * @param type The type of this token.
     * @param value The value of this token.
     */
    constructor(type, value) {
        this._type = type;
        this._value = value;
    }
    /**
     * The type of this token.
     */
    get type() {
        return this._type;
    }
    /**
     * The value of this token.
     */
    get value() {
        return this._value;
    }
}
exports.ExpressionToken = ExpressionToken;
//# sourceMappingURL=ExpressionToken.js.map