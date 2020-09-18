const assert = require('chai').assert;
const async = require('async');

import { StringConverter } from 'pip-services3-commons-node';
import { DefaultFunctionCollection } from '../../../src/calculator/functions/DefaultFunctionCollection';
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
        });
    });    

    test('DateFunctions', (callback) => {
        async.series([
            (callback) => {
                let collection = new DefaultFunctionCollection();
                let params = [];
                let operations = new TypeUnsafeVariantOperations();
        
                let func = collection.findByName("now");
                assert.isNotNull(func);
        
                func.calculate(params, operations, (err, result) => {
                    assert.isNull(err);
                    assert.equal(VariantType.DateTime, result.type);
        
                    callback(err);
                });
            },
            (callback) => {
                let collection = new DefaultFunctionCollection();
                let params = [
                    new Variant(1975),
                    new Variant(4),
                    new Variant(8)
                ];
                let operations = new TypeUnsafeVariantOperations();
        
                let func = collection.findByName("date");
                assert.isNotNull(func);
        
                func.calculate(params, operations, (err, result) => {
                    assert.isNull(err);
                    assert.equal(VariantType.DateTime, result.type);
                    assert.equal(StringConverter.toString(new Date(1975,3,8)), StringConverter.toString(result.asDateTime));
        
                    callback(err);
                });
            }
        ], callback);
    });        
});