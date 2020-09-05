import { VariableCollection } from "./variables/VariableCollection";
import { FunctionCollection } from "./functions/FunctionCollection";
import { ExpressionToken } from "./parsers/ExpressionToken";
import { IVariantOperations } from "../variants/IVariantOperations";
import { Token } from "../tokenizers/Token";
import { Variant } from "../variants/Variant";
/**
 * Implements an expression calculator class.
 */
export declare class ExpressionCalculator {
    private _defaultVariables;
    private _defaultFunctions;
    private _variantOperations;
    private _parser;
    private _autoVariables;
    /**
     * Constructs this class and assigns expression string.
     * @param expression The expression string.
     */
    constructor(expression?: string);
    /**
     * The expression string.
     */
    /**
    * The expression string.
    */
    expression: string;
    originalTokens: Token[];
    /**
     * Gets the flag to turn on auto creation of variables for specified expression.
     */
    /**
    * Sets the flag to turn on auto creation of variables for specified expression.
    */
    autoVariables: boolean;
    /**
     * Gets the manager for operations on variant values.
     */
    /**
    * Sets the manager for operations on variant values.
    */
    variantOperations: IVariantOperations;
    /**
     * The list with default variables.
     */
    readonly defaultVariables: VariableCollection;
    /**
     * The list with default functions.
     */
    readonly defaultFunctions: FunctionCollection;
    /**
     * The list of original expression tokens.
     */
    readonly initialTokens: ExpressionToken[];
    /**
     * The list of processed expression tokens.
     */
    readonly resultTokens: ExpressionToken[];
    /**
     * Populates the specified variables list with variables from parsed expression.
     * @param variables The list of variables to be populated.
     */
    createVariables(variables: VariableCollection): void;
    /**
     * Cleans up this calculator from all data.
     */
    clear(): void;
    /**
     * Evaluates this expression using default variables and functions.
     * @param callback The callback to receive the evaluation results
     */
    evaluate(callback: (err: any, result: Variant) => void): void;
    /**
     * Evaluates this expression using specified variables.
     * @param variables The list of variables
     * @param callback The callback to receive the evaluation results
     */
    evaluateWithVariables(variables: VariableCollection, callback: (err: any, result: Variant) => void): void;
    /**
     * Evaluates this expression using specified variables and functions.
     * @param variables The list of variables
     * @param functions The list of functions
     * @param callback The callback to receive the evaluation results
     */
    evaluateWithVariablesAndFunctions(variables: VariableCollection, functions: FunctionCollection, callback: (err: any, result: Variant) => void): void;
    private evaluateConstant;
    private evaluateVariable;
    private evaluateFunction;
    private evaluateLogical;
    private evaluateArithmetical;
    private evaluateBoolean;
    private evaluateOther;
}
