const assert = require('chai').assert;

import { StringPushbackReader } from '../../../src/io/StringPushbackReader';
import { GenericCommentState } from '../../../src/tokenizers/generic/GenericCommentState';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('GenericCommentState', ()=> {
    test('NextToken', () => {
        let state = new GenericCommentState();

        let reader = new StringPushbackReader("# Comment \r# Comment ");
        let token = state.nextToken(reader, null);
        assert.equal("# Comment ", token.value);
        assert.equal(TokenType.Comment, token.type);

        reader = new StringPushbackReader("# Comment \n# Comment ");
        token = state.nextToken(reader, null);
        assert.equal("# Comment ", token.value);
        assert.equal(TokenType.Comment, token.type);
    });    
});