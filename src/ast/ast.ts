import { Token } from "../token/token";

interface Node {
  tokenLiteral(): string;
  toString(): string;
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
  getValue(): any; //basically anything that's not an array
  tokenLiteral(): string;
}

export class Program implements Node {
  public statements: Statement[] = [];
  constructor(statements?: Statement[]) {
    if (statements) this.statements = statements;
  }

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].node.tokenLiteral();
    } else {
      return "";
    }
  }
  toString(): string {
    let out = "";
    for (let i = 0; i < this.statements.length; ++i) {
      out += this.statements[i].toString();
    }
    return out;
  }
}

export class Identifier implements Node {
  private token!: Token;
  private value!: string;
  constructor({ token, value }: { token: Token; value: string }) {
    this.token = token;
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
  toString(): string {
    return this.value;
  }
}

export class LetStatement implements Node, Statement {
  node!: Node;
  private token!: Token;
  private name!: Identifier;
  private value!: Expression | Identifier | null;

  getExpression(): Expression | null {
    if (!(this.value instanceof Identifier)) {
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
  toString(): string {
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

export class ReturnStatement implements Statement, Node {
  node!: Node;
  token!: Token;
  returnValue: Expression | null = null;
  constructor({
    token,
    returnValue,
  }: {
    token: Token;
    returnValue?: Expression | null;
  }) {
    this.token = token;
    if (returnValue) this.returnValue = returnValue;
  }

  getExpression(): Expression | null {
    return this.returnValue;
  }
  statementNode() {}

  tokenLiteral(): string {
    return this.token.literal;
  }
  toString(): string {
    let out = "";
    out += this.tokenLiteral() + " ";
    if (this.returnValue) {
      out += this.returnValue.toString();
    }

    out += ";";
    return out;
  }
}

export class ExpressionStatement implements Statement, Node {
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

  setExpression(exp: Expression) {
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

export class IntegerLiteral implements Node, Expression {
  node!: Node;
  token: Token = { type: "INT", literal: "" };
  value!: number; // assigned later, so that the parser can catch and take care of any errors at this stage

  constructor({ token }: { token: Token }) {
    this.token = token;
  }

  setValue(value: number) {
    this.value = value;
  }
  tokenLiteral() {
    return this.token.literal;
  }
  toString() {
    return this.token.literal;
  }
  getValue() {
    return this.value;
  }
  expressionNode() {
    throw new Error("Method not implemented.");
  }
}


export class PrefixExpression implements Node, Expression {
  node! : Node;
  token: Token;
  operator: string;
  right!: Expression;
  constructor({token, operator}: {token: Token, operator: string}) {
    this.token = token;
    this.operator = operator;
  }
  getValue() {
    // not sure about this
    return this.right;
  }
  setRight(right : Expression) {
    this.right = right;
  }

  tokenLiteral() {
    return this.token.literal;
  }
  toString() {
    let out = "";

    out += "(";
    out += this.operator;
    out += this.right.toString();
    out += ")";

    return out;
  }
  expressionNode() {
    throw new Error("Method not implemented.");
  }
}
