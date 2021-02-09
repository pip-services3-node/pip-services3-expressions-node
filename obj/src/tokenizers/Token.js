"use strict";
/** @module tokenizers */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
/**
 * A token represents a logical chunk of a string. For example, a typical tokenizer would break
 * the string "1.23 &lt;= 12.3" into three tokens: the number 1.23, a less-than-or-equal symbol,
 * and the number 12.3. A token is a receptacle, and relies on a tokenizer to decide precisely how
 * to divide a string into tokens.
 */
class Token {
    /**
     * Constructs this token with type and value.
     * @param type The type of this token.
     * @param value The token string value.
     */
    constructor(type, value) {
        this._type = type;
        this._value = value;
    }
    /**
     * The token type.
     */
    get type() {
        return this._type;
    }
    /**
     * The token value.
     */
    get value() {
        return this._value;
    }
    equals(obj) {
        if (obj instanceof Token) {
            let token = obj;
            return token._type == this._type && token._value == this._value;
        }
        return false;
    }
}
exports.Token = Token;
//# sourceMappingURL=Token.js.map