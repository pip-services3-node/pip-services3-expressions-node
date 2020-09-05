import { IPushbackReader } from "../io/IPushbackReader";
import { ITokenizer } from "../tokenizers/ITokenizer";
import { Token } from "../tokenizers/Token";
import { GenericSymbolState } from "../tokenizers/generic/GenericSymbolState";
/**
 * Implements a symbol state to tokenize delimiters in CSV streams.
 */
export declare class CsvSymbolState extends GenericSymbolState {
    /**
     * Constructs this object with specified parameters.
     */
    constructor();
    nextToken(reader: IPushbackReader, tokenizer: ITokenizer): Token;
}
