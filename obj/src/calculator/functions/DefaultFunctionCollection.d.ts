import { FunctionCollection } from "./FunctionCollection";
import { CalculationStack } from "../CalculationStack";
import { Variant } from "../../variants/Variant";
/**
 * Implements a list filled with standard functions.
 */
export declare class DefaultFunctionCollection extends FunctionCollection {
    /**
     * Constructs this list and fills it with the standard functions.
     */
    constructor();
    /**
     * Checks if stack contains the correct number of function parameters (must be stored on the top of the stack).
     * @param stack The stack with function parameters.
     * @param expectedParamCount The expected number of function parameters.
     */
    protected checkParamCount(stack: CalculationStack, expectedParamCount: number): void;
    protected getParameter(stack: CalculationStack, paramIndex: number): Variant;
    private timeFunctionCalculator;
    private minFunctionCalculator;
    private maxFunctionCalculator;
    private sumFunctionCalculator;
    private ifFunctionCalculator;
    private chooseFunctionCalculator;
    private eFunctionCalculator;
    private piFunctionCalculator;
    private rndFunctionCalculator;
    private absFunctionCalculator;
    private acosFunctionCalculator;
    private asinFunctionCalculator;
    private atanFunctionCalculator;
    private expFunctionCalculator;
    private logFunctionCalculator;
    private log10FunctionCalculator;
    private ceilFunctionCalculator;
    private floorFunctionCalculator;
    private roundFunctionCalculator;
    private truncFunctionCalculator;
    private cosFunctionCalculator;
    private sinFunctionCalculator;
    private tanFunctionCalculator;
    private sqrtFunctionCalculator;
    private emptyFunctionCalculator;
    private nullFunctionCalculator;
    private containsFunctionCalculator;
}
