/** @module csv */

import { IPushbackReader } from "../io/IPushbackReader";
import { ITokenizer } from "../tokenizers/ITokenizer";
import { Token } from "../tokenizers/Token";
import { TokenType } from "../tokenizers/TokenType";
import { GenericSymbolState } from "../tokenizers/generic/GenericSymbolState";
import { CsvConstant } from "./CsvConstant";

/**
 * Implements a symbol state to tokenize delimiters in CSV streams.
 */
export class CsvSymbolState extends GenericSymbolState {
    /**
     * Constructs this object with specified parameters.
     */
    public constructor() {
        super();
        this.add("\n", TokenType.Eol);
        this.add("\r", TokenType.Eol);
        this.add("\r\n", TokenType.Eol);
        this.add("\n\r", TokenType.Eol);
    }

    public nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token {
        // Optimization...
        let nextSymbol = reader.read();
        if (nextSymbol != CsvConstant.LF && nextSymbol != CsvConstant.CR) {
            return new Token(TokenType.Symbol, String.fromCharCode(nextSymbol));
        } else {
            reader.pushback(nextSymbol);
            return super.nextToken(reader, tokenizer);
        }
    }

}