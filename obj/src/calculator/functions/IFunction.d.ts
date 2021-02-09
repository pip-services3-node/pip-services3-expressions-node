/** @module calculator */
import { Variant } from "../../variants/Variant";
import { IVariantOperations } from "../../variants/IVariantOperations";
/**
 * Defines an interface for expression function.
 */
export interface IFunction {
    /**
     * The function name.
     */
    name: string;
    /**
     * The function calculation method.
     * @param stack The stack to get function parameters and place
     * @param variantOperations Variants operations manager.
     * @param callback
     */
    calculate(params: Variant[], variantOperations: IVariantOperations, callback: (err: any, result: Variant) => void): void;
}
