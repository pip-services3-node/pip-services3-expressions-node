"use strict";
/** @module calculator */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultFunctionCollection = void 0;
const FunctionCollection_1 = require("./FunctionCollection");
const DelegatedFunction_1 = require("./DelegatedFunction");
const Variant_1 = require("../../variants/Variant");
const VariantType_1 = require("../../variants/VariantType");
const ExpressionException_1 = require("../ExpressionException");
/**
 * Implements a list filled with standard functions.
 */
class DefaultFunctionCollection extends FunctionCollection_1.FunctionCollection {
    /**
     * Constructs this list and fills it with the standard functions.
     */
    constructor() {
        super();
        this.add(new DelegatedFunction_1.DelegatedFunction("Ticks", this.ticksFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("TimeSpan", this.timeSpanFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Now", this.nowFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Date", this.dateFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("DayOfWeek", this.dayOfWeekFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Min", this.minFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Max", this.maxFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Sum", this.sumFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("If", this.ifFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Choose", this.chooseFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("E", this.eFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Pi", this.piFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Rnd", this.rndFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Random", this.rndFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Abs", this.absFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Acos", this.acosFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Asin", this.asinFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Atan", this.atanFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Exp", this.expFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Log", this.logFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Ln", this.logFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Log10", this.log10FunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Ceil", this.ceilFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Ceiling", this.ceilFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Floor", this.floorFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Round", this.roundFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Trunc", this.truncFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Truncate", this.truncFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Cos", this.cosFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Sin", this.sinFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Tan", this.tanFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Sqr", this.sqrtFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Sqrt", this.sqrtFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Empty", this.emptyFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Null", this.nullFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Contains", this.containsFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Array", this.arrayFunctionCalculator, this));
    }
    /**
     * Checks if params contains the correct number of function parameters (must be stored on the top of the params).
     * @param params A list of function parameters.
     * @param expectedParamCount The expected number of function parameters.
     */
    checkParamCount(params, expectedParamCount) {
        let paramCount = params.length;
        if (expectedParamCount != paramCount) {
            throw new ExpressionException_1.ExpressionException(null, "WRONG_PARAM_COUNT", "Expected " + expectedParamCount
                + " parameters but was found " + paramCount);
        }
    }
    /// <summary>
    /// Gets function parameter by it's index.
    /// </summary>
    /// <param name="params">A list of function parameters.</param>
    /// <param name="paramIndex">Index for the function parameter (0 for the first parameter).</param>
    /// <returns>Function parameter value.</returns>
    getParameter(params, paramIndex) {
        return params[paramIndex];
    }
    ticksFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant_1.Variant(new Date().getTime());
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    timeSpanFunctionCalculator(params, variantOperations, callback) {
        try {
            let paramCount = params.length;
            if (paramCount != 1 && paramCount != 3 && paramCount != 4 && paramCount != 5) {
                throw new ExpressionException_1.ExpressionException(null, "WRONG_PARAM_COUNT", "Expected 1, 3, 4 or 5 parameters");
            }
            let result = new Variant_1.Variant();
            if (paramCount == 1) {
                let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Long);
                result.asTimeSpan = value.asLong;
            }
            else if (paramCount > 2) {
                let value1 = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Long);
                let value2 = variantOperations.convert(this.getParameter(params, 1), VariantType_1.VariantType.Long);
                let value3 = variantOperations.convert(this.getParameter(params, 2), VariantType_1.VariantType.Long);
                let value4 = paramCount > 3 ? variantOperations.convert(this.getParameter(params, 3), VariantType_1.VariantType.Long) : Variant_1.Variant.fromLong(0);
                let value5 = paramCount > 4 ? variantOperations.convert(this.getParameter(params, 4), VariantType_1.VariantType.Long) : Variant_1.Variant.fromLong(0);
                result.asTimeSpan = (((value1.asLong * 24 + value2.asLong) * 60 + value3.asLong) * 60 + value4.asLong) * 1000 + value5.asLong;
            }
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    nowFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 0);
            let result = Variant_1.Variant.fromDateTime(new Date());
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    dateFunctionCalculator(params, variantOperations, callback) {
        try {
            let paramCount = params.length;
            if (paramCount < 1 || paramCount > 7) {
                throw new ExpressionException_1.ExpressionException(null, "WRONG_PARAM_COUNT", "Expected from 1 to 7 parameters");
            }
            if (paramCount == 1) {
                let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Long);
                let result1 = Variant_1.Variant.fromDateTime(new Date(value.asLong));
                callback(null, result1);
                return;
            }
            let value1 = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Integer);
            let value2 = paramCount > 1 ? variantOperations.convert(this.getParameter(params, 1), VariantType_1.VariantType.Integer) : Variant_1.Variant.fromInteger(1);
            let value3 = paramCount > 2 ? variantOperations.convert(this.getParameter(params, 2), VariantType_1.VariantType.Integer) : Variant_1.Variant.fromInteger(1);
            let value4 = paramCount > 3 ? variantOperations.convert(this.getParameter(params, 3), VariantType_1.VariantType.Integer) : Variant_1.Variant.fromInteger(0);
            let value5 = paramCount > 4 ? variantOperations.convert(this.getParameter(params, 4), VariantType_1.VariantType.Integer) : Variant_1.Variant.fromInteger(0);
            let value6 = paramCount > 5 ? variantOperations.convert(this.getParameter(params, 5), VariantType_1.VariantType.Integer) : Variant_1.Variant.fromInteger(0);
            let value7 = paramCount > 6 ? variantOperations.convert(this.getParameter(params, 6), VariantType_1.VariantType.Integer) : Variant_1.Variant.fromInteger(0);
            let date = new Date(value1.asInteger, value2.asInteger - 1, value3.asInteger, value4.asInteger, value5.asInteger, value6.asInteger, value7.asInteger);
            let result = Variant_1.Variant.fromDateTime(date);
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    dayOfWeekFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.DateTime);
            let date = value.asDateTime;
            let result = Variant_1.Variant.fromInteger(date.getDay());
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    minFunctionCalculator(params, variantOperations, callback) {
        try {
            let paramCount = params.length;
            if (paramCount < 2) {
                throw new ExpressionException_1.ExpressionException(null, "WRONG_PARAM_COUNT", "Expected at least 2 parameters");
            }
            let result = this.getParameter(params, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(params, i);
                if (variantOperations.more(result, value).asBoolean) {
                    result = value;
                }
            }
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    maxFunctionCalculator(params, variantOperations, callback) {
        try {
            let paramCount = params.length;
            if (paramCount < 2) {
                throw new ExpressionException_1.ExpressionException(null, "WRONG_PARAM_COUNT", "Expected at least 2 parameters");
            }
            let result = this.getParameter(params, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(params, i);
                if (variantOperations.less(result, value).asBoolean) {
                    result = value;
                }
            }
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    sumFunctionCalculator(params, variantOperations, callback) {
        try {
            let paramCount = params.length;
            if (paramCount < 2) {
                throw new ExpressionException_1.ExpressionException(null, "WRONG_PARAM_COUNT", "Expected at least 2 parameters");
            }
            let result = this.getParameter(params, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(params, i);
                result = variantOperations.add(result, value);
            }
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    ifFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 3);
            let value1 = this.getParameter(params, 0);
            let value2 = this.getParameter(params, 1);
            let value3 = this.getParameter(params, 2);
            let condition = variantOperations.convert(value1, VariantType_1.VariantType.Boolean);
            let result = condition.asBoolean ? value2 : value3;
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    chooseFunctionCalculator(params, variantOperations, callback) {
        try {
            let paramCount = params.length;
            if (paramCount < 3) {
                throw new ExpressionException_1.ExpressionException(null, "WRONG_PARAM_COUNT", "Expected at least 3 parameters");
            }
            let value1 = this.getParameter(params, 0);
            let condition = variantOperations.convert(value1, VariantType_1.VariantType.Integer);
            let paramIndex = condition.asInteger;
            if (paramCount < paramIndex + 1) {
                throw new ExpressionException_1.ExpressionException(null, "WRONG_PARAM_COUNT", "Expected at least " + (paramIndex + 1) + " parameters");
            }
            let result = this.getParameter(params, paramIndex);
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    eFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant_1.Variant(Math.E);
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    piFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant_1.Variant(Math.PI);
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    rndFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant_1.Variant(Math.random());
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    absFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = this.getParameter(params, 0);
            let result = new Variant_1.Variant();
            switch (value.type) {
                case VariantType_1.VariantType.Integer:
                    result.asInteger = Math.abs(value.asInteger);
                    break;
                case VariantType_1.VariantType.Long:
                    result.asLong = Math.abs(value.asLong);
                    break;
                case VariantType_1.VariantType.Float:
                    result.asFloat = Math.abs(value.asFloat);
                    break;
                case VariantType_1.VariantType.Double:
                    result.asDouble = Math.abs(value.asDouble);
                    break;
                default:
                    value = variantOperations.convert(value, VariantType_1.VariantType.Double);
                    result.asDouble = Math.abs(value.asDouble);
                    break;
            }
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    acosFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.acos(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    asinFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.asin(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    atanFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.atan(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    expFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.exp(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    logFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.log(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    log10FunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.log10(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    ceilFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.ceil(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    floorFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.floor(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    roundFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.round(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    truncFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant();
            result.asInteger = Math.trunc(value.asDouble);
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    cosFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.cos(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    sinFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.sin(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    tanFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.tan(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    sqrtFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.Double);
            let result = new Variant_1.Variant(Math.sqrt(value.asDouble));
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    emptyFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 1);
            let value = this.getParameter(params, 0);
            let result = new Variant_1.Variant(value.isEmpty());
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    nullFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 0);
            let result = new Variant_1.Variant();
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    containsFunctionCalculator(params, variantOperations, callback) {
        try {
            this.checkParamCount(params, 2);
            let containerstr = variantOperations.convert(this.getParameter(params, 0), VariantType_1.VariantType.String);
            let substring = variantOperations.convert(this.getParameter(params, 1), VariantType_1.VariantType.String);
            if (containerstr.isEmpty() || containerstr.isNull()) {
                let result = new Variant_1.Variant(false);
                try {
                    callback(null, result);
                }
                catch ( /* Ignore... */_a) { /* Ignore... */ }
                return;
            }
            let result = new Variant_1.Variant(containerstr.asString.indexOf(substring.asString) >= 0);
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_b) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    arrayFunctionCalculator(params, variantOperations, callback) {
        let result = Variant_1.Variant.fromArray(params);
        callback(null, result);
    }
}
exports.DefaultFunctionCollection = DefaultFunctionCollection;
//# sourceMappingURL=DefaultFunctionCollection.js.map