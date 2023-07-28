import * as ast from '../ast/ast';
import * as lexer from '../lexer/lexer';
import { expect, test } from '@jest/globals';
import * as parser from '../parser/parser';
import * as token from '../token/token';

test('Let statements', () => {
  let input = `
    let x = 5;
    let y = 10;
    let foobar = 838383;
    `;

  let lex = new lexer.Lexer(input);
  let pars = new parser.Parser(lex);

  let program = pars.parseProgram();

  if (!program) {
    throw new Error('program is null');
  }

  let testCases = [
    { expectedIdentifier: 'x' },
    { expectedIdentifier: 'y' },
    { expectedIdentifier: 'foobar' },
  ];

  for (let i = 0; i < testCases.length; ++i) {
    let stmt = program.statements[i];
    if (!testLetStatement(stmt, testCases[i].expectedIdentifier)) {
      return;
    }
  }

  function testLetStatement(stmt: ast.Statement, name: string): boolean {
    checkParserErrors(pars);
    if (stmt.tokenLiteral() !== 'let') {
      expect(stmt.tokenLiteral()).toBe('let');
      throw new Error("s.tokenLiteral not 'let'. got=" + stmt.tokenLiteral());
    }

    if (stmt instanceof ast.LetStatement) {
      if (stmt.getName().getValue() !== name) {
        expect(stmt.getName().getValue()).toBe(name);
        throw new Error(
          "letStmt.name.value not '" +
            name +
            "'. got=" +
            stmt.getName().getValue(),
        );
      }
      if (stmt.getName().tokenLiteral() !== name) {
        expect(stmt.getName().tokenLiteral()).toBe(name);
        throw new Error(
          "letStmt.name.tokenLiteral() not '" +
            name +
            "'. got=" +
            stmt.getName().tokenLiteral(),
        );
      }
    } else {
      throw new Error('s not ast.LetStatement. got=' + stmt.constructor.name);
    }

    return true;
  }
});

function checkParserErrors(pars: parser.Parser) {
  if (pars.getErrors().length == 0) {
    return;
  }

  let errors: string = pars.getErrors().join('\n');
  throw new Error(
    'Parser has ' + pars.getErrors().length + ' errors: \n' + errors,
  );
}

test('Return statements', () => {
  let input = ` 
  return 5;
  return 10;
  return 993322;
  `;

  let lex = new lexer.Lexer(input);
  let pars = new parser.Parser(lex);

  let program = pars.parseProgram();
  checkParserErrors(pars);

  if (program.statements.length !== 3) {
    expect(program.statements.length).toBe(3);
    throw new Error(
      'program.statements does not contain 3 statements. got:' +
        program.statements.length,
    );
  }

  for (let statement of program.statements) {
    if (statement instanceof ast.ReturnStatement) {
      if (statement.tokenLiteral() !== 'return') {
        expect(statement.tokenLiteral()).toBe('return');
        throw new Error(
          "returnStmt.tokenLiteral not 'return', got " +
            statement.tokenLiteral(),
        );
      }
    }
  }
});

test('Identifier Expression', () => {
  let input = 'foobar;';

  let lex = new lexer.Lexer(input);
  let pars = new parser.Parser(lex);
  let program = pars.parseProgram();
  checkParserErrors(pars);

  if (program.statements.length !== 1) {
    expect(program.statements.length).toBe(1);
    throw new Error(
      'program.statements does not contain 1 statements. got:' +
        program.statements.length,
    );
  }

  let stmt = program.statements[0];
  expect(stmt).toBeInstanceOf(ast.ExpressionStatement);

  if (stmt.getExpression() instanceof ast.Identifier) {
    let ident = stmt.getExpression();

    if (!ident) {
      throw new Error('ident is null');
    }

    if (ident.getValue() !== 'foobar') {
      expect(ident.getValue()).toBe('foobar');
      throw new Error('ident.value not foobar. got=' + ident.getValue());
    }

    if (ident.tokenLiteral() !== 'foobar') {
      expect(ident.tokenLiteral()).toBe('foobar');
      throw new Error(
        'ident.tokenLiteral not foobar. got=' + ident.tokenLiteral(),
      );
    }
  }
});

test('toString() functions', () => {
  let letStmt = new ast.LetStatement({
    token: { type: token.TokenType.LET, literal: 'let' },
    name: new ast.Identifier({
      token: { type: token.TokenType.IDENT, literal: 'myVar' },
      value: 'myVar',
    }),
    value: new ast.Identifier({
      token: { type: token.TokenType.IDENT, literal: 'anotherVar' },
      value: 'anotherVar',
    }),
  });

  let program = new ast.Program([letStmt]);

  expect(program.toString()).toEqual('let myVar = anotherVar;');
  if (program.toString() !== 'let myVar = anotherVar;') {
    throw new Error('program.toString() wrong. got=' + program.toString());
  }
});

test('Test integer literal expression ', () => {
  let input = '5;';

  let lex = new lexer.Lexer(input);
  let pars = new parser.Parser(lex);

  let program = pars.parseProgram();
  checkParserErrors(pars);

  if (program.statements.length !== 1) {
    expect(program.statements.length).toBe(1);
    throw new Error(
      'program.statements does not contain 1 statements. got:' +
        program.statements.length,
    );
  }

  let stmts = program.statements[0];

  if (!(stmts instanceof ast.ExpressionStatement)) {
    throw new Error(
      'stmts not ast.ExpressionStatement. got=' + stmts.constructor.name,
    );
  }

  let literal = stmts.getExpression();
  if (!literal) {
    throw new Error(' statements.getExpression() returned null value');
  }

  if (!(literal instanceof ast.IntegerLiteral)) {
    throw new Error(
      'exp not ast.IntegerLiteral. got=' + literal.constructor.name,
    );
  }

  if (literal.getValue() !== 5) {
    expect(literal.getValue()).toBe(5);
    throw new Error('literal.value not 5. got=' + literal.getValue());
  }

  if (literal.tokenLiteral() !== '5') {
    expect(literal.tokenLiteral()).toBe('5');
    throw new Error(
      "literal.tokenLiteral not '5'. got=" + literal.tokenLiteral(),
    );
  }
});

test(' Parsing prefix operators', () => {
  let prefixTests: {
    input: string;
    operator: string;
    integerValue: number;
  }[] = [
    { input: '!5;', operator: '!', integerValue: 5 },
    { input: '-15;', operator: '-', integerValue: 15 },
  ];

  for (let test of prefixTests) {
    console.log('testing prefix operator: ' + test.input);
    let lex = new lexer.Lexer(test.input);
    let pars = new parser.Parser(lex);
    let program = pars.parseProgram();
    checkParserErrors(pars);

    if (program.statements.length > 1) {
      expect(program.statements.length).toBe(1);
      throw new Error(
        'program.statements does not contain 1 statements. got:' +
          program.statements.length,
      );
    }

    let stmt = program.statements[0];
    if (!(stmt instanceof ast.ExpressionStatement)) {
      expect(stmt).toBeInstanceOf(ast.ExpressionStatement);
      throw new Error(
        'statements not ast.ExpressionStatement got=' + stmt.constructor.name,
      );
    }

    let exp = stmt.getExpression();
    if (!exp) {
      throw new Error('stmt.getExpression() returned null value');
    }
    if (!(exp instanceof ast.PrefixExpression)) {
      expect(exp).toBeInstanceOf(ast.IntegerLiteral);
      throw new Error(
        'exp not ast.IntegerLiteral. got=' + exp.constructor.name,
      );
    }

    //real tests
    if (exp.operator != test.operator) {
      expect(exp.operator).toBe(test.operator);
      throw new Error(
        ' Expected exp.operator to be ' +
          test.operator +
          'got :' +
          exp.operator,
      );
    }

    if (!testIntegerLiteral(exp.right, test.integerValue)) {
      throw new Error('testIntegerLiteral failed');
    }
  }
});

function testIntegerLiteral(right: ast.Expression, testValue: number): boolean {
  if (!(right instanceof ast.IntegerLiteral)) {
    throw new Error(
      'right not ast.IntegerLitera. got: ' + right.constructor.name,
    );
  }

  if (right.getValue() !== testValue) {
    expect(right.getValue()).toBe(testValue);
    throw new Error(
      'right.value not ' + testValue + '. got=' + right.getValue(),
    );
  }

  if (right.tokenLiteral() !== testValue.toString()) {
    expect(right.tokenLiteral()).toBe(testValue.toString());
    throw new Error(
      'right.tokenLiteral not ' + testValue + '. got=' + right.tokenLiteral(),
    );
  }
  return true;
}

test('Parsing infix expressions', () => {
  let infixTests: {
    input: string;
    leftValue: number;
    operator: string;
    rightValue: number;
  }[] = [
    { input: '5 + 5;', leftValue: 5, operator: '+', rightValue: 5 },
    { input: '5 - 5;', leftValue: 5, operator: '-', rightValue: 5 },
    { input: '5 * 5;', leftValue: 5, operator: '*', rightValue: 5 },
    { input: '5 / 5;', leftValue: 5, operator: '/', rightValue: 5 },
    { input: '5 > 5;', leftValue: 5, operator: '>', rightValue: 5 },
    { input: '5 < 5;', leftValue: 5, operator: '<', rightValue: 5 },
    { input: '5 == 5;', leftValue: 5, operator: '==', rightValue: 5 },
    { input: '5 != 5;', leftValue: 5, operator: '!=', rightValue: 5 },
  ];

  for (let test of infixTests) {
    let lex = new lexer.Lexer(test.input);

    let pars = new parser.Parser(lex);
    let program = pars.parseProgram();
    checkParserErrors(pars);

    if (program.statements.length > 1) {
      expect(program.statements.length).toBe(1);
      throw new Error(
        'program.statements does not contain 1 statements. got:' +
          program.statements.length,
      );
    }

    let stmt = program.statements[0];
    if (!(stmt instanceof ast.ExpressionStatement)) {
      expect(stmt).toBeInstanceOf(ast.ExpressionStatement);
      throw new Error(
        'statements not ast.ExpressionStatement got=' + stmt.constructor.name,
      );
    }

    let exp = stmt.getExpression();
    if (!exp) {
      throw new Error('stmt.getExpression() returned null');
    }
    if (!(exp instanceof ast.InfixExpression)) {
      expect(exp).toBeInstanceOf(ast.InfixExpression);
      throw new Error(
        'exp not ast.InfixExpression. got=' + exp.constructor.name,
      );
    }

    if (!testIntegerLiteral(exp.left, test.leftValue)) {
      throw new Error('testIntegerLiteral failed');
    }
  }
});
