import { Token } from "../token/token";

interface Node {
  tokenLiteral(): string;
  toString() : string;
}

export interface Statement {
  node: Node;
  statementNode(): void;
  tokenLiteral(): string;
  getExpression(): Expression | null;
}

export interface Expression {
  node: Node;
  expressionNode(): void;
  getValue(): string;
  tokenLiteral() : string;
}

export class Program {
  public statements: Statement[] = [];
  constructor(statements?: Statement[]) {
    if (statements)
      this.statements = statements;
  }

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].node.tokenLiteral();
    } else {
      return "";
    }
  }
  toString() : string {
    let out = "";
    for(let i = 0; i < this.statements.length; ++i) {
        out += this.statements[i].toString();
    }
    return out;
  }
}

export class Identifier {
  private token!: Token;
  private value!: string;
  constructor(name: Token, value: string) {
    this.token = name;
    this.value = value;
  }

  getValue() {
    return this.value;
  }
  expressionNode(): void {
    throw new Error("Method not implemented.");
  }
  tokenLiteral(): string {
    return this.token.literal;
  }
  toString() : string {
    return this.value;
  }
}

export class LetStatement implements Statement {
  node!: Node;
  private token!: Token;
  private name!: Identifier;
  private value!: Expression | Identifier | null ;

  getExpression() : Expression | null {
    if (! (this.value instanceof Identifier)) {
      return this.value;
    }
    return null;
  }

  constructor({
    token,
    name,
    value,
  }: {
    token: Token;
    name: Identifier;
    value: Expression | Identifier | null;
  }) {
    this.token = token;
    this.name = name;
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getName() {
    return this.name;
  }
  setName(name: Identifier) {
    this.name = name;
  }

  statementNode(): void {
    throw new Error("Method not implemented.");
  }
  tokenLiteral(): string {
    return this.token.literal;
  }
  toString() : string {
        let out = "";
        out += this.tokenLiteral() + " ";
        out += this.name.toString();
        out += " = ";

        if (this.value) {
            out += this.value.toString();
        }
        out += ";";
        return out;
  }
}

export class ReturnStatement implements Statement {
  node!: Node;
  token!: Token;
  returnValue: Expression | null = null;
  constructor({token,returnValue}: {
    token: Token;
    returnValue?: Expression | null;
  }) {
    this.token = token;
    if (returnValue) this.returnValue = returnValue;
  }


  getExpression() : Expression | null {
    return this.returnValue;
  }
  statementNode() {}

  tokenLiteral(): string {
    return this.token.literal;
  }
  toString() : string {
    let out = "";
    out += this.tokenLiteral() + " ";
    if (this.returnValue) {
        out += this.returnValue.toString();
    }

    out += ";";
    return out;
  }
}


export class ExpressionStatement implements Statement {
  node!: Node;
  token: Token;
  expression: Expression | null = null;
  constructor({
    token: token,
    expression: expression,
  }: {
    token: Token;
    expression: Expression | null;
  }) {
    this.token = token;
    this.expression = expression;
  }

  setExpression( exp: Expression) {
    this.expression = exp;
  }

  statementNode() {}
  getExpression(): Expression | null {
    return this.expression;
   }
  tokenLiteral(): string {
    return this.token.literal;
  }
  toString(): string {
    if (this.expression) {
      return this.expression.toString();
    }
    return "";
  }
}