"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FunctionCollection_1 = require("./FunctionCollection");
const DelegatedFunction_1 = require("./DelegatedFunction");
const Variant_1 = require("../../variants/Variant");
const VariantType_1 = require("../../variants/VariantType");
/**
 * Implements a list filled with standard functions.
 */
class DefaultFunctionCollection extends FunctionCollection_1.FunctionCollection {
    /**
     * Constructs this list and fills it with the standard functions.
     */
    constructor() {
        super();
        this.add(new DelegatedFunction_1.DelegatedFunction("Time", this.timeFunctionCalculator, this));
        this.add(new DelegatedFunction_1.DelegatedFunction("Now", this.timeFunctionCalculator, this));
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
    }
    /**
     * Checks if stack contains the correct number of function parameters (must be stored on the top of the stack).
     * @param stack The stack with function parameters.
     * @param expectedParamCount The expected number of function parameters.
     */
    checkParamCount(stack, expectedParamCount) {
        let paramCount = stack.peek();
        if (paramCount.type != VariantType_1.VariantType.Integer) {
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
    getParameter(stack, paramIndex) {
        let paramCount = stack.peek();
        if (paramCount.type != VariantType_1.VariantType.Integer) {
            throw new Error("Internal error.");
        }
        return stack.peekAt(stack.length - 1 - paramCount.asInteger + paramIndex);
    }
    timeFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 0);
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
    minFunctionCalculator(stack, variantOperations, callback) {
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
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    maxFunctionCalculator(stack, variantOperations, callback) {
        try {
            let paramCount = stack.peek().asInteger;
            if (paramCount < 2) {
                throw new Error("Expected at least 2 parameters");
            }
            let result = this.getParameter(stack, 0);
            for (let i = 1; i < paramCount; i++) {
                let value = this.getParameter(stack, i);
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
    sumFunctionCalculator(stack, variantOperations, callback) {
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
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    ifFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 3);
            let value1 = this.getParameter(stack, 0);
            let value2 = this.getParameter(stack, 1);
            let value3 = this.getParameter(stack, 2);
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
    chooseFunctionCalculator(stack, variantOperations, callback) {
        try {
            let paramCount = stack.peek().asInteger;
            if (paramCount < 3) {
                throw new Error("Expected at least 3 parameters");
            }
            let value1 = this.getParameter(stack, 0);
            let condition = variantOperations.convert(value1, VariantType_1.VariantType.Integer);
            let paramIndex = condition.asInteger;
            if (paramCount < paramIndex + 1) {
                throw new Error("Expected at least " + (paramIndex + 1) + " parameters");
            }
            let result = this.getParameter(stack, paramIndex);
            try {
                callback(null, result);
            }
            catch ( /* Ignore... */_a) { /* Ignore... */ }
        }
        catch (err) {
            callback(err, null);
        }
    }
    eFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 0);
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
    piFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 0);
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
    rndFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 0);
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
    absFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = this.getParameter(stack, 0);
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
    acosFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    asinFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    atanFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    expFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    logFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    log10FunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    ceilFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    floorFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    roundFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    truncFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    cosFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    sinFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    tanFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    sqrtFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.Double);
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
    emptyFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 1);
            let value = this.getParameter(stack, 0);
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
    nullFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 0);
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
    containsFunctionCalculator(stack, variantOperations, callback) {
        try {
            this.checkParamCount(stack, 2);
            let containerstr = variantOperations.convert(this.getParameter(stack, 0), VariantType_1.VariantType.String);
            let substring = variantOperations.convert(this.getParameter(stack, 1), VariantType_1.VariantType.String);
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
}
exports.DefaultFunctionCollection = DefaultFunctionCollection;
//# sourceMappingURL=DefaultFunctionCollection.js.map