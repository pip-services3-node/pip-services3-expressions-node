"use strict";
/** @module mustache */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MustacheException = void 0;
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
/**
 * Exception that can be thrown by Mustache Template.
 */
class MustacheException extends pip_services3_commons_node_1.BadRequestException {
    constructor(correlationId = null, code = null, message = null) {
        super(correlationId, code, message);
    }
}
exports.MustacheException = MustacheException;
//# sourceMappingURL=MustacheException.js.map