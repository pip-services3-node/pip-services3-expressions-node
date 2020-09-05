import { FunctionCollection } from "./FunctionCollection";
import { CalculationStack } from "../CalculationStack";
import { DelegatedFunction } from "./DelegatedFunction";
import { Variant } from "../../variants/Variant";
import { VariantType } from "../../variants/VariantType";
import { IVariantOperations } from "../../variants/IVariantOperations";

/**
 * Implements a list filled with standard functions.
 */
export class DefaultFunctionCollection extends FunctionCollection {
    /**
     * Constructs this list and fills it with the standard functions.
     */
    public constructor() {
        super();

        this.add(new DelegatedFunction("Time", this.timeFunctionCalculator, this));
        this.add(new DelegatedFunction("Now", this.timeFunctionCalculator, this));
        this.add(new DelegatedFunction("Min", this.minFunctionCalculator, this));
        this.add(new DelegatedFunction("Max", this.maxFunctionCalculator, this));
        this.add(new DelegatedFunction("Sum", this.sumFunctionCalculator, this));
        this.add(new DelegatedFunction("If", this.ifFunctionCalculator, this));
        this.add(new DelegatedFunction("Choose", this.chooseFunctionCalculator, this));
        this.add(new DelegatedFunction("E", this.eFunctionCalculator, this));
        this.add(new DelegatedFunction("Pi", this.piFunctionCalculator, this));
        this.add(new DelegatedFunction("Rnd", this.rndFunctionCalculator, this));
        this.add(new DelegatedFunction("Random", this.rndFunctionCalculator, this));
        this.add(new DelegatedFunction("Abs", this.absFunctionCalculator, this));
        this.add(new DelegatedFunction("Acos", this.acosFunctionCalculator, this));
        this.add(new DelegatedFunction("Asin", this.asinFunctionCalculator, this));
        this.add(new DelegatedFunction("Atan", this.atanFunctionCalculator, this));
        this.add(new DelegatedFunction("Exp", this.expFunctionCalculator, this));
        this.add(new DelegatedFunction("Log", this.logFunctionCalculator, this));
        this.add(new DelegatedFunction("Ln", this.logFunctionCalculator, this));
        this.add(new DelegatedFunction("Log10", this.log10FunctionCalculator, this));
        this.add(new DelegatedFunction("Ceil", this.ceilFunctionCalculator, this));
        this.add(new DelegatedFunction("Ceiling", this.ceilFunctionCalculator, this));
        this.add(new DelegatedFunction("Floor", this.floorFunctionCalculator, this));
        this.add(new DelegatedFunction("Round", this.roundFunctionCalculator, this));
        this.add(new DelegatedFunction("Trunc", this.truncFunctionCalculator, this));
        this.add(new DelegatedFunction("Truncate", this.truncFunctionCalculator, this));
        this.add(new DelegatedFunction("Cos", this.cosFunctionCalculator, this));
        this.add(new DelegatedFunction("Sin", this.sinFunctionCalculator, this));
        this.add(new DelegatedFunction("Tan", this.tanFunctionCalculator, this));
        this.add(new DelegatedFunction("Sqr", this.sqrtFunctionCalculator, this));
        this.add(new DelegatedFunction("Sqrt", this.sqrtFunctionCalculator, this));
        this.add(new DelegatedFunction("Empty", this.emptyFunctionCalculator, this));
        this.add(new DelegatedFunction("Null", this.nullFunctionCalculator, this));
        this.add(new DelegatedFunction("Contains", this.containsFunctionCalculator, this));
    }

    /**
     * Checks if stack contains the correct number of function parameters (must be stored on the top of the stack).
     * @param stack The stack with function parameters.
     * @param expectedParamCount The expected number of function parameters.
     */
    protected checkParamCount(stack: CalculationStack, expectedParamCount: number): void {
        let paramCount = stack.peek();
        if (paramCount.type != VariantType.Integer) {
            throw new Error("Internal error.");
        }
        if (expectedParamCount != paramCount.asInteger) {
            throw new Error("Expected " + expectedParamCount
                + " parameters but was found " + paramCount.asInteger);
        }
        if (stack.length < paramCount.asInteger) {
            throw new Error("Stack does not contain sufficient numeber of function parameters.");
        }
        return null;
    }

    /// <summary>
    /// Gets function parameter by it's index.
    /// </summary>
    /// <param name="stack">The stack with function parameters.</param>
    /// <param name="paramIndex">Index for the function parameter (0 for the first parameter).</param>
    /// <returns>Function parameter value.</returns>
    protected getParameter(stack: CalculationStack, paramIndex: number): Variant {
        let paramCount = stack.peek();
        if (paramCount.type != VariantType.Integer) {
            throw new Error("Internal error.");
        }
        return stack.peekAt(stack.length - 1 - paramCount.asInteger + paramIndex);
    }

    private timeFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 0);
            let result = new Variant(new Date().getTime());
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private minFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = stack.peek().asInteger;
            if (paramCount < 2) {
                throw new Error("Expected at least 2 parameters");
            }
            let result = this.getParameter(stack, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(stack, i);
                if (variantOperations.more(result, value).asBoolean) {
                    result = value;
                }
            }
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private maxFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = stack.peek().asInteger;
            if (paramCount < 2)
            {
                throw new Error("Expected at least 2 parameters");
            }
            let result = this.getParameter(stack, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(stack, i);
                if (variantOperations.less(result, value).asBoolean) {
                    result = value;
                }
            }
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private sumFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = stack.peek().asInteger;
            if (paramCount < 2) {
                throw new Error("Expected at least 2 parameters");
            }
            let result = this.getParameter(stack, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(stack, i);
                result = variantOperations.add(result, value);
            }
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private ifFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 3);
            let value1 = this.getParameter(stack, 0);
            let value2 = this.getParameter(stack, 1);
            let value3 = this.getParameter(stack, 2);
            let condition = variantOperations.convert(value1, VariantType.Boolean);
            let result = condition.asBoolean ? value2 : value3;
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private chooseFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = stack.peek().asInteger;
            if (paramCount < 3) {
                throw new Error("Expected at least 3 parameters");
            }

            let value1 = this.getParameter(stack, 0);
            let condition = variantOperations.convert(value1, VariantType.Integer);
            let paramIndex = condition.asInteger;

            if (paramCount < paramIndex + 1) {
                throw new Error("Expected at least " + (paramIndex + 1) + " parameters");
            }

            let result = this.getParameter(stack, paramIndex);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private eFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 0);
            let result = new Variant(Math.E);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private piFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 0);
            let result = new Variant(Math.PI);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private rndFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 0);
            let result = new Variant(Math.random());
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private absFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = this.getParameter(stack, 0);
            let result = new Variant();
            switch (value.type) {
                case VariantType.Integer:
                    result.asInteger = Math.abs(value.asInteger);
                    break;
                case VariantType.Long:
                    result.asLong = Math.abs(value.asLong);
                    break;
                case VariantType.Float:
                    result.asFloat = Math.abs(value.asFloat);
                    break;
                case VariantType.Double:
                    result.asDouble = Math.abs(value.asDouble);
                    break;
                default:
                    value = variantOperations.convert(value, VariantType.Double);
                    result.asDouble = Math.abs(value.asDouble);
                    break;
            }
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private acosFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.acos(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private asinFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.asin(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private atanFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.atan(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private expFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.exp(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private logFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.log(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private log10FunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.log10(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private ceilFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.ceil(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private floorFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.floor(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private roundFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.round(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private truncFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant();
            result.asInteger = Math.trunc(value.asDouble);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private cosFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.cos(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private sinFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.sin(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private tanFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.tan(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private sqrtFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType.Double);
            let result = new Variant(Math.sqrt(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private emptyFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 1);
            let value = this.getParameter(stack, 0);
            let result = new Variant(value.isEmpty());
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private nullFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 0);
            let result = new Variant();
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private containsFunctionCalculator(stack: CalculationStack, variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(stack, 2);
            let containerstr = variantOperations.convert(this.getParameter(stack, 0), VariantType.String);
            let substring = variantOperations.convert(this.getParameter(stack, 1), VariantType.String);

            if (containerstr.isEmpty() || containerstr.isNull()) {
                let result = new Variant(false);
                try { callback(null, result); } catch { /* Ignore... */ }
                return;
            }

            let result = new Variant(containerstr.asString.indexOf(substring.asString) >= 0);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }
}