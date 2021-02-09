/** @module tokenizers */
import { Token } from '../Token';
import { ITokenizer } from '../ITokenizer';
import { IPushbackReader } from '../../io/IPushbackReader';
import { GenericCommentState } from './GenericCommentState';
/**
 * This state will either delegate to a comment-handling state, or return a token with just a slash in it.
 */
export declare class CppCommentState extends GenericCommentState {
    protected readonly STAR: number;
    protected readonly SLASH: number;
    /**
     * Ignore everything up to a closing star and slash, and then return the tokenizer's next token.
     * @param IPushbackReader
     * @param reader
     */
    protected getMultiLineComment(reader: IPushbackReader): string;
    /**
     * Ignore everything up to an end-of-line and return the tokenizer's next token.
     * @param reader
     */
    protected getSingleLineComment(reader: IPushbackReader): string;
    /**
     * Either delegate to a comment-handling state, or return a token with just a slash in it.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token;
}
