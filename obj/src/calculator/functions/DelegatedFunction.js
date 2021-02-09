"use strict";
/** @module calculator */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegatedFunction = void 0;
/// <summary>
/// Defines an interface for expression function.
/// </summary>
class DelegatedFunction {
    /**
     * Constructs this function class with specified parameters.
     * @param name The name of this function.
     * @param calculator The function calculator delegate.
     */
    constructor(name, calculator, context) {
        if (name == null) {
            throw new Error("Name parameter cannot be null");
        }
        if (calculator == null) {
            throw new Error("Calculator parameter cannot be null");
        }
        this._name = name;
        this._calculator = calculator;
        this._context = context;
    }
    /**
     * The function name.
     */
    get name() {
        return this._name;
    }
    /**
     * The function calculation method.
     * @param params an array with function parameters.
     * @param variantOperations Variants operations manager.
     * @param callback a callback to return function result.
     */
    calculate(params, variantOperations, callback) {
        try {
            if (this._context == null) {
                this._calculator(params, variantOperations, callback);
            }
            else {
                this._calculator.apply(this._context, [params, variantOperations, callback]);
            }
        }
        catch (err) {
            callback(err, null);
        }
    }
}
exports.DelegatedFunction = DelegatedFunction;
//# sourceMappingURL=DelegatedFunction.js.map