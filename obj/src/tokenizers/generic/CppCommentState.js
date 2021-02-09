"use strict";
/** @module tokenizers */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CppCommentState = void 0;
const Token_1 = require("../Token");
const TokenType_1 = require("../TokenType");
const CharValidator_1 = require("../utilities/CharValidator");
const GenericCommentState_1 = require("./GenericCommentState");
/**
 * This state will either delegate to a comment-handling state, or return a token with just a slash in it.
 */
class CppCommentState extends GenericCommentState_1.GenericCommentState {
    constructor() {
        super(...arguments);
        this.STAR = '*'.charCodeAt(0);
        this.SLASH = '/'.charCodeAt(0);
    }
    /**
     * Ignore everything up to a closing star and slash, and then return the tokenizer's next token.
     * @param IPushbackReader
     * @param reader
     */
    getMultiLineComment(reader) {
        let result = "";
        let lastSymbol = 0;
        for (let nextSymbol = reader.read(); !CharValidator_1.CharValidator.isEof(nextSymbol); nextSymbol = reader.read()) {
            result = result + String.fromCharCode(nextSymbol);
            if (lastSymbol == this.STAR && nextSymbol == this.SLASH) {
                break;
            }
            lastSymbol = nextSymbol;
        }
        return result;
    }
    /**
     * Ignore everything up to an end-of-line and return the tokenizer's next token.
     * @param reader
     */
    getSingleLineComment(reader) {
        let result = "";
        let nextSymbol;
        for (nextSymbol = reader.read(); !CharValidator_1.CharValidator.isEof(nextSymbol) && !CharValidator_1.CharValidator.isEol(nextSymbol); nextSymbol = reader.read()) {
            result = result + String.fromCharCode(nextSymbol);
        }
        if (CharValidator_1.CharValidator.isEol(nextSymbol)) {
            reader.pushback(nextSymbol);
        }
        return result;
    }
    /**
     * Either delegate to a comment-handling state, or return a token with just a slash in it.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    nextToken(reader, tokenizer) {
        let firstSymbol = reader.read();
        if (firstSymbol != this.SLASH) {
            reader.pushback(firstSymbol);
            throw new Error("Incorrect usage of CppCommentState.");
        }
        let secondSymbol = reader.read();
        if (secondSymbol == this.STAR) {
            return new Token_1.Token(TokenType_1.TokenType.Comment, "/*" + this.getMultiLineComment(reader));
        }
        else if (secondSymbol == this.SLASH) {
            return new Token_1.Token(TokenType_1.TokenType.Comment, "//" + this.getSingleLineComment(reader));
        }
        else {
            if (!CharValidator_1.CharValidator.isEof(secondSymbol)) {
                reader.pushback(secondSymbol);
            }
            if (!CharValidator_1.CharValidator.isEof(firstSymbol)) {
                reader.pushback(firstSymbol);
            }
            return tokenizer.symbolState.nextToken(reader, tokenizer);
        }
    }
}
exports.CppCommentState = CppCommentState;
//# sourceMappingURL=CppCommentState.js.map