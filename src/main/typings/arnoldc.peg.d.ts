declare module arnoldc.peg {
    /**
     * Parses the specified ArnoldC input.
     * @param input - the ArnoldC code to parse
     * @returns the parsed MethodDeclarations
     */
    export function parse(input: string): MethodDeclaration[];

    /**
     * Thrown when the parse fails.
     */
    export class SyntaxError implements Error {
        line: number;
        column: number;
        offset: number;

        expected: any[];
        found: any;
        name: string;
        message: string;
    }
}

declare module arnoldc {
    interface MethodDeclaration {
        methodType: string;
        name?: string;
        methodParameters: IdentifierOperand[];
        statements: Statement[];
    }

    interface Statement {
        statementType: string;
    }

    interface ConditionStatement extends Statement {
        conditionOperand: Operand;
        ifBranchStatements: Statement[];
        elseBranchStatements?: Statement[];
    }

    interface WhileStatement extends Statement {
        operand: Operand;
        statements: Statement[];
    }

    interface PrintStatement extends Statement {
        operand: Operand;
    }

    interface DeclareIntStatement extends Statement {
        variableName: string;
        operand: Operand;
    }

    interface AssignVariableStatement extends Statement {
        variableName: string;
        expression: Expression;
    }

    interface CallMethodStatement extends Statement {
        assignVariableName?: string;
        methodName: string;
        methodArguments: Operand[];
    }

    interface CallReadMethodStatement extends Statement {
        assignVariableName?: string;
    }

    interface ReturnStatement extends Statement {
        operand?: Operand;
    }

    interface Expression {
        operand: Operand;
        operations?: Operation[];
    }

    interface Operation {
        operationType: string;
        operator: string;
        operand: Operand;
    }

    interface Operand {
        operandType: string;
    }

    interface LiteralOperand extends Operand {
        valueType: string;
        value: any;
    }

    interface IdentifierOperand extends Operand {
        name: string;
    }
}