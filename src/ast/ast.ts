import { Token } from "../token/token";

interface Node {
  tokenLiteral(): string;
}

export interface Statement {
  node: Node;
  statementNode(): void;
  tokenLiteral(): string;
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
  token!: Token;
  value!: string;
  constructor(props?: { token?: Token; value?: string }) {
    if (props) {
      if (props.token != undefined) this.token = props.token;
      if (props.value != undefined) this.value = props.value;
    }
  }

  expressionNode(): void {
    throw new Error("Method not implemented.");
  }
  tokenLiteral(): string {
    if(this.token != undefined) {
        return this.token.literal;
    }
    return "";
  }
}

export class LetStatement implements Statement {
  node!: Node;
  token!: Token;
  name!: Identifier;
  value!: Expression;

  constructor(props: { token?: Token; name?: Identifier; value?: Expression }) {
    if (props.token) this.token = props.token;
    if (props.name) this.name = props.name;
    if (props.value) this.value = props.value;
  }

  statementNode(): void {
    throw new Error("Method not implemented.");
  }
  tokenLiteral(): string {
      return this.token.literal;
  }
}
