/** @module mustache */
import { ITokenizerState } from "../../tokenizers/ITokenizerState";
import { IPushbackReader } from "../../io/IPushbackReader";
import { ITokenizer } from "../../tokenizers/ITokenizer";
import { Token } from "../../tokenizers/Token";
/**
 * Implements a quote string state object for Mustache templates.
 */
export declare class MustacheSpecialState implements ITokenizerState {
    private static readonly Bracket;
    /**
     * Gets the next token from the stream started from the character linked to this state.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token;
}
