import { Token } from "../token/token";

interface Node {
  tokenLiteral(): string ;
}

export interface Statement {
  node: Node;
  statementNode(): void;
  tokenLiteral(): string ;
}

interface Expression {
  node: Node;
  expressionNode(): void;
}

export class Program {
  public statements: Statement[] = [];

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].node.tokenLiteral();
    } else {
      return "";
    }
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
}

export class LetStatement implements Statement {
  node!: Node;
  private token!: Token;
  private name!: Identifier;
  private value!: Expression | null;

  constructor({
    token,
    name,
    value,
  }: {
    token: Token;
    name: Identifier;
    value: Expression | null;
  }) {
    this.token = token;
    this.name = name;
    this.value = value;
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
}    


export class ReturnStatement implements Statement {
    node!: Node;
    token!: Token;
    returnValue: Expression | null;
    constructor( returnValue : Expression) {
        this.returnValue = returnValue
    }

    statementNode() {}

    tokenLiteral() : string{
        return this.token.literal;
    }
}
