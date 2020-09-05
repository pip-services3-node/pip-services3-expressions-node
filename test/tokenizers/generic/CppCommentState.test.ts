const assert = require('chai').assert;

import { StringPushbackReader } from '../../../src/io/StringPushbackReader';
import { CppCommentState } from '../../../src/tokenizers/generic/CppCommentState';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('CppCommentState', ()=> {
    test('NextToken', () => {
        var state = new CppCommentState();

        var reader = new StringPushbackReader("-- Comment \n Comment ");
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

        reader = new StringPushbackReader("// Comment \n Comment ");
        var token = state.nextToken(reader, null);
        assert.equal("// Comment ", token.value);
        assert.equal(TokenType.Comment, token.type);

        reader = new StringPushbackReader("/* Comment \n Comment */#");
        token = state.nextToken(reader, null);
        assert.equal("/* Comment \n Comment */", token.value);
        assert.equal(TokenType.Comment, token.type);
    });    
});