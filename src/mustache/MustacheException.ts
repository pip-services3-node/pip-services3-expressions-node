/** @module mustache */

import { BadRequestException } from "pip-services3-commons-node";

/**
 * Exception that can be thrown by Mustache Template.
 */
export class MustacheException extends BadRequestException {
    public constructor(correlationId: string = null, code: string = null,
        message: string = null) {
        super(correlationId, code, message);
    }
}