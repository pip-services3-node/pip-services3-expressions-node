const assert = require('chai').assert;

import { GenericTokenizer } from '../../../src/tokenizers/generic/GenericTokenizer';
import { TokenType } from '../../../src/tokenizers/TokenType';
import { Token } from '../../../src/tokenizers/Token';
import { TokenizerFixture } from '../TokenizerFixture';

suite('GenericTokenizer', ()=> {
    test('Expression', () => {
        let tokenString = "A+B/123 - \t 'xyz'\n <>-10.11# This is a comment";
        let expectedTokens: Token[] = [
            new Token(TokenType.Word, "A"),
            new Token(TokenType.Symbol, "+"),
            new Token(TokenType.Word, "B"),
            new Token(TokenType.Symbol, "/"),
            new Token(TokenType.Integer, "123"),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Symbol, "-"), 
            new Token(TokenType.Whitespace, " \t "),
            new Token(TokenType.Quoted, "'xyz'"),
            new Token(TokenType.Whitespace, "\n "),
            new Token(TokenType.Symbol, "<>"),
            new Token(TokenType.Float, "-10.11"),
            new Token(TokenType.Comment, "# This is a comment"),
            new Token(TokenType.Eof, null)
        ];

        let tokenizer = new GenericTokenizer();
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });    

    test('WordToken', () => {
        let tokenString = "A'xyz'Ebf_2\n2x_2";
        let expectedTokens: Token[] = [
            new Token(TokenType.Word, "A"),
            new Token(TokenType.Quoted, "xyz"),
            new Token(TokenType.Word, "Ebf_2"),
            new Token(TokenType.Whitespace, "\n"),
            new Token(TokenType.Integer, "2"),
            new Token(TokenType.Word, "x_2")
        ];

        let tokenizer = new GenericTokenizer();
        tokenizer.skipEof = true;
        tokenizer.decodeStrings = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });

    test('NumberToken', () => {
        let tokenString = "123-321 .543-.76-. -123.456";
        let expectedTokens: Token[] = [
            new Token(TokenType.Integer, "123"),
            new Token(TokenType.Integer, "-321"),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Float, ".543"),
            new Token(TokenType.Float, "-.76"),
            new Token(TokenType.Symbol, "-"),
            new Token(TokenType.Symbol, "."),
            new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Float, "-123.456")
        ];

        let tokenizer = new GenericTokenizer();
        tokenizer.skipEof = true;
        tokenizer.decodeStrings = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });

    test('ExpressionToken', () => {
        let tokenString = "A + b / (3 - Max(-123, 1)*2)";

        let tokenizer = new GenericTokenizer();
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        assert.equal(24, tokenList.length);
    });    

    test('ExpressionToken2', () => {
        let tokenString = "1>2";
        let expectedTokens: Token[] = [
            new Token(TokenType.Integer, "1"),
            new Token(TokenType.Symbol, ">"),
            new Token(TokenType.Integer, "2"),
        ];

        let tokenizer = new GenericTokenizer();
        tokenizer.skipEof = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });    

});