import { Token } from './Token';
import { ITokenizer } from './ITokenizer';
import { IPushbackReader } from '../io/IPushbackReader';
/**
  * A tokenizerState returns a token, given a reader, an initial character read from the reader,
  * and a tokenizer that is conducting an overall tokenization of the reader. The tokenizer will
  * typically have a character state table that decides which state to use, depending on an initial
  * character. If a single character is insufficient, a state such as <code>SlashState</code>
  * will read a second character, and may delegate to another state, such as <code>SlashStarState</code>.
  * This prospect of delegation is the reason that the <code>nextToken()</code>
  * method has a tokenizer argument.
  */
export interface ITokenizerState {
    /**
     * Gets the next token from the stream started from the character linked to this state.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token;
}
