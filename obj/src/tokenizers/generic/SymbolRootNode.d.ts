/** @module tokenizers */
import { SymbolNode } from './SymbolNode';
import { Token } from '../Token';
import { TokenType } from '../TokenType';
import { IPushbackReader } from '../../io/IPushbackReader';
/**
 * This class is a special case of a <code>SymbolNode</code>. A <code>SymbolRootNode</code>
 * object has no symbol of its own, but has children that represent all possible symbols.
 */
export declare class SymbolRootNode extends SymbolNode {
    /**
     * Creates and initializes a root node.
     */
    constructor();
    /**
     * Add the given string as a symbol.
     * @param value The character sequence to add.
     * @param tokenType
     */
    add(value: string, tokenType: TokenType): void;
    /**
     * Return a symbol string from a reader.
     * @param reader A reader to read from
     * @returns A symbol string from a reader
     */
    nextToken(reader: IPushbackReader): Token;
}
