import { FunctionCollection } from "./FunctionCollection";
import { DelegatedFunction } from "./DelegatedFunction";
import { Variant } from "../../variants/Variant";
import { VariantType } from "../../variants/VariantType";
import { IVariantOperations } from "../../variants/IVariantOperations";
import { ExpressionException } from "../ExpressionException";

/**
 * Implements a list filled with standard functions.
 */
export class DefaultFunctionCollection extends FunctionCollection {
    /**
     * Constructs this list and fills it with the standard functions.
     */
    public constructor() {
        super();

        this.add(new DelegatedFunction("Ticks", this.ticksFunctionCalculator, this));
        this.add(new DelegatedFunction("TimeSpan", this.timeSpanFunctionCalculator, this));
        this.add(new DelegatedFunction("Now", this.nowFunctionCalculator, this));
        this.add(new DelegatedFunction("Date", this.dateFunctionCalculator, this));
        this.add(new DelegatedFunction("DayOfWeek", this.dayOfWeekFunctionCalculator, this));
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
        this.add(new DelegatedFunction("Array", this.arrayFunctionCalculator, this));
    }

    /**
     * Checks if params contains the correct number of function parameters (must be stored on the top of the params).
     * @param params A list of function parameters.
     * @param expectedParamCount The expected number of function parameters.
     */
    protected checkParamCount(params: Variant[], expectedParamCount: number): void {
        let paramCount = params.length;
        if (expectedParamCount != paramCount) {
            throw new ExpressionException(null, "WRONG_PARAM_COUNT",
                "Expected " + expectedParamCount
                + " parameters but was found " + paramCount);
        }
    }

    /// <summary>
    /// Gets function parameter by it's index.
    /// </summary>
    /// <param name="params">A list of function parameters.</param>
    /// <param name="paramIndex">Index for the function parameter (0 for the first parameter).</param>
    /// <returns>Function parameter value.</returns>
    protected getParameter(params: Variant[], paramIndex: number): Variant {
        return params[paramIndex];
    }

    private ticksFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant(new Date().getTime());
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private timeSpanFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = params.length;
            if (paramCount != 1 && paramCount != 3 && paramCount != 4 && paramCount != 5) {
                throw new ExpressionException(null, "WRONG_PARAM_COUNT", "Expected 1, 3, 4 or 5 parameters");
            }

            let result = new Variant();

            if (paramCount == 1) {
                let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Long);
                result.asTimeSpan = value.asLong;
            } else if (paramCount > 2) {
                let value1 = variantOperations.convert(this.getParameter(params, 0), VariantType.Long);
                let value2 = variantOperations.convert(this.getParameter(params, 1), VariantType.Long);
                let value3 = variantOperations.convert(this.getParameter(params, 2), VariantType.Long);
                let value4 = paramCount > 3 ? variantOperations.convert(this.getParameter(params, 3), VariantType.Long) : Variant.fromLong(0);
                let value5 = paramCount > 4 ? variantOperations.convert(this.getParameter(params, 4), VariantType.Long) : Variant.fromLong(0);

                result.asTimeSpan = (((value1.asLong * 24 + value2.asLong) * 60 + value3.asLong) * 60 + value4.asLong) * 1000 + value5.asLong;
            }
         
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private nowFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 0);
            let result = Variant.fromDateTime(new Date());
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private dateFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = params.length;
            if (paramCount < 1 || paramCount > 7) {
                throw new ExpressionException(null, "WRONG_PARAM_COUNT", "Expected from 1 to 7 parameters");
            }

            if (paramCount == 1) {
                let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Long);
                let result1 = Variant.fromDateTime(new Date(value.asLong));
                callback(null, result1);
                return;
            }

            let value1 = variantOperations.convert(this.getParameter(params, 0), VariantType.Integer);
            let value2 = paramCount > 1 ? variantOperations.convert(this.getParameter(params, 1), VariantType.Integer) : Variant.fromInteger(1);
            let value3 = paramCount > 2 ? variantOperations.convert(this.getParameter(params, 2), VariantType.Integer) : Variant.fromInteger(1);
            let value4 = paramCount > 3 ? variantOperations.convert(this.getParameter(params, 3), VariantType.Integer) : Variant.fromInteger(0);
            let value5 = paramCount > 4 ? variantOperations.convert(this.getParameter(params, 4), VariantType.Integer) : Variant.fromInteger(0);
            let value6 = paramCount > 5 ? variantOperations.convert(this.getParameter(params, 5), VariantType.Integer) : Variant.fromInteger(0);
            let value7 = paramCount > 6 ? variantOperations.convert(this.getParameter(params, 6), VariantType.Integer) : Variant.fromInteger(0);

            let date = new Date(value1.asInteger, value2.asInteger-1, value3.asInteger,
                value4.asInteger, value5.asInteger, value6.asInteger, value7.asInteger);
            let result = Variant.fromDateTime(date);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private dayOfWeekFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.DateTime);
            let date = value.asDateTime;
            let result = Variant.fromInteger(date.getDay());
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private minFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = params.length;
            if (paramCount < 2) {
                throw new ExpressionException(null, "WRONG_PARAM_COUNT",
                    "Expected at least 2 parameters");
            }
            let result = this.getParameter(params, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(params, i);
                if (variantOperations.more(result, value).asBoolean) {
                    result = value;
                }
            }
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private maxFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = params.length;
            if (paramCount < 2)
            {
                throw new ExpressionException(null, "WRONG_PARAM_COUNT",
                    "Expected at least 2 parameters");
            }
            let result = this.getParameter(params, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(params, i);
                if (variantOperations.less(result, value).asBoolean) {
                    result = value;
                }
            }
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private sumFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = params.length;
            if (paramCount < 2) {
                throw new ExpressionException(null, "WRONG_PARAM_COUNT",
                    "Expected at least 2 parameters");
            }
            let result = this.getParameter(params, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(params, i);
                result = variantOperations.add(result, value);
            }
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private ifFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 3);
            let value1 = this.getParameter(params, 0);
            let value2 = this.getParameter(params, 1);
            let value3 = this.getParameter(params, 2);
            let condition = variantOperations.convert(value1, VariantType.Boolean);
            let result = condition.asBoolean ? value2 : value3;
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private chooseFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            let paramCount = params.length;
            if (paramCount < 3) {
                throw new ExpressionException(null, "WRONG_PARAM_COUNT",
                    "Expected at least 3 parameters");
            }

            let value1 = this.getParameter(params, 0);
            let condition = variantOperations.convert(value1, VariantType.Integer);
            let paramIndex = condition.asInteger;

            if (paramCount < paramIndex + 1) {
                throw new ExpressionException(null, "WRONG_PARAM_COUNT",
                    "Expected at least " + (paramIndex + 1) + " parameters");
            }

            let result = this.getParameter(params, paramIndex);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private eFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant(Math.E);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private piFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant(Math.PI);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private rndFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant(Math.random());
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private absFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = this.getParameter(params, 0);
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

    private acosFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.acos(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private asinFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.asin(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private atanFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.atan(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private expFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.exp(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private logFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.log(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private log10FunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.log10(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private ceilFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.ceil(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private floorFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.floor(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private roundFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.round(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private truncFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant();
            result.asInteger = Math.trunc(value.asDouble);
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private cosFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.cos(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private sinFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.sin(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private tanFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.tan(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private sqrtFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType.Double);
            let result = new Variant(Math.sqrt(value.asDouble));
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private emptyFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 1);
            let value = this.getParameter(params, 0);
            let result = new Variant(value.isEmpty());
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private nullFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant();
            try { callback(null, result); } catch { /* Ignore... */ }
        } catch (err) {
            callback(err, null);
        }
    }

    private containsFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        try {
            this.checkParamCount(params, 2);
            let containerstr = variantOperations.convert(this.getParameter(params, 0), VariantType.String);
            let substring = variantOperations.convert(this.getParameter(params, 1), VariantType.String);

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

    private arrayFunctionCalculator(params: Variant[], variantOperations: IVariantOperations,
        callback: (err: any, result: Variant) => void) : void {
        
        let result = Variant.fromArray(params);
        callback(null, result);
    }

}