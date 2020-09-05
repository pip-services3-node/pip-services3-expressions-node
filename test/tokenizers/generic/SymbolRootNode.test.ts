const assert = require('chai').assert;

import { StringPushbackReader } from '../../../src/io/StringPushbackReader';
import { SymbolRootNode } from '../../../src/tokenizers/generic/SymbolRootNode';
import { TokenType } from '../../../src/tokenizers/TokenType';

suite('SymbolRootNode', ()=> {
    test('NextToken', () => {
        let node = new SymbolRootNode();
        node.add("<", TokenType.Symbol);
        node.add("<<", TokenType.Symbol);
        node.add("<>", TokenType.Symbol);

        let reader = new StringPushbackReader("<A<<<>");

        let token = node.nextToken(reader);
        assert.equal("<", token.value);

        token = node.nextToken(reader);
        assert.equal("A", token.value);

        token = node.nextToken(reader);
        assert.equal("<<", token.value);

        token = node.nextToken(reader);
        assert.equal("<>", token.value);
    });    

    test('SingleToken', () => {
        let node = new SymbolRootNode();
        //node.add("<", TokenType.Symbol);
        //node.add("<<", TokenType.Symbol);

        let reader = new StringPushbackReader("<A");

        let token = node.nextToken(reader);
        assert.equal("<", token.value);
        assert.equal(TokenType.Symbol, token.type);
    });    

});