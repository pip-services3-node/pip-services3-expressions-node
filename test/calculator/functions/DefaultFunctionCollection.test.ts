const assert = require('chai').assert;

import { DefaultFunctionCollection } from '../../../src/calculator/functions/DefaultFunctionCollection';
import { CalculationStack } from '../../../src/calculator/CalculationStack';
import { Variant } from '../../../src/variants/Variant';
import { VariantType } from '../../../src/variants/VariantType';
import { TypeUnsafeVariantOperations } from '../../../src/variants/TypeUnsafeVariantOperations';

suite('DefaultFunctionCollection', ()=> {

    let testFunc = (stack, operations, callback) => {
        callback(null, new Variant("ABC"));
    }

    test('CalculateFunctions', (callback) => {
        let collection = new DefaultFunctionCollection();
        let stack = new CalculationStack();
        stack.push(new Variant(1));
        stack.push(new Variant(2));
        stack.push(new Variant(3));
        stack.push(new Variant(3));
        let operations = new TypeUnsafeVariantOperations();

        let func = collection.findByName("sum");
        assert.isNotNull(func);

        func.calculate(stack, operations, (err, result) => {
            assert.isNull(err);
            assert.equal(VariantType.Integer, result.type);
            assert.equal(6, result.asInteger);

            callback(err);
        })
    });    

});