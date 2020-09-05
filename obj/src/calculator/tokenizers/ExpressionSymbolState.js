"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TokenType_1 = require("../../tokenizers/TokenType");
const GenericSymbolState_1 = require("../../tokenizers/generic/GenericSymbolState");
/**
 * Implements a symbol state object.
 */
class ExpressionSymbolState extends GenericSymbolState_1.GenericSymbolState {
    /**
     * Constructs an instance of this class.
     */
    constructor() {
        super();
        this.add("<=", TokenType_1.TokenType.Symbol);
        this.add(">=", TokenType_1.TokenType.Symbol);
        this.add("<>", TokenType_1.TokenType.Symbol);
        this.add("!=", TokenType_1.TokenType.Symbol);
        this.add(">>", TokenType_1.TokenType.Symbol);
        this.add("<<", TokenType_1.TokenType.Symbol);
    }
}
exports.ExpressionSymbolState = ExpressionSymbolState;
//# sourceMappingURL=ExpressionSymbolState.js.map