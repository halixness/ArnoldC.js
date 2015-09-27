/// <reference path="typings/qunit.d.ts" />
/// <reference path="../main/transpiler.ts" />
/// <reference path="../main/executor.ts" />
"use strict";

module testhelpers {
    export function transpileAndExecute(code: string, options?: arnoldc.ExecuteOptions): string[] {
        //console.log(arnoldc.transpileToJs(code));

        var output: string[] = [];

        if (!options) options = {};
        options.log = function (x) { output.push(x); };
        arnoldc.transpileToJsAndExecute(code, options);

        return output;
    }

    export function isSyntaxError(e: Error): boolean {
        return e.name === 'SyntaxError'
            && e.toString().indexOf(e.message) >= 0;
    }
    export function isTranspileError(e: Error): boolean {
        return e.name === 'TranspileError'
            && e.toString().indexOf(e.message) >= 0
            && e.message.indexOf('WHAT THE FUCK DID I DO WRONG:') === 0;
    }
    export function isReferenceError(e: Error): boolean {
        return e.name === 'ReferenceError'
            && e.toString().indexOf(e.message) >= 0;
    }
    export function isRangeError(e: Error): boolean {
        return e.name === 'RangeError'
            && e.toString().indexOf(e.message) >= 0;
    }
}