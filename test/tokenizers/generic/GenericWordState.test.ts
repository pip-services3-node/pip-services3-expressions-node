const assert = require('chai').assert;

import { StringPushbackReader } from '../../../src/io/StringPushbackReader';
import { GenericWordState } from '../../../src/tokenizers/generic/GenericWordState';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('GenericWordState', ()=> {
    test('NextToken', () => {
        var state = new GenericWordState();

        var reader = new StringPushbackReader("AB_CD=");
        var token = state.nextToken(reader, null);
        assert.equal("AB_CD", token.value);
        assert.equal(TokenType.Word, token.type);
    });    
});