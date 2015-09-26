/// <reference path="transpiler.ts" />

module arnoldc {
    /**
     * Transpiles the specified ArnoldC code to javascript and executes it.
     * @param code - the ArnoldC code to execute
     * @param options - any additional options to control how the code is executed
     */
    export function transpileToJsAndExecute(code: string, options?: ExecuteOptions): void {
        var js = arnoldc.transpileToJs(code);
        return executeScript(js, options);
    }

    /**
     * Options for controlling the execution of ArnoldC-transpiled javascript code.
     */
    export interface ExecuteOptions {
        /**
         * Overrides the method that the ArnoldC code uses to print messages.
         */
        log?: (message: any) => void;

        /**
         * Overrides the method that ArnoldC uses to prompt for input.
         */
        prompt?: () => string;
    }

    function executeScript(js: string, options?: ExecuteOptions): void {
        if (!options) options = {};

        var consoleOverride = options.log ? { log: options.log } : console;
        var promptOverride = options.prompt || prompt;
        new Function('console', 'prompt', js)(consoleOverride, promptOverride);
    }
}