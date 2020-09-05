const assert = require('chai').assert;

import { StringPushbackReader } from '../../../src/io/StringPushbackReader';
import { GenericNumberState } from '../../../src/tokenizers/generic/GenericNumberState';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('GenericNumberState', ()=> {
    test('NextToken', () => {
        var state = new GenericNumberState();

        var reader = new StringPushbackReader("ABC");
        var failed = false;
        try
        {
            state.nextToken(reader, null);
        }
        catch
        {
            failed = true;
        }
        assert.isTrue(failed);

        reader = new StringPushbackReader("123#");
        var token = state.nextToken(reader, null);
        assert.equal("123", token.value);
        assert.equal(TokenType.Integer, token.type);

        reader = new StringPushbackReader("-123#");
        token = state.nextToken(reader, null);
        assert.equal("-123", token.value);
        assert.equal(TokenType.Integer, token.type);
        
        reader = new StringPushbackReader("123.#");
        token = state.nextToken(reader, null);
        assert.equal("123.", token.value);
        assert.equal(TokenType.Float, token.type);

        reader = new StringPushbackReader("123.456#");
        token = state.nextToken(reader, null);
        assert.equal("123.456", token.value);
        assert.equal(TokenType.Float, token.type);

        reader = new StringPushbackReader("-123.456#");
        token = state.nextToken(reader, null);
        assert.equal("-123.456", token.value);
        assert.equal(TokenType.Float, token.type);
    });    
});