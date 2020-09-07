const assert = require('chai').assert;

import { DefaultFunctionCollection } from '../../../src/calculator/functions/DefaultFunctionCollection';
import { CalculationStack } from '../../../src/calculator/CalculationStack';
import { Variant } from '../../../src/variants/Variant';
import { VariantType } from '../../../src/variants/VariantType';
import { TypeUnsafeVariantOperations } from '../../../src/variants/TypeUnsafeVariantOperations';

suite('DefaultFunctionCollection', ()=> {

    let testFunc = (params, operations, callback) => {
        callback(null, new Variant("ABC"));
    }

    test('CalculateFunctions', (callback) => {
        let collection = new DefaultFunctionCollection();
        let params = [
            new Variant(1),
            new Variant(2),
            new Variant(3)
        ];
        let operations = new TypeUnsafeVariantOperations();

        let func = collection.findByName("sum");
        assert.isNotNull(func);

        func.calculate(params, operations, (err, result) => {
            assert.isNull(err);
            assert.equal(VariantType.Integer, result.type);
            assert.equal(6, result.asInteger);

            callback(err);
        })
    });    

});