import { IQuoteState } from '../IQuoteState';
import { Token } from '../Token';
import { TokenType } from '../TokenType';
import { ITokenizer } from '../ITokenizer';
import { IPushbackReader } from '../../io/IPushbackReader';
import { CharValidator } from '../utilities/CharValidator';

/**
  * A quoteState returns a quoted string token from a reader. This state will collect characters
  * until it sees a match to the character that the tokenizer used to switch to this state.
  * For example, if a tokenizer uses a double-quote character to enter this state,
  * then <code>nextToken()</code> will search for another double-quote until it finds one
  * or finds the end of the reader.
  */
export class GenericQuoteState implements IQuoteState {
    /**
     * Return a quoted string token from a reader. This method will collect
     * characters until it sees a match to the character that the tokenizer used
     * to switch to this state.
     * @param reader A textual string to be tokenized.
     * @param tokenizer A tokenizer class that controls the process.
     * @returns The next token from the top of the stream.
     */
    public nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token {
        let firstSymbol = reader.read();
        let tokenValue = String.fromCharCode(firstSymbol);

        for (let nextSymbol = reader.read(); !CharValidator.isEof(nextSymbol); nextSymbol = reader.read())
        {
            tokenValue = tokenValue + String.fromCharCode(nextSymbol);
            if (nextSymbol == firstSymbol) {
                break;
            }
        }

        return new Token(TokenType.Quoted, tokenValue);
    }

    /**
     * Encodes a string value.
     * @param value A string value to be encoded.
     * @param quoteSymbol A string quote character.
     * @returns An encoded string.
     */
    public encodeString(value: string, quoteSymbol: number): string {
        if (value == null) return null;
        let result = String.fromCharCode(quoteSymbol) + value + String.fromCharCode(quoteSymbol);
        return result;
    }

    /**
     * Decodes a string value.
     * @param value A string value to be decoded.
     * @param quoteSymbol A string quote character.
     * @returns An decoded string.
     */
    public decodeString(value: string, quoteSymbol: number): string {
        if (value == null) return null;

        if (value.length >= 2 && value.charCodeAt(0) == quoteSymbol
            && value.charCodeAt(value.length - 1) == quoteSymbol) {
            return value.substring(1, value.length - 1);
        }
        return value;
    }
}