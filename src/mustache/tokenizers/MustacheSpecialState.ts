/** @module mustache */

import { ITokenizerState } from "../../tokenizers/ITokenizerState";
import { IPushbackReader } from "../../io/IPushbackReader";
import { ITokenizer } from "../../tokenizers/ITokenizer";
import { Token } from "../../tokenizers/Token";
import { TokenType } from "../../tokenizers/TokenType";
import { CharValidator } from "../../tokenizers/utilities/CharValidator";

/**
 * Implements a quote string state object for Mustache templates.
 */
export class MustacheSpecialState implements ITokenizerState {
    private static readonly Bracket = "{".charCodeAt(0);

    /**
     * Gets the next token from the stream started from the character linked to this state.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    public nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token {
        let tokenValue = "";

        for (let nextSymbol = reader.read(); !CharValidator.isEof(nextSymbol); nextSymbol = reader.read()) {
            if (nextSymbol == MustacheSpecialState.Bracket) {
                if (reader.peek() == MustacheSpecialState.Bracket) {
                    reader.pushback(nextSymbol);
                    break;
                }
            }

            tokenValue = tokenValue + String.fromCharCode(nextSymbol);
        }

        return new Token(TokenType.Special, tokenValue);
    }

}