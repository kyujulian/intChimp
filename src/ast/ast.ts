import { Token } from "../token/token";

interface Node {
    tokenLiteral() : string,
}

interface Statement {
    node : Node,
    statementNode() : void,
}

interface Expression {
    node : Node,
    expressionNode(): void,
}


class Program {
    public statements : Statement[] = [];


    tokenLiteral() : string {
        if (this.statements.length > 0) {
            return this.statements[0].node.tokenLiteral();
        } else {
            return "";
        }
    }
}


class Identifier {
    token! : Token ;
    value!: string;

    expressionNode(): void {
        throw new Error("Method not implemented.");
    }
    tokenLiteral() : string {
        return this.token.literal;
    }
}

class LetStatement {
    token! : Token;
    name!: Identifier;
    value!: Expression;



    statementNode() : void {
        throw new Error("Method not implemented.");
    }
    tokenLiteral() : string {
        return this.token.literal;
    }
}




