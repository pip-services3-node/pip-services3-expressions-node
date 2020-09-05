"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
/**
 * Exception that can be thrown by Expression Parser.
 */
class SyntaxException extends pip_services3_commons_node_1.BadRequestException {
    constructor(correlationId = null, code = null, message = null) {
        super(correlationId, code, message);
    }
}
exports.SyntaxException = SyntaxException;
//# sourceMappingURL=SyntaxException.js.map