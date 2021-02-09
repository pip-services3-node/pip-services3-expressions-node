"use strict";
/** @module tokenizers */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CCommentState = void 0;
const Token_1 = require("../Token");
const TokenType_1 = require("../TokenType");
const CppCommentState_1 = require("./CppCommentState");
const utilities_1 = require("../utilities");
/**
 * This state will either delegate to a comment-handling state, or return a token with just a slash in it.
 */
class CCommentState extends CppCommentState_1.CppCommentState {
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
            throw new Error("Incorrect usage of CCommentState.");
        }
        let secondSymbol = reader.read();
        if (secondSymbol == this.STAR) {
            return new Token_1.Token(TokenType_1.TokenType.Comment, "/*" + this.getMultiLineComment(reader));
        }
        else {
            if (!utilities_1.CharValidator.isEof(secondSymbol)) {
                reader.pushback(secondSymbol);
            }
            if (!utilities_1.CharValidator.isEof(firstSymbol)) {
                reader.pushback(firstSymbol);
            }
            return tokenizer.symbolState.nextToken(reader, tokenizer);
        }
    }
}
exports.CCommentState = CCommentState;
//# sourceMappingURL=CCommentState.js.map