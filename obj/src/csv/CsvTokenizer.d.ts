import { AbstractTokenizer } from "../tokenizers/AbstractTokenizer";
/**
 * Implements a tokenizer class for CSV files.
 */
export declare class CsvTokenizer extends AbstractTokenizer {
    private _fieldSeparators;
    private _quoteSymbols;
    private _endOfLine;
    /**
     * Separator for fields in CSV stream.
     */
    /**
    * Separator for fields in CSV stream.
    */
    fieldSeparators: number[];
    /**
     * Separator for rows in CSV stream.
     */
    /**
    * Separator for rows in CSV stream.
    */
    endOfLine: string;
    /**
     * Character to quote strings.
     */
    /**
    * Character to quote strings.
    */
    quoteSymbols: number[];
    /**
     * Assigns tokenizer states to correct characters.
     */
    private assignStates;
    /**
     * Constructs this object with default parameters.
     */
    constructor();
}
