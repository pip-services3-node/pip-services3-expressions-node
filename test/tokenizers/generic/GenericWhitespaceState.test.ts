const assert = require('chai').assert;

import { StringPushbackReader } from '../../../src/io/StringPushbackReader';
import { GenericWhitespaceState } from '../../../src/tokenizers/generic/GenericWhitespaceState';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('GenericWhitespaceState', ()=> {
    test('NextToken', () => {
        var state = new GenericWhitespaceState();

        var reader = new StringPushbackReader(" \t\n\r #");
        var token = state.nextToken(reader, null);
        assert.equal(" \t\n\r ", token.value);
        assert.equal(TokenType.Whitespace, token.type);
    });    
});