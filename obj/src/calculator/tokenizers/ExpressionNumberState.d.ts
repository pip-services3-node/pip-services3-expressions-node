import { GenericNumberState } from "../../tokenizers/generic/GenericNumberState";
import { IPushbackReader } from "../../io/IPushbackReader";
import { ITokenizer } from "../../tokenizers/ITokenizer";
import { Token } from "../../tokenizers/Token";
/**
 * Implements an Expression-specific number state object.
 */
export declare class ExpressionNumberState extends GenericNumberState {
    protected readonly PLUS: number;
    protected readonly EXP1: number;
    protected readonly EXP2: number;
    /**
      * Gets the next token from the stream started from the character linked to this state.
      * @param reader A textual string to be tokenized.
      * @param tokenizer A tokenizer class that controls the process.
      * @returns The next token from the top of the stream.
      */
    nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token;
}
