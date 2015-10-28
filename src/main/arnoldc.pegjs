Root = AbstractMethod*

BeginMain = "IT'S SHOWTIME"
EndMain = "YOU HAVE BEEN TERMINATED"
DeclareMethod = "LISTEN TO ME VERY CAREFULLY"
EndMethodDeclaration = "HASTA LA VISTA, BABY"
DeclareInt = "HEY CHRISTMAS TREE"
DeclareNumber = "REPLACE WITH ARNOLD QUOTE"
SetInitialValue = "YOU SET US UP"
PlusOperator = "GIVE YOU A LIFT"
PlusOperatorDeprecated = "GET UP"
MinusOperator = "GET DOWN"
MultiplicationOperator = "YOU'RE FIRED"
DivisionOperator = "HE HAD TO SPLIT"
Print = "TALK TO THE HAND"
Read = "I WANT TO ASK YOU A BUNCH OF QUESTIONS AND I WANT TO HAVE THEM ANSWERED IMMEDIATELY"
AssignVariable = "GET TO THE CHOPPER"
SetValue = "HERE IS MY INVITATION"
EndAssignVariable = "ENOUGH TALK"
False = "I LIED"
True = "NO PROBLEMO"
EqualTo = "YOU ARE NOT YOU YOU ARE ME"
GreaterThan = "LET OFF SOME STEAM BENNET"
Or = "CONSIDER THAT A DIVORCE"
And = "KNOCK KNOCK"
If = "BECAUSE I'M GOING TO SAY PLEASE"
Else = "BULLSHIT"
EndIf = "YOU HAVE NO RESPECT FOR LOGIC"
While = "STICK AROUND"
EndWhile = "CHILL"
MethodArguments = "I NEED YOUR CLOTHES YOUR BOOTS AND YOUR MOTORCYCLE"
Return = "I'LL BE BACK"
CallMethod = "DO IT NOW"
NonVoidMethod = "GIVE THESE PEOPLE AIR"
AssignVariableFromMethodCall = "GET YOUR ASS TO MARS"
Modulo = "I LET HIM GO"

AbstractMethod
	= method:(MainMethod / Method) EOL? {
		return method
	}

MainMethod 
	= BeginMain EOL statements:(StatementBase*) EndMain { 
		return { 
			methodType: "Main",
			name: null,
			methodParameters: [],
			statements: statements
		}
	}

Method
	= DeclareMethod WhiteSpace name:VariableName EOL
	methodParameters: (MethodArguments WhiteSpace variable:Variable EOL { return variable})*
	returnsValue:(NonVoidMethod EOL)?
	statements:(Statement*)
	EndMethodDeclaration
	{ 
		return { 
			methodType: returnsValue ? "NonVoid" : "Void",
			name: name,
			methodParameters: methodParameters,
			statements: statements
		}
	}

Statement 
	= StatementBase 
	/ ReturnStatement

StatementBase
	= DeclareIntStatement
	/ DeclareNumberStatement
	/ PrintStatement
	/ AssignVariableStatement
	/ ConditionStatement
	/ WhileStatement
	/ CallMethodStatement
	/ CallReadMethodStatement
	
DeclareIntStatement
	= DeclareInt WhiteSpace variableName:VariableName EOL SetInitialValue WhiteSpace operand:Operand EOL { 
		return { statementType: "DeclareInt", variableName: variableName, operand: operand  } 
	}

DeclareNumberStatement
	= DeclareNumber WhiteSpace variableName:VariableName EOL SetInitialValue WhiteSpace operand:Operand EOL { 
		return { statementType: "DeclareNumber", variableName: variableName, operand: operand  } 
	}

PrintStatement
	= Print WhiteSpace operand:(Operand / String) EOL { 
		return { statementType: "Print", operand: operand } 
	}

AssignVariableStatement
	= AssignVariable WhiteSpace variableName:VariableName EOL expression:Expression EndAssignVariable EOL { 
		return { statementType: "AssignVariable", variableName: variableName, expression: expression } 
	}

ConditionStatement
	= If WhiteSpace conditionOperand:Operand EOL 
	ifBranchStatements:(Statement*)
	elseBranchStatements: (Else EOL statements:(Statement*) { 
		return statements 
	})?
	EndIf EOL 
	{ 
		return { 
			statementType: "Condition", 
			conditionOperand: conditionOperand, 
			ifBranchStatements: ifBranchStatements, 
			elseBranchStatements: elseBranchStatements 
		} 
	}

WhileStatement
	= While WhiteSpace operand:Operand EOL statements:(Statement*) EndWhile EOL { 
		return { statementType: "While", operand: operand, statements: statements } 
	}

CallMethodStatement
	= assignVariableName:(AssignVariableFromMethodCall WhiteSpace variableName:VariableName EOL { return variableName})?
	 CallMethod WhiteSpace methodName:VariableName methodArguments:(((WhiteSpace operand:Operand) { return operand })*) EOL { 
		return { statementType: "CallMethod", assignVariableName: assignVariableName, methodName: methodName, methodArguments: methodArguments }
	}

CallReadMethodStatement
	= assignVariableName:(AssignVariableFromMethodCall WhiteSpace variableName:VariableName EOL { return variableName})?
	CallMethod EOL Read EOL {
		return { statementType: "CallReadMethod", assignVariableName: assignVariableName }
	}

ReturnStatement
	= Return operand:(WhiteSpace operand:Operand { return operand })? EOL { 
		return { statementType: "Return", operand: operand }
	}

Expression
	= operand:(SetValue WhiteSpace operand:Operand EOL { return operand })
	operations:(ArithmeticOperation / LogicalOperation)* {
		return { operand: operand, operations: operations }
	}

ArithmeticOperation
	= (PlusOperator / PlusOperatorDeprecated) WhiteSpace operand:Operand EOL { return { operationType: "arithmetic", operator: "+", operand: operand }} 
	/ MinusOperator  WhiteSpace operand:Operand EOL { return { operationType: "arithmetic", operator: "-", operand: operand }}
	/ MultiplicationOperator  WhiteSpace operand:Operand EOL { return { operationType: "arithmetic", operator: "*", operand: operand }}
	/ DivisionOperator   WhiteSpace operand:Operand EOL { return { operationType: "arithmetic", operator: "/", operand: operand }}
	/ Modulo  WhiteSpace operand:Operand EOL { return { operationType: "arithmetic", operator: "%", operand: operand }}

LogicalOperation
	= Or WhiteSpace operand:Operand EOL { return { operationType: "logical", operator: "||", operand: operand } }
	/ And WhiteSpace operand:Operand EOL { return { operationType: "logical", operator: "&&", operand: operand } }
	/ EqualTo WhiteSpace operand:Operand EOL { return { operationType: "logical", operator: "==", operand: operand }}
	/ GreaterThan WhiteSpace operand:Operand EOL { return { operationType: "logical", operator: ">", operand: operand }}

Operand
	= Number / Variable / Integer / Boolean

Variable
	= VariableName { 
		return { operandType: "Identifier", name: text() } 
	}

VariableName
	= [A-Za-z] [A-Za-z0-9]* { 
		return text() 
	}

Integer
	= '-'? [0-9]+ { 
		return { operandType: "Literal", valueType: 'int', value: parseInt(text(), 10) } 
	}

Boolean
	= ('@' True) { return { operandType: "Literal", valueType: 'bool', value: true } }
	/ ('@' False) { return { operandType: "Literal", valueType: 'bool', value: false } }

Number
	= [0-9]* '.' [0-9]* {
		return { operandType: "Literal", valueType: 'number', value: parseFloat(text())}
	}

String
	= value:StringValue { 
		return { operandType: "Literal", valueType: 'string', value: value } 
	}

StringValue
	= '"' chars:(Char*) '"' { return chars.join("") }

Char
	=  [^"\\]
//	/ "\\" sequence:(
//		'"'
//		/ "\\"
//	) { return sequence }

EOL = [\r\t ]* [\n] [\r\n\t ]* { return null }
WhiteSpace = [ \t]* { return null }
