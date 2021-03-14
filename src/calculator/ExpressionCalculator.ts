/** @module calculator */
/** @hidden */
const async = require('async');

import { IVariableCollection } from "./variables/IVariableCollection";
import { VariableCollection } from "./variables/VariableCollection";
import { Variable } from "./variables/Variable";
import { IFunctionCollection } from "./functions/IFunctionCollection";
import { DefaultFunctionCollection } from "./functions/DefaultFunctionCollection";
import { ExpressionParser } from "./parsers/ExpressionParser";
import { ExpressionToken } from "./parsers/ExpressionToken";
import { ExpressionTokenType } from "./parsers/ExpressionTokenType";
import { IVariantOperations } from "../variants/IVariantOperations";
import { TypeUnsafeVariantOperations } from "../variants/TypeUnsafeVariantOperations";
import { Token } from "../tokenizers/Token";
import { Variant } from "../variants/Variant";
import { CalculationStack } from "./CalculationStack";
import { ExpressionException } from "./ExpressionException";

/**
 * Implements an expression calculator class.
 */
export class ExpressionCalculator {
    private _defaultVariables: IVariableCollection = new VariableCollection();
    private _defaultFunctions: IFunctionCollection = new DefaultFunctionCollection();
    private _variantOperations: IVariantOperations = new TypeUnsafeVariantOperations();
    private _parser: ExpressionParser = new ExpressionParser();
    private _autoVariables: boolean = true;

    /**
     * Constructs this class and assigns expression string.
     * @param expression The expression string.
     */
    public constructor(expression?: string) {
        if (expression != null) {
            this.expression = expression;
        }
    }

    /**
     * The expression string.
     */
    public get expression(): string {
        return this._parser.expression;
    }

    /**
     * The expression string.
     */
    public set expression(value: string) {
        this._parser.expression = value;
        if (this._autoVariables) {
            this.createVariables(this._defaultVariables);
        }
    }

    public get originalTokens(): Token[] {
        return this._parser.originalTokens;
    }

    public set originalTokens(value: Token[]) {
        this._parser.originalTokens = value;
        if (this._autoVariables) {
            this.createVariables(this._defaultVariables);
        }
    }

    /**
     * Gets the flag to turn on auto creation of variables for specified expression.
     */
    public get autoVariables(): boolean {
        return this._autoVariables;
    }

    /**
     * Sets the flag to turn on auto creation of variables for specified expression.
     */
    public set autoVariables(value: boolean) {
        this._autoVariables = value;
    }

    /**
     * Gets the manager for operations on variant values.
     */
    public get variantOperations(): IVariantOperations {
        return this._variantOperations;
    }

    /**
     * Sets the manager for operations on variant values.
     */
    public set variantOperations(value: IVariantOperations) {
        this._variantOperations = value;
    }

    /**
     * The list with default variables.
     */
    public get defaultVariables(): IVariableCollection {
        return this._defaultVariables;
    }

    /**
     * The list with default functions.
     */
    public get defaultFunctions(): IFunctionCollection {
        return this._defaultFunctions;
    }

    /**
     * The list of original expression tokens.
     */
    public get initialTokens(): ExpressionToken[] {
        return this._parser.initialTokens;
    }

    /**
     * The list of processed expression tokens.
     */
    public get resultTokens(): ExpressionToken[] {
        return this._parser.resultTokens;
    }

    /**
     * Populates the specified variables list with variables from parsed expression.
     * @param variables The list of variables to be populated.
     */
    public createVariables(variables: IVariableCollection): void {
        for (let variableName of this._parser.variableNames) {
            if (variables.findByName(variableName) == null) {
                variables.add(new Variable(variableName));
            }
        }
    }

    /**
     * Cleans up this calculator from all data.
     */
    public clear(): void {
        this._parser.clear();
        this._defaultVariables.clear();
    }

    /**
     * Evaluates this expression using default variables and functions.
     * @param callback The callback to receive the evaluation results
     */
    public evaluate(callback: (err: any, result: Variant) => void): void {
        this.evaluateWithVariablesAndFunctions(null, null, callback);
    }

    /**
     * Evaluates this expression using specified variables.
     * @param variables The list of variables
     * @param callback The callback to receive the evaluation results
     */
    public evaluateWithVariables(variables: IVariableCollection,
        callback: (err: any, result: Variant) => void): void {
        this.evaluateWithVariablesAndFunctions(variables, null, callback);
    }

    /**
     * Evaluates this expression using specified variables and functions.
     * @param variables The list of variables
     * @param functions The list of functions
     * @param callback The callback to receive the evaluation results
     */
    public evaluateWithVariablesAndFunctions(variables: IVariableCollection, functions: IFunctionCollection,
        callback: (err: any, result: Variant) => void): void {
        let stack = new CalculationStack();
        variables = variables || this._defaultVariables;
        functions = functions || this._defaultFunctions;

        async.each(this.resultTokens, (token, callback) => {
            async.series([
                (callback) => {
                    this.evaluateConstant(token, stack, (err, processed) => {
                        err = err == null && processed ? "PROCESSED" : err;
                        callback(err);
                    });
                },
                (callback) => {
                    this.evaluateVariable(token, stack, variables, (err, processed) => {
                        err = err == null && processed ? "PROCESSED" : err;
                        callback(err);
                    });
                },
                (callback) => {
                    this.evaluateFunction(token, stack, functions, (err, processed) => { 
                        err = err == null && processed ? "PROCESSED" : err;
                        callback(err);
                    });
                },
                (callback) => {
                    this.evaluateLogical(token, stack, (err, processed) => { 
                        err = err == null && processed ? "PROCESSED" : err;
                        callback(err);
                    });
                },
                (callback) => {
                    this.evaluateArithmetical(token, stack, (err, processed) => { 
                        err = err == null && processed ? "PROCESSED" : err;
                        callback(err);
                    });
                },
                (callback) => {
                    this.evaluateBoolean(token, stack, (err, processed) => { 
                        err = err == null && processed ? "PROCESSED" : err;
                        callback(err);
                    });
                },
                (callback) => {
                    this.evaluateOther(token, stack, (err, processed) => { 
                        err = err == null && processed ? "PROCESSED" : err;
                        callback(err);
                    });
                },
            ], (err) => {
                if (err == null) {
                    err = new ExpressionException(null, "INTERNAL", "Internal error", token.line, token.column);
                }

                if (err == "PROCESSED") {
                    err = null;
                }

                callback(err);    
            });
        }, (err) => {
            if (err) {
                callback(err, null);
                return;
            }

            if (stack.length != 1) {
                err = new ExpressionException(null, "INTERNAL", "Internal error", 0, 0);
                callback(err, null);
                return;
            }

            let result = stack.pop();
            callback(null, result);
        });
    }

    private evaluateConstant(token: ExpressionToken, stack: CalculationStack,
        callback: (err: any, processed: boolean) => void): void {

        if (token.type != ExpressionTokenType.Constant) {
            callback(null, false);
            return;
        }

        stack.push(token.value);
        callback(null, true);
    }

    private evaluateVariable(token: ExpressionToken, stack: CalculationStack,
        variables: IVariableCollection, callback: (err: any, processed: boolean) => void): void {

        if (token.type != ExpressionTokenType.Variable) {
            callback(null, false);
            return;
        }

        let variable = variables.findByName(token.value.asString);
        if (variable == null) {
            let err = new ExpressionException(
                null,
                "VAR_NOT_FOUND",
                "Variable " + token.value.asString + " was not found",
                token.line, token.column
            );
            callback(err, false);
            return;
        }

        stack.push(variable.value);
        callback(null, true);
    }

    private evaluateFunction(token: ExpressionToken, stack: CalculationStack,
        functions: IFunctionCollection,
        callback: (err: any, processed: boolean) => void): void {

        if (token.type != ExpressionTokenType.Function) {
            callback(null, false);
            return;
        }

        let func = functions.findByName(token.value.asString);
        if (func == null) {
            let err = new ExpressionException(
                null,
                "FUNC_NOT_FOUND",
                "Function " + token.value.asString + " was not found",
                token.line, token.column
            );
            callback(err, false);
            return;
        }

        // Retrieve function parameters
        let params: Variant[] = [];
        let paramCount = stack.pop().asInteger;
        while (paramCount > 0) {
            params.splice(0, 0, stack.pop());
            paramCount--;
        }

        func.calculate(params, this._variantOperations, (err, functionResult) => {
            if (err) {
                callback(err, false);
                return;
            }

            stack.push(functionResult);

            callback(null, true);        
        });
    }

    private evaluateLogical(token: ExpressionToken, stack: CalculationStack,
        callback: (err: any, processed: boolean) => void): void {
        let result = false;
        try {
            switch (token.type) {
                case ExpressionTokenType.And:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.and(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Or:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.or(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Xor:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.xor(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Not:
                    {
                        stack.push(this._variantOperations.not(stack.pop()));
                        result = true;
                        break;
                    }
            }
        } catch (err) {
            callback(err, result);
            return;
        }
        callback(null, result);
    }

    private evaluateArithmetical(token: ExpressionToken, stack: CalculationStack,
        callback: (err: any, processed: boolean) => void): void  {
        let result = false;
        try {
            switch (token.type) {
                case ExpressionTokenType.Plus:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.add(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Minus:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.sub(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Star:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.mul(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Slash:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.div(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Procent:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.mod(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Power:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.pow(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Unary:
                    {
                        stack.push(this._variantOperations.negative(stack.pop()));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.ShiftLeft:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.lsh(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.ShiftRight:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.rsh(value1, value2));
                        result = true;
                        break;
                    }
            }
        } catch (err) {
            callback(err, result);
            return;
        }
        callback(null, result);
    }

    private evaluateBoolean(token: ExpressionToken, stack: CalculationStack,
        callback: (err: any, processed: boolean) => void): void {
        let result = false;
        try {
            switch (token.type) {
                case ExpressionTokenType.Equal:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.equal(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.NotEqual:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.notEqual(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.More:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.more(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Less:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.less(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.EqualMore:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.moreEqual(value1, value2));
                        result = true;
                        break;
                    }
                case ExpressionTokenType.EqualLess:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        stack.push(this._variantOperations.lessEqual(value1, value2));
                        result = true;
                        break;
                    }
            }
        } catch (err) {
            callback(err, result);
            return;
        }
        callback(null, result);
    }

    private evaluateOther(token: ExpressionToken, stack: CalculationStack,
        callback: (err: any, processed: boolean) => void): void {
        let result = false;
        try {
            switch (token.type) {
                case ExpressionTokenType.In:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        let rvalue = this._variantOperations.in(value2, value1);
                        stack.push(rvalue);
                        result = true;
                        break;
                    }
                case ExpressionTokenType.NotIn:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        let rvalue = this._variantOperations.in(value2, value1)
                        rvalue = Variant.fromBoolean(!rvalue.asBoolean);
                        stack.push(rvalue);
                        result = true;
                        break;
                    }
                case ExpressionTokenType.Element:
                    {
                        let value2 = stack.pop();
                        let value1 = stack.pop();
                        let rvalue = this._variantOperations.getElement(value1, value2);
                        stack.push(rvalue);
                        result = true;
                        break;
                    }
                case ExpressionTokenType.IsNull:
                    {
                        let rvalue = new Variant(stack.pop().isNull());
                        stack.push(rvalue);
                        result = true;
                        break;
                    }
                case ExpressionTokenType.IsNotNull:
                    {
                        let rvalue = new Variant(!stack.pop().isNull());
                        stack.push(rvalue);
                        result = true;
                        break;
                    }
            }
        } catch (err) {
            callback(err, result);
            return;
        }
        callback(null, result);
    }

}