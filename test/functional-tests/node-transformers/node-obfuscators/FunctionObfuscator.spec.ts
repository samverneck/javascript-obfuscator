import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('FunctionObfuscator', () => {
    describe('identifiers obfuscation inside `FunctionDeclaration` and `FunctionExpression` node body', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `
                (function () {
                    var test = function (test) {
                        console.log(test);
                        
                        if (true) {
                            var test = 5
                        }
                        
                        variable = 6;
                        
                        return test;
                    }
                })();
            `,
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

        it('should correct obfuscate both function parameter identifier and function body identifier with same name', () => {
            const functionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/var _0x[a-z0-9]{4,6} *= *function *\((_0x[a-z0-9]{4,6})\) *\{/);
            const functionBodyIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/console\['\\x6c\\x6f\\x67'\]\((_0x[a-z0-9]{4,6})\)/);

            const functionParamIdentifierName: string = (<RegExpMatchArray>functionParamIdentifierMatch)[1];
            const functionBodyIdentifierName: string = (<RegExpMatchArray>functionBodyIdentifierMatch)[1];

            assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
        });

        it('shouldn\'t obfuscate other variables in function body', () => {
            assert.equal(/variable *= *0x6;/.test(obfuscatedCode), true);
        });
    });
});
