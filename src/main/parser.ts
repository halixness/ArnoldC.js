/// <reference path="typings/arnoldc.peg.d.ts" />

module arnoldc {
    /**
     * Parses ArnoldC code.
     * @param source - the ArnoldC code to parse
     * @returns the resulting ParseTree
     */
    export function parse(source: string): ParseTree {
        var methods = arnoldc.peg.parse(source);
        var parseTree: ParseTree = {
            methods: methods
        };
        return parseTree;
    }

    /**
     * The parse tree from the ArnoldC parser.
     */
    export interface ParseTree {
        /**
         * The parsed methods.
         */
        methods: MethodDeclaration[];
    }
}