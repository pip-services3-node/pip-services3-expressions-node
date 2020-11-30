/** @module calculator */

import { BadRequestException } from "pip-services3-commons-node";

/**
 * Exception that can be thrown by Expression Parser.
 */
export class SyntaxException extends BadRequestException {
    public constructor(correlationId: string = null, code: string = null,
        message: string = null) {
        super(correlationId, code, message);
    }
}