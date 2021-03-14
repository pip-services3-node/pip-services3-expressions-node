const assert = require('chai').assert;

import { StringScanner } from '../../../src/io/StringScanner';
import { CCommentState } from '../../../src/tokenizers/generic/CCommentState';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('CCommentState', ()=> {
    test('NextToken', () => {
        var state = new CCommentState();

        var scanner = new StringScanner("// Comment \n Comment ");
        var failed = false;
        try
        {
            state.nextToken(scanner, null);
        }
        catch
        {
            failed = true;
        }
        assert.isTrue(failed);

        scanner = new StringScanner("/* Comment \n Comment */#");
        var token = state.nextToken(scanner, null);
        assert.equal("/* Comment \n Comment */", token.value);
        assert.equal(TokenType.Comment, token.type);
    });    
});