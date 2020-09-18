const assert = require('chai').assert;
const async = require('async');

import { ExpressionCalculator } from '../../src/calculator/ExpressionCalculator';
import { VariantType } from '../../src/variants/VariantType';
import { Variant } from '../../src/variants/Variant';

suite('ExpressionCalculator', ()=> {

    test('SimpleExpression', (done) => {
        let calculator = new ExpressionCalculator();

        calculator.expression = "2 + 2";
        calculator.evaluate((err, result) => {
            assert.isNull(err);
            assert.equal(VariantType.Integer, result.type);
            assert.equal(4, result.asInteger);    

            done(err);
        });
    });    

    test('FunctionExpression', (done) => {
        let calculator = new ExpressionCalculator();

        calculator.expression = "A + b / (3 - Max(-123, 1)*2)";
        // calculator.expression = "Abs(1)";
        assert.equal("A", calculator.defaultVariables.findByName("a").name);
        assert.equal("b", calculator.defaultVariables.findByName("b").name);
        calculator.defaultVariables.findByName("a").value = new Variant("xyz");
        calculator.defaultVariables.findByName("b").value = new Variant(123);
    
        calculator.evaluate((err, result) => {
            assert.isNull(err);
            assert.equal(VariantType.String, result.type);
            assert.equal("xyz123", result.asString);
    
            done(err);
        });
    });    

    test('ArrayExpression', (done) => {
        let calculator = new ExpressionCalculator();

        calculator.expression = "'abc'[1]";
        calculator.evaluate((err, result) => {
            assert.isNull(err);
            assert.equal(VariantType.String, result.type);
            assert.equal("b", result.asString);
    
            done(err);
        });
    });    

    test('BooleanExpression', (done) => {
        try {
            let calculator = new ExpressionCalculator();

            calculator.expression = "1 > 2";
            calculator.evaluate((err, result) => {
                assert.isNull(err);
                assert.equal(VariantType.Boolean, result.type);
                assert.isFalse(result.asBoolean);
        
                done(err);
            });
        } catch (err) {
            done(err);
        }
    });    

    test('UnknownFunction', (done) => {
        let calculator = new ExpressionCalculator();

        calculator.expression = "XXX(1)";
        calculator.evaluate((err, result) => {
            assert.isNotNull(err);
            assert.isNull(result);

            done();
        });
    });    

    test('InExpression', (done) => {
        async.series([
            (callback) => {
                try {
                    let calculator = new ExpressionCalculator();
        
                    calculator.expression = "2 IN ARRAY(1,2,3)";
                    calculator.evaluate((err, result) => {
                        assert.isNull(err);
                        assert.equal(VariantType.Boolean, result.type);
                        assert.isTrue(result.asBoolean);
                
                        callback(err);
                    });
                } catch (err) {
                    callback(err);
                }        
            },
            (callback) => {
                try {
                    let calculator = new ExpressionCalculator();
        
                    calculator.expression = "5 NOT IN ARRAY(1,2,3)";
                    calculator.evaluate((err, result) => {
                        assert.isNull(err);
                        assert.equal(VariantType.Boolean, result.type);
                        assert.isTrue(result.asBoolean);
                
                        callback(err);
                    });
                } catch (err) {
                    callback(err);
                }        
            }
        ], done);
    });    

});