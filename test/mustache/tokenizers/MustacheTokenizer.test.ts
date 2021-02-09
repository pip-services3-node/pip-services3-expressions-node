const assert = require('chai').assert;

import { MustacheTokenizer } from '../../../src/mustache/tokenizers/MustacheTokenizer';
import { TokenType } from '../../../src/tokenizers/TokenType';
import { Token } from '../../../src/tokenizers/Token';
import { TokenizerFixture } from '../../tokenizers/TokenizerFixture';

suite('MustacheTokenizer', ()=> {
    test('Template1', () => {
        let tokenString = "Hello, {{ Name }}!";
        let expectedTokens: Token[] = [
            new Token(TokenType.Special, "Hello, "),
            new Token(TokenType.Symbol, "{{"),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Word, "Name"),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Symbol, "}}"),
            new Token(TokenType.Special, "!"),
        ];

        let tokenizer = new MustacheTokenizer();
        tokenizer.skipEof = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });    

    test('Template2', () => {
        let tokenString = "Hello, {{{ Name }}}!";
        let expectedTokens: Token[] = [
            new Token(TokenType.Special, "Hello, "),
            new Token(TokenType.Symbol, "{{{"),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Word, "Name"),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Symbol, "}}}"),
            new Token(TokenType.Special, "!"),
        ];

        let tokenizer = new MustacheTokenizer();
        tokenizer.skipEof = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });    

    test('Template3', () => {
        let tokenString = "{{ Name }}}";
        let expectedTokens: Token[] = [
            new Token(TokenType.Symbol, "{{"),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Word, "Name"),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Symbol, "}}}")
        ];

        let tokenizer = new MustacheTokenizer();
        tokenizer.skipEof = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });    

    test('Template4', () => {
        let tokenString = "Hello, World!";
        let expectedTokens: Token[] = [
            new Token(TokenType.Special, "Hello, World!")
        ];

        let tokenizer = new MustacheTokenizer();
        tokenizer.skipEof = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });    
});