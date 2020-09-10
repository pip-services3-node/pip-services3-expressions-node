import { Token } from '../Token';
import { TokenType } from '../TokenType';
import { ITokenizer } from '../ITokenizer';
import { IPushbackReader } from '../../io/IPushbackReader';
import { CppCommentState } from './CppCommentState';
import { CharValidator } from '../utilities';

/**
 * This state will either delegate to a comment-handling state, or return a token with just a slash in it.
 */
export class CCommentState extends CppCommentState {
    /**
     * Either delegate to a comment-handling state, or return a token with just a slash in it.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    public nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token {
        let firstSymbol = reader.read();
        if (firstSymbol != this.SLASH) {
            reader.pushback(firstSymbol);
            throw new Error("Incorrect usage of CCommentState.");
        }

        let secondSymbol = reader.read();
        if (secondSymbol == this.STAR) {
            return new Token(TokenType.Comment, "/*" + this.getMultiLineComment(reader));
        } else {
            if (!CharValidator.isEof(secondSymbol)) {
                reader.pushback(secondSymbol);
            }
            if (!CharValidator.isEof(firstSymbol)) {
                reader.pushback(firstSymbol);
            }
            return tokenizer.symbolState.nextToken(reader, tokenizer);
        }
    }
}