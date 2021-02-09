"use strict";
/** @module tokenizers */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericCommentState = void 0;
const Token_1 = require("../Token");
const TokenType_1 = require("../TokenType");
const CharValidator_1 = require("../utilities/CharValidator");
/**
 * A CommentState object returns a comment from a reader.
 */
class GenericCommentState {
    constructor() {
        this.LF = '\r'.charCodeAt(0);
        this.CR = '\n'.charCodeAt(0);
    }
    /**
     * Either delegate to a comment-handling state, or return a token with just a slash in it.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    nextToken(reader, tokenizer) {
        let tokenValue = "";
        let nextSymbol;
        for (nextSymbol = reader.read(); !CharValidator_1.CharValidator.isEof(nextSymbol)
            && nextSymbol != this.CR && nextSymbol != this.LF; nextSymbol = reader.read()) {
            tokenValue = tokenValue + String.fromCharCode(nextSymbol);
        }
        if (!CharValidator_1.CharValidator.isEof(nextSymbol)) {
            reader.pushback(nextSymbol);
        }
        return new Token_1.Token(TokenType_1.TokenType.Comment, tokenValue);
    }
}
exports.GenericCommentState = GenericCommentState;
//# sourceMappingURL=GenericCommentState.js.map