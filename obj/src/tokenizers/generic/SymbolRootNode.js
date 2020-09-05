"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SymbolNode_1 = require("./SymbolNode");
const Token_1 = require("../Token");
const TokenType_1 = require("../TokenType");
/**
 * This class is a special case of a <code>SymbolNode</code>. A <code>SymbolRootNode</code>
 * object has no symbol of its own, but has children that represent all possible symbols.
 */
class SymbolRootNode extends SymbolNode_1.SymbolNode {
    /**
     * Creates and initializes a root node.
     */
    constructor() {
        super(null, 0);
    }
    /**
     * Add the given string as a symbol.
     * @param value The character sequence to add.
     * @param tokenType
     */
    add(value, tokenType) {
        if (value == '') {
            throw new Error("Value must have at least 1 character");
        }
        let childNode = this.ensureChildWithChar(value.charCodeAt(0));
        if (childNode.tokenType == TokenType_1.TokenType.Unknown) {
            childNode.valid = true;
            childNode.tokenType = TokenType_1.TokenType.Symbol;
        }
        childNode.addDescendantLine(value.substring(1), tokenType);
    }
    /**
     * Return a symbol string from a reader.
     * @param reader A reader to read from
     * @returns A symbol string from a reader
     */
    nextToken(reader) {
        let nextSymbol = reader.read();
        let childNode = this.findChildWithChar(nextSymbol);
        if (childNode != null) {
            childNode = childNode.deepestRead(reader);
            childNode = childNode.unreadToValid(reader);
            return new Token_1.Token(childNode.tokenType, childNode.ancestry());
        }
        else {
            return new Token_1.Token(TokenType_1.TokenType.Symbol, String.fromCharCode(nextSymbol));
        }
    }
}
exports.SymbolRootNode = SymbolRootNode;
//# sourceMappingURL=SymbolRootNode.js.map