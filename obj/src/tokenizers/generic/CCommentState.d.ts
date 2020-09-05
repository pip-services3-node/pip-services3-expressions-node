import { Token } from '../Token';
import { ITokenizer } from '../ITokenizer';
import { IPushbackReader } from '../../io/IPushbackReader';
import { CppCommentState } from './CppCommentState';
/**
 * This state will either delegate to a comment-handling state, or return a token with just a slash in it.
 */
export declare class CCommentState extends CppCommentState {
    /**
     * Either delegate to a comment-handling state, or return a token with just a slash in it.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token;
}
