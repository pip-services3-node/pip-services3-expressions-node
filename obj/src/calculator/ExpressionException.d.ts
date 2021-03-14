/** @module calculator */
import { BadRequestException } from "pip-services3-commons-node";
/**
 * Exception that can be thrown by Expression Calculator.
 */
export declare class ExpressionException extends BadRequestException {
    constructor(correlationId: string, code: string, message: string, line?: number, column?: number);
}
