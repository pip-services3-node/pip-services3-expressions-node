const assert = require('chai').assert;

import { ExpressionTokenizer } from '../../../src/calculator/tokenizers/ExpressionTokenizer';
import { TokenType } from '../../../src/tokenizers/TokenType';
import { Token } from '../../../src/tokenizers/Token';
import { TokenizerFixture } from '../../tokenizers/TokenizerFixture';

suite('ExpressionTokenizer', ()=> {
    test('QuoteToken', () => {
        let tokenString = "A'xyz'\"abc\ndeg\" 'jkl\"def'\"ab\"\"de\"'df''er'";
        let expectedTokens: Token[] = [
            new Token(TokenType.Word, "A"), new Token(TokenType.Quoted, "xyz"),
            new Token(TokenType.Word, "abc\ndeg"), new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Quoted, "jkl\"def"), new Token(TokenType.Word, "ab\"de"),
            new Token(TokenType.Quoted, "df'er")
        ];

        let tokenizer = new ExpressionTokenizer();
        tokenizer.skipEof = true;
        tokenizer.decodeStrings = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });    

    test('WordToken', () => {
        let tokenString = "A'xyz'Ebf_2\n2_2";
        let expectedTokens: Token[] = [
            new Token(TokenType.Word, "A"), new Token(TokenType.Quoted, "xyz"),
            new Token(TokenType.Word, "Ebf_2"), new Token(TokenType.Whitespace, "\n"),
            new Token(TokenType.Integer, "2"), new Token(TokenType.Word, "_2")
        ];

        let tokenizer = new ExpressionTokenizer();
        tokenizer.skipEof = true;
        tokenizer.decodeStrings = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });

    test('NumberToken', () => {
        let tokenString = "123-321 .543-.76-. 123.456 123e45 543.11E+43 1e 3E-";
        let expectedTokens: Token[] = [
            new Token(TokenType.Integer, "123"), new Token(TokenType.Symbol, "-"),
            new Token(TokenType.Integer, "321"), new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Float, ".543"), new Token(TokenType.Symbol, "-"),
            new Token(TokenType.Float, ".76"), new Token(TokenType.Symbol, "-"),
            new Token(TokenType.Symbol, "."), new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Float, "123.456"), new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Float, "123e45"), new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Float, "543.11E+43"), new Token(TokenType.Whitespace, " "),
            new Token(TokenType.Integer, "1"), new Token(TokenType.Word, "e"),
            new Token(TokenType.Whitespace, " "), new Token(TokenType.Integer, "3"),
            new Token(TokenType.Word, "E"), new Token(TokenType.Symbol, "-")
        ];

        let tokenizer = new ExpressionTokenizer();
        tokenizer.skipEof = true;
        tokenizer.decodeStrings = true;
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        TokenizerFixture.assertAreEqualsTokenLists(expectedTokens, tokenList);
    });

    test('ExpressionToken', () => {
        let tokenString = "A + b / (3 - Max(-123, 1)*2)";
     
        let tokenizer = new ExpressionTokenizer();
        let tokenList = tokenizer.tokenizeBuffer(tokenString);

        assert.equal(25, tokenList.length);
    });    

});