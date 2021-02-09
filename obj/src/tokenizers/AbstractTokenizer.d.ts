/** @module tokenizers */
import { ITokenizer } from './ITokenizer';
import { ITokenizerState } from './ITokenizerState';
import { ICommentState } from './ICommentState';
import { INumberState } from './INumberState';
import { IQuoteState } from './IQuoteState';
import { ISymbolState } from './ISymbolState';
import { IWhitespaceState } from './IWhitespaceState';
import { IWordState } from './IWordState';
import { Token } from './Token';
import { TokenType } from './TokenType';
import { IPushbackReader } from '../io/IPushbackReader';
/**
 * Implements an abstract tokenizer class.
 */
export declare abstract class AbstractTokenizer implements ITokenizer {
    private _map;
    skipUnknown: boolean;
    skipWhitespaces: boolean;
    skipComments: boolean;
    skipEof: boolean;
    mergeWhitespaces: boolean;
    unifyNumbers: boolean;
    decodeStrings: boolean;
    commentState: ICommentState;
    numberState: INumberState;
    quoteState: IQuoteState;
    symbolState: ISymbolState;
    whitespaceState: IWhitespaceState;
    wordState: IWordState;
    protected _reader: IPushbackReader;
    protected _nextToken: Token;
    protected _lastTokenType: TokenType;
    protected constructor();
    getCharacterState(symbol: number): ITokenizerState;
    setCharacterState(fromSymbol: number, toSymbol: number, state: ITokenizerState): void;
    clearCharacterStates(): void;
    get reader(): IPushbackReader;
    set reader(value: IPushbackReader);
    hasNextToken(): boolean;
    nextToken(): Token;
    protected readNextToken(): Token;
    tokenizeStream(reader: IPushbackReader): Token[];
    tokenizeBuffer(buffer: string): Token[];
    tokenizeStreamToStrings(reader: IPushbackReader): string[];
    tokenizeBufferToStrings(buffer: string): string[];
}
