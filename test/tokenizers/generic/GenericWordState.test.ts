const assert = require('chai').assert;

import { StringScanner } from '../../../src/io/StringScanner';
import { GenericWordState } from '../../../src/tokenizers/generic/GenericWordState';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('GenericWordState', ()=> {
    test('NextToken', () => {
        var state = new GenericWordState();

        var scanner = new StringScanner("AB_CD=");
        var token = state.nextToken(scanner, null);
        assert.equal("AB_CD", token.value);
        assert.equal(TokenType.Word, token.type);
    });    
});