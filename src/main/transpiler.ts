/// <reference path="parser.ts" />

module arnoldc {
    /**
     * Transpiles the source ArnoldC code to javascript code.
     * @param source - the source ArnoldC code to be processed
     * @returns the javascript code
     */
    export function transpileToJs(source: string): string {
        var parseTree = parse(source);

        var context = createTranspileContext();
        var sb = context.sb;
        for (let i in parseTree.methods) {
            if (i > 0) {
                sb.appendLine();
            }
            let methodDeclaration = parseTree.methods[i];
            appendMethodDeclarationJs(context, methodDeclaration);
        }
        if (!context.isMainMethodDeclared()) {
            throw new TranspileError('Missing main method');
        }
        return sb.toString();
    }

    /**
     * Thrown when an error is detected during transpilation (after parsing is complete).
     */
    export class TranspileError implements Error {
        /**
         * Constructs an error with the specified message.
         * @param message - the error message
         */
        constructor(message: string) {
            this.name = 'TranspileError';
            this.message = 'WHAT THE FUCK DID I DO WRONG: \n' + message;
        }

        /**
         * The name of this error ("TranspileError").
         */
        name: string;

        /**
         * The error message.
         */
        message: string;
    }

    interface TranspileContext {
        sb: StringBuilder;

        startMethod: (methodName: string, hasReturnValue: boolean) => void;
        endMethod: () => void;
        isMainMethodDeclared(): boolean;
        startBlock: () => void;
        endBlock: () => void;
        declareVariable: (variableName: string) => void;
        referenceVariable: (variableName: string) => void;
        declareReturnStatement: (operand?: Operand) => void;
    }
    function createTranspileContext(): TranspileContext {
        var sb = createStringBuilder();
        var methodNameMap: { [key: string]: string } = {};

        var blockScopeStack: BlockScope[] = [];
        var getCurrentBlockScope = function () : BlockScope {
            if (blockScopeStack.length < 1) {
                throw new TranspileError('No block scope is started');
            }
            return blockScopeStack[blockScopeStack.length - 1];
        };

        var currentMethodScope: MethodScope = null;

        var context = {
            sb: sb,
            startMethod: function (methodName: string, hasReturnValue: boolean) {
                if (currentMethodScope !== null) {
                    throw new TranspileError(`A method (${currentMethodScope.methodName}) is already started.`);
                }

                methodName = methodName || '<main>';
                if (methodNameMap[methodName]) {
                    throw new TranspileError(`Method "${methodName}" is already defined.`);
                }
                methodNameMap[methodName] = methodName;

                currentMethodScope = createMethodScope(methodName, hasReturnValue);
                blockScopeStack.push(createBlockScope());
                sb.incrementIndentLevel();
            },
            endMethod: function () {
                if (blockScopeStack.length !== 1) {
                    throw new TranspileError(`Expected all block scopes to be ended, but there are ${blockScopeStack.length - 1} still open.`);
                }

                sb.decrementIndentLevel();
                blockScopeStack.pop();
                currentMethodScope = null;
            },
            isMainMethodDeclared: function () {
                return !!methodNameMap['<main>'];
            },

            startBlock: function () {
                if (!currentMethodScope) {
                    throw new TranspileError(`No method has not been started.`);
                }
                blockScopeStack.push(createBlockScope());
                sb.incrementIndentLevel();
            },
            endBlock: function () {
                sb.decrementIndentLevel();
                blockScopeStack.pop();
            },

            declareVariable: function (variableName: string) {
                var currentBlockScope = getCurrentBlockScope();
                currentBlockScope.declareVariable(variableName);
                currentMethodScope.declareVariable(variableName);
            },
            referenceVariable: function (variableName: string) {
                var isDeclared: boolean = false;
                for (let blockScope of blockScopeStack) {
                    isDeclared = blockScope.isVariableDeclared(variableName);
                    if (isDeclared) {
                        break;
                    }
                }

                if (!isDeclared) {
                    throw new TranspileError(`Variable "${variableName}" has not been declared.`);
                }
            },
            declareReturnStatement: function (operand?: Operand) {
                if (currentMethodScope.hasReturnValue === true && !operand) {
                    throw new TranspileError(`Method "${currentMethodScope.methodName}" must return a value.`);
                }
                if (currentMethodScope.hasReturnValue === false && !!operand) {
                    throw new TranspileError(`Method "${currentMethodScope.methodName}" cannot return a value.`);
                }
            },
        };
        return context;
    }

    interface BlockScope {
        declareVariable: (variableName: string) => void;
        isVariableDeclared: (variableName: string) => boolean;
    }
    function createBlockScope(): BlockScope {
        var variableNameMap: { [key: string]: string } = {};
        var blockScope = {
            declareVariable: function (variableName: string) {
                if (variableNameMap[variableName]) {
                    throw new TranspileError(`Variable "${variableName}" is already defined`);
                }
                variableNameMap[variableName] = variableName;
            },
            isVariableDeclared: function (variableName: string) {
                return !!variableNameMap[variableName];
            }
        };
        return blockScope;
    }

    interface MethodScope extends BlockScope {
        methodName: string;
        hasReturnValue: boolean;
    }
    function createMethodScope(methodName: string, hasReturnValue: boolean): MethodScope {
        var methodScope = <MethodScope>createBlockScope();
        methodScope.methodName = methodName;
        methodScope.hasReturnValue = hasReturnValue;
        return methodScope;
    }

    interface StringBuilder {
        append: (value: string) => void;
        appendLine: (value?: string) => void;

        incrementIndentLevel: () => void;
        decrementIndentLevel: () => void;

        toString: () => string;
    }
    function createStringBuilder(): StringBuilder {
        var tokens: string[] = [];

        const indentString = '  ';
        var currentIndentLevel = 0;
        var isLineIndented = false;

        var append = function (value: string) {
            if (!isLineIndented) {
                for (let i = 0; i < currentIndentLevel; i++) {
                    tokens.push(indentString);
                }
                isLineIndented = true;
            }
            tokens.push(value);
        };

        var sb: StringBuilder = {
            append: append,
            appendLine: function (value) {
                if (value) {
                    append(value);
                }
                tokens.push('\n');
                isLineIndented = false;
            },

            incrementIndentLevel: function () {
                currentIndentLevel++;
                isLineIndented = false;
            },
            decrementIndentLevel: function () {
                if (currentIndentLevel > 0) {
                    currentIndentLevel--;
                }
            },

            toString: function () {
                return tokens.join('');
            }
        };
        return sb;
    };

    function appendMethodDeclarationJs(context: TranspileContext, methodDeclaration: MethodDeclaration) {
        var sb = context.sb;
        var isMainMethod = (methodDeclaration.methodType === 'Main');
        var hasReturnValue = !isMainMethod && methodDeclaration.methodType !== "Void";

        var methodParameterNames = methodDeclaration.methodParameters.map(function (methodParameter) {
            return methodParameter.name;
        });
        var escapedMethodParameterNames = methodParameterNames.map(function (parameterName) {
            return escapeVariableName(parameterName);
        });

        if (isMainMethod) {
            sb.append('(');
        }
        sb.append('function');
        if (methodDeclaration.name) {
            sb.append(' ');
            sb.append(escapeMethodName(methodDeclaration.name));
        }
        sb.append('(');
        sb.append(escapedMethodParameterNames.join(', '));
        sb.appendLine(') {');

        context.startMethod(methodDeclaration.name, hasReturnValue);
        for (let methodParameterName of methodParameterNames) {
            context.declareVariable(methodParameterName);
        }

        sb.appendLine('"use strict";');
        for (let statement of methodDeclaration.statements) {
            appendStatementJs(context, statement);
        }

        context.endMethod();

        sb.append('}');
        if (isMainMethod) {
            sb.append(')();');
        }
        sb.appendLine();
    }

    function appendStatementJs(context: TranspileContext, statement: Statement) {
        if (!statement) return;

        if (statement.statementType === "Condition") {
            appendConditionStatementJs(context, <ConditionStatement>statement);
        } else if (statement.statementType === "While") {
            appendWhileStatementJs(context, <WhileStatement>statement);
        } else if (statement.statementType === "Print") {
            appendPrintStatementJs(context, <PrintStatement>statement);
        } else if (statement.statementType === "DeclareInt") {
            appendDeclareIntStatementJs(context, <DeclareIntStatement>statement);
        } else if (statement.statementType === "AssignVariable") {
            appendAssignVariableStatementJs(context, <AssignVariableStatement>statement);
        } else if (statement.statementType === "CallMethod") {
            appendCallMethodStatementJs(context, <CallMethodStatement>statement);
        } else if (statement.statementType === "CallReadMethod") {
            appendCallReadMethodStatementJs(context, <CallReadMethodStatement>statement);
        }  else if (statement.statementType === "Return") {
            appendReturnStatementJs(context, <ReturnStatement>statement);
        }  else {
            throw new TranspileError('Unrecognized statement type: ' + statement.statementType);
        }
    }

    function appendConditionStatementJs(context: TranspileContext, statement: ConditionStatement): void {
        let sb = context.sb;

        sb.append('if (');
        appendOperandJs(context, statement.conditionOperand);
        sb.appendLine(') {');

        context.startBlock();
        for (let ifStatement of statement.ifBranchStatements) {
            appendStatementJs(context, ifStatement);
        }
        context.endBlock();
        sb.append('}');

        if (statement.elseBranchStatements && statement.elseBranchStatements.length > 0) {
            sb.appendLine(' else {');
            context.startBlock();
            for (let elseStatement of statement.elseBranchStatements) {
                appendStatementJs(context, elseStatement);
            }
            context.endBlock();
            sb.append('}');
        }
        sb.appendLine();
    }

    function appendWhileStatementJs(context: TranspileContext, statement: WhileStatement): void {
        let sb = context.sb;

        sb.append('while (');
        appendOperandJs(context, statement.operand);
        sb.appendLine(') {');

        context.startBlock();
        for (let childStatement of statement.statements) {
            appendStatementJs(context, childStatement);
        }
        context.endBlock();
        sb.appendLine('}');
    }

    function appendPrintStatementJs(context: TranspileContext, statement: PrintStatement): void {
        let sb = context.sb;
        sb.append('console.log(');
        appendOperandJs(context, statement.operand);
        sb.appendLine(');');
    }

    function appendDeclareIntStatementJs(context: TranspileContext, statement: DeclareIntStatement): void {
        let sb = context.sb;
        context.declareVariable(statement.variableName);
        sb.append('var ');
        sb.append(escapeVariableName(statement.variableName));
        if (statement.operand) {
            sb.append(' = ');
            appendOperandJs(context, statement.operand);
        }
        sb.appendLine(';');
    }

    function appendAssignVariableStatementJs(context: TranspileContext, statement: AssignVariableStatement): void {
        let sb = context.sb;

        context.referenceVariable(statement.variableName);
        let variableName = escapeVariableName(statement.variableName);

        // We need to go through each operation in the order given (all operators have equal precedence).
        // This could be done all in one line with a lot of parentheses, 
        // but that makes it harder to do special handling for things like division by zero.
        // So the current strategy is to do each operation on a separate line.

        // We only need a temp variable if there is at least one operation that 
        // uses the original variable value (because then we can't change the 
        // original variable until all operations are complete).
        let operations = statement.expression.operations;
        var isTempVarNeeded = (operations.length > 0 &&
            operations.filter(function (operation) {
                return (operation.operand.operandType === "Identifier" &&
                    (<IdentifierOperand>operation.operand).name === statement.variableName
                );
            }).length > 0
        );

        // The name of the temp variable doesn't really matter as long as it 
        // isn't a valid ArnoldC identifier (including what we escape variables to).
        // And it doesn't matter if we end up declaring the temp variable more than once 
        // (javascript doesn't care so neither do we).
        let tempVariableName = isTempVarNeeded ? "__temp" : variableName;

        if (isTempVarNeeded) {
            sb.append('var ');
        }
        sb.append(tempVariableName);
        sb.append(' = ');
        appendOperandJs(context, statement.expression.operand);
        sb.appendLine(';');

        for (let operation of statement.expression.operations) {
            let operator = operation.operator;
            if (operator === '==') {
                // Every ArnoldC variable should be a number, so it should 
                // be safe to use a strict equals.
                operator = '===';
            }

            // Need special handling for division to detect divide by zero errors.
            var isDivision = (operator === '/');

            sb.append(tempVariableName);
            sb.append(' = ');
            sb.append('(');
            sb.append(tempVariableName);
            sb.append(' ');
            sb.append(operator);
            sb.append(' ');
            appendOperandJs(context, operation.operand);
            if (!isDivision) {
                // Doing a bitwise and will convert the result to a signed 32-bit integer,
                // This should get us the overflow/underflow behaviour that we need
                // to match the real ArnoldC.
                sb.appendLine(')|0;');
            } else {
                sb.appendLine(');');

                // Dividing by zero should result in Infinity (no error),
                // But if we use a bitwise operation to change the result to a 32-bit signed int,
                // then Infinity will be converted to zero.
                // So we have to do the isFinite check before we do the int conversion.
                sb.append('if (!isFinite(');
                sb.append(tempVariableName);
                sb.appendLine(')) {');
                sb.incrementIndentLevel();
                sb.appendLine('throw new Error("HERE\'S YOUR SUBZERO, NOW PLAIN ZERO");');
                sb.decrementIndentLevel();
                sb.appendLine('}');

                sb.append(tempVariableName);
                sb.append(' = ');
                sb.append(tempVariableName);
                sb.appendLine('|0;');
            }
        }

        if (isTempVarNeeded) {
            sb.append(variableName);
            sb.append(' = ');
            sb.append(tempVariableName);
            sb.appendLine(';');

            sb.append(tempVariableName);
            sb.appendLine(' = undefined;');
        }
    }

    function appendCallMethodStatementJs(context: TranspileContext, statement: CallMethodStatement): void {
        let sb = context.sb;
        if (statement.assignVariableName) {
            sb.append(escapeVariableName(statement.assignVariableName));
            sb.append(' = ');
        }
        sb.append(escapeMethodName(statement.methodName));
        sb.append('(');

        for (let i = 0; i < statement.methodArguments.length; i++) {
            if (i > 0) {
                sb.append(', ')
            }

            let operand = statement.methodArguments[i];
            appendOperandJs(context, operand);
        }
        sb.appendLine(');');
    }

    function appendCallReadMethodStatementJs(context: TranspileContext, statement: CallReadMethodStatement) {
        let sb = context.sb;
        context.referenceVariable(statement.assignVariableName);

        let escapedVariableName = escapeVariableName(statement.assignVariableName);
        sb.append(escapedVariableName);
        sb.append(' = ');
        sb.appendLine('prompt();');

        // We need to match the behaviour of java.util.Scanner.nextInt().
        // It stops parsing when it hits whitespace, but seems to ignore leading whitespace.
        sb.append('if (/^\\s*[-+]?[0-9]+(\\s|$)/.test(');
        sb.append(escapedVariableName);
        sb.appendLine(') === false) {');
        sb.incrementIndentLevel();
        sb.append('throw new SyntaxError("input \\"" + ');
        sb.append(escapedVariableName);
        sb.appendLine(' + "\\" is not a number");');
        sb.decrementIndentLevel();
        sb.appendLine('}');

        // The parseInt method will ignore any non-numeric suffix on the string,
        // which means it will should ignore anything after non-leading whitespace.
        // So that works out nicely for matching java.util.Scanner.
        sb.append(escapedVariableName);
        sb.append(' = parseInt(');
        sb.append(escapedVariableName);
        sb.appendLine(', 10);');

        // We actually need to throw an error if the value is out of range, 
        // not just overflow/ underflow like we normally would.
        sb.append('if (');
        sb.append(escapedVariableName);
        sb.append(' > 2147483647 || ');
        sb.append(escapedVariableName);
        sb.appendLine(' < -2147483648) {');
        sb.incrementIndentLevel();
        sb.appendLine('throw new RangeError("input is out of range for a 32-bit signed integer");');
        sb.decrementIndentLevel();
        sb.appendLine('}');
    }

    function appendReturnStatementJs(context: TranspileContext, statement: ReturnStatement): void {
        let sb = context.sb;
        context.declareReturnStatement(statement.operand);

        sb.append('return');
        if (statement.operand) {
            sb.append(' ');
            appendOperandJs(context, statement.operand);
        }
        sb.appendLine(';');
    }

    function appendOperandJs(context: TranspileContext, operand: Operand): void {
        if (!operand) return;

        if (operand.operandType === "Literal") {
            appendIdentifierLiteralJs(context, <LiteralOperand>operand);
        } else if (operand.operandType === "Identifier") {
            appendIdentifierOperandJs(context, <IdentifierOperand>operand);
        } else {
            throw new TranspileError('Unrecognized operand type: ' + operand.operandType);
        }
    }

    function appendIdentifierLiteralJs(context: TranspileContext, operand: LiteralOperand): void {
        let sb = context.sb;
        if (operand.valueType === 'int') {
            let valueInt = <number>operand.value;
            if (valueInt > 32767 || valueInt < -32768) {
                valueInt = convertNumberTo16BitSignedInteger(valueInt);
            }
            sb.append(valueInt.toString());
        } else if (operand.valueType === 'bool') {
            sb.append((<boolean>operand.value) ? '1' : '0');
        } else if (operand.valueType === 'string') {
            sb.append('"');
            sb.append(escapeDoubleQuotedString(<string>operand.value));
            sb.append('"');
        } else {
            throw new TranspileError('Unrecognized literal value type: ' + operand.valueType);
        }
    }

    function appendIdentifierOperandJs(context: TranspileContext, operand: IdentifierOperand): void {
        context.referenceVariable(operand.name);
        context.sb.append(escapeVariableName(operand.name));
    }

    function convertNumberTo16BitSignedInteger(value: number): number {
        // There's probably some fancier way to do this with bitwise operations,
        // but this should at least get the right value?  Hopefully...
        if (value > 32767 || value < -32768) {
            value = (modFixed((value + 32768), 65536) - 32768);
        }
        return value;
    }

    function modFixed(n: number, m: number): number {
        // Javascript mod can return a negative number, this avoids that problem.
        return ((n % m) + m) % m;
    };

    function escapeDoubleQuotedString(str: string): string {
        if (!str) return str;

        // An ArnoldC string can contain anything except a double quote or a backslash.
        // But some of that isn't valid in a javascript string, 
        // so we might have to do some escaping...
        var escapedString = str
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n')
            //.replace(/\\/g, '\\\\"')
            //.replace(/"/g, '\\"');
        return escapedString;
    }

    function escapeMethodName(methodName: string): string {
        // If we tried to use a javascript reserved word as a variable or method name,
        // then we would get a runtime error.  So we have to do something to avoid that.
        const reservedWords = [
            'break', 'default', 'function', 'return', 'var',
            'case', 'delete', 'if', 'switch', 'void',
            'catch', 'do', 'in', 'this', 'while',
            'const', 'else', 'instanceof', 'throw', 'with',
            'continue', 'finally', 'let', 'try', 'debugger',
            'for', 'new', 'typeof'
        ];
        if (reservedWords.indexOf(methodName) >= 0) {
            // We can get around the reserved keyword restriction by using a unicode escape sequence 
            // for a character in the method name.
            // This would allow us to avoid changing the actual value of the method name 
            // in case some other library might try using the method.
            let prefix = methodName.substr(0, methodName.length - 1);
            let suffix = '\\u' + ('0000' + methodName.charCodeAt(methodName.length - 1).toString(16)).slice(-4);
            methodName = prefix + suffix;
        }
        return methodName;
    }

    function escapeVariableName(variableName: string): string {
        // In ArnoldC, a method and a variable can have the same name.
        // But in javascript, a variable with the same name as a method will hide that method.
        // And the method could be declared either before or after the variable (or not at all),
        // which makes it more complicated to deal with conditional escaping.
        //
        // So at least for now, we'll just escape all variable names with some prefix.
        // The prefix can be any valid javascript variable name as long as it contains 
        // a character that isn't allowed in an ArnoldC variable name 
        // (like an underscore, dollar sign, or unicode escape sequence).
        return '_' + variableName;
    };
}