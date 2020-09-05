const assert = require('chai').assert;

import { StringPushbackReader } from '../../../src/io/StringPushbackReader';
import { CCommentState } from '../../../src/tokenizers/generic/CCommentState';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('CCommentState', ()=> {
    test('NextToken', () => {
        var state = new CCommentState();

        var reader = new StringPushbackReader("// Comment \n Comment ");
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

        reader = new StringPushbackReader("/* Comment \n Comment */#");
        var token = state.nextToken(reader, null);
        assert.equal("/* Comment \n Comment */", token.value);
        assert.equal(TokenType.Comment, token.type);
    });    
});