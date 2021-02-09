/** @module mustache */
import { BadRequestException } from "pip-services3-commons-node";
/**
 * Exception that can be thrown by Mustache Template.
 */
export declare class MustacheException extends BadRequestException {
    constructor(correlationId?: string, code?: string, message?: string);
}
