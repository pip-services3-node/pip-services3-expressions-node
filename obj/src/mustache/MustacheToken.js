"use strict";
/** @module mustache */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustacheToken = void 0;
/**
 * Defines a mustache token holder.
 */
class MustacheToken {
    /**
     * Creates an instance of a mustache token.
     * @param type a token type.
     * @param value a token value.
     */
    constructor(type, value) {
        this._tokens = [];
        this._type = type;
        this._value = value;
    }
    /**
     * Gets the token type.
     */
    get type() {
        return this._type;
    }
    /**
     * Gets the token value or variable name.
     */
    get value() {
        return this._value;
    }
    /**
     * Gets a list of subtokens is this token a section.
     */
    get tokens() {
        return this._tokens;
    }
}
exports.MustacheToken = MustacheToken;
//# sourceMappingURL=MustacheToken.js.map