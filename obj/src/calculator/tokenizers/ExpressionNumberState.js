"use strict";
/** @module calculator */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionNumberState = void 0;
const GenericNumberState_1 = require("../../tokenizers/generic/GenericNumberState");
const Token_1 = require("../../tokenizers/Token");
const TokenType_1 = require("../../tokenizers/TokenType");
const CharValidator_1 = require("../../tokenizers/utilities/CharValidator");
/**
 * Implements an Expression-specific number state object.
 */
class ExpressionNumberState extends GenericNumberState_1.GenericNumberState {
    constructor() {
        super(...arguments);
        this.PLUS = '+'.charCodeAt(0);
        this.EXP1 = 'e'.charCodeAt(0);
        this.EXP2 = 'E'.charCodeAt(0);
    }
    /**
      * Gets the next token from the stream started from the character linked to this state.
      * @param reader A textual string to be tokenized.
      * @param tokenizer A tokenizer class that controls the process.
      * @returns The next token from the top of the stream.
      */
    nextToken(reader, tokenizer) {
        // Process leading minus.
        if (reader.peek() == this.MINUS) {
            return tokenizer.symbolState.nextToken(reader, tokenizer);
        }
        // Process numbers using base class algorithm.
        let token = super.nextToken(reader, tokenizer);
        // Exit if number was not detected.
        if (token.type != TokenType_1.TokenType.Integer && token.type != TokenType_1.TokenType.Float) {
            return token;
        }
        // Exit if number is not in scientific format.
        let nextChar = reader.peek();
        if (nextChar != this.EXP1 && nextChar != this.EXP2) {
            return token;
        }
        let tokenValue = "";
        tokenValue = tokenValue + String.fromCharCode(reader.read());
        // Process '-' or '+' in mantissa
        nextChar = reader.peek();
        if (nextChar == this.MINUS || nextChar == this.PLUS) {
            tokenValue = tokenValue + String.fromCharCode(reader.read());
            nextChar = reader.peek();
        }
        // Exit if mantissa has no digits.
        if (!CharValidator_1.CharValidator.isDigit(nextChar)) {
            reader.pushbackString(tokenValue);
            return token;
        }
        // Process matissa digits
        for (; CharValidator_1.CharValidator.isDigit(nextChar); nextChar = reader.peek()) {
            tokenValue = tokenValue + String.fromCharCode(reader.read());
        }
        return new Token_1.Token(TokenType_1.TokenType.Float, token.value + tokenValue);
    }
}
exports.ExpressionNumberState = ExpressionNumberState;
//# sourceMappingURL=ExpressionNumberState.js.map