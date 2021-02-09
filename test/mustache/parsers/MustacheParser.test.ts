const assert = require('chai').assert;

import { MustacheParser } from '../../../src/mustache/parsers/MustacheParser';
import { MustacheToken } from '../../../src/mustache/parsers/MustacheToken';
import { MustacheTokenType } from '../../../src/mustache/parsers/MustacheTokenType';

suite('MustacheParser', ()=> {

    test('LexicalAnalysis', () => {
        let parser = new MustacheParser();
        parser.template = "Hello, {{{NAME}}}{{ #if ESCLAMATION }}!{{/if}}{{{^ESCLAMATION}}}.{{{/ESCLAMATION}}}";
        let expectedTokens = [
            new MustacheToken(MustacheTokenType.Value, "Hello, "),
            new MustacheToken(MustacheTokenType.EscapedVariable, "NAME"),
            new MustacheToken(MustacheTokenType.Section, "ESCLAMATION"),
            new MustacheToken(MustacheTokenType.Value, "!"),
            new MustacheToken(MustacheTokenType.SectionEnd, null),
            new MustacheToken(MustacheTokenType.InvertedSection, "ESCLAMATION"),
            new MustacheToken(MustacheTokenType.Value, "."),
            new MustacheToken(MustacheTokenType.SectionEnd, "ESCLAMATION"),
        ];

        let tokens = parser.initialTokens;
        assert.equal(expectedTokens.length, tokens.length);

        for (let i = 0; i < tokens.length; i++) {
            assert.equal(expectedTokens[i].type, tokens[i].type);
            assert.equal(expectedTokens[i].value, tokens[i].value);
        }
    });    

    test('SyntaxAnalysis', () => {
        let parser = new MustacheParser();
        parser.template = "Hello, {{{NAME}}}{{ #if ESCLAMATION }}!{{/if}}{{{^ESCLAMATION}}}.{{{/ESCLAMATION}}}";
        let expectedTokens = [
            new MustacheToken(MustacheTokenType.Value, "Hello, "),
            new MustacheToken(MustacheTokenType.EscapedVariable, "NAME"),
            new MustacheToken(MustacheTokenType.Section, "ESCLAMATION"),
            new MustacheToken(MustacheTokenType.InvertedSection, "ESCLAMATION"),
        ];

        let tokens = parser.resultTokens;
        assert.equal(expectedTokens.length, tokens.length);

        for (let i = 0; i < tokens.length; i++) {
            assert.equal(expectedTokens[i].type, tokens[i].type);
            assert.equal(expectedTokens[i].value, tokens[i].value);
        }
    });    

    test('VariableNames', () => {
        let parser = new MustacheParser();
        parser.template = "Hello, {{{NAME}}}{{ #if ESCLAMATION }}!{{/if}}{{{^ESCLAMATION}}}.{{{/ESCLAMATION}}}";
        assert.equal(2, parser.variableNames.length);
        assert.equal("NAME", parser.variableNames[0]);
        assert.equal("ESCLAMATION", parser.variableNames[1]);
    });    

});