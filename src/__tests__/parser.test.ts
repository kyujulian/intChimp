import * as ast from "../ast/ast";
import * as lexer from "../lexer/lexer";
import { expect, test } from "@jest/globals";
import * as parser from "../parser/parser";
import * as token from "../token/token";

test("Let statements", () => {
  let input = `
    let x = 5;
    let y = 10;
    let foobar = 838383;
    `;

  let lex = new lexer.Lexer(input);
  let pars = new parser.Parser(lex);

  let program = pars.parseProgram();

  if (!program) {
    throw new Error("program is null");
  }

  let testCases = [
    { expectedIdentifier: "x" },
    { expectedIdentifier: "y" },
    { expectedIdentifier: "foobar" },
  ];

  for (let i = 0; i < testCases.length; ++i) {
    let stmt = program.statements[i];
    if (!testLetStatement(stmt, testCases[i].expectedIdentifier)) {
      return;
    }
  }

  function testLetStatement(stmt: ast.Statement, name: string): boolean {

    checkParserErrors(pars);
    if (stmt.tokenLiteral() !== "let") {
      expect(stmt.tokenLiteral()).toBe("let");
      throw new Error("s.tokenLiteral not 'let'. got=" + stmt.tokenLiteral());
    }

    if (stmt instanceof ast.LetStatement) {
      if (stmt.getName().getValue() !== name) {
        expect(stmt.getName().getValue()).toBe(name);
        throw new Error(
          "letStmt.name.value not '" +
            name +
            "'. got=" +
            stmt.getName().getValue()
        );
      }
      if (stmt.getName().tokenLiteral() !== name) {
        expect(stmt.getName().tokenLiteral()).toBe(name);
        throw new Error(
          "letStmt.name.tokenLiteral() not '" +
            name +
            "'. got=" +
            stmt.getName().tokenLiteral()
        );
      }
    } else {
      throw new Error("s not ast.LetStatement. got=" + stmt.constructor.name);
    }

    return true;
  }
});


function checkParserErrors(pars : parser.Parser) {
  if (pars.getErrors().length == 0 ) {
    return;
  }

  let errors : string = pars.getErrors().join("\n");
  throw new Error("Parser has " + pars.getErrors().length + " errors: \n" + errors)
}


test("Return statements", () => {
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
      "program.statements does not contain 3 statements. got:" +
        program.statements.length
    );
  }

  for (let statement of program.statements) {
    if ( statement instanceof ast.ReturnStatement) {
      if (statement.tokenLiteral() !== "return") {
        expect(statement.tokenLiteral()).toBe("return");
        throw new Error(
          "returnStmt.tokenLiteral not 'return', got " +
            statement.tokenLiteral()
        );
      }
    }
  }
});


test("Identifier Expression", () => {
  let input = "foobar;";


  let lex = new lexer.Lexer(input);
  let pars = new parser.Parser(lex);
  let program = pars.parseProgram();
  checkParserErrors(pars);


  if (program.statements.length !== 1) {
    expect(program.statements.length).toBe(1);
    throw new Error(
      "program.statements does not contain 1 statements. got:" +
        program.statements.length
    );
  }

  let stmt = program.statements[0];
  expect(stmt).toBeInstanceOf(ast.ExpressionStatement);

  if (stmt.getExpression() instanceof ast.Identifier) {

    let ident = stmt.getExpression();

    if (!ident) {
      throw new Error( "ident is null");
    }

    if (ident.getValue() !== "foobar") {
      expect(ident.getValue()).toBe("foobar");
      throw new Error(
        "ident.value not foobar. got=" + ident.getValue()
      );
    }

    if (ident.tokenLiteral() !== "foobar") {
      expect(ident.tokenLiteral()).toBe("foobar");
      throw new Error(
        "ident.tokenLiteral not foobar. got=" + ident.tokenLiteral()
      );
    }
  }

})


test( "Strings " , () => {

  let letStmt = new ast.LetStatement({
    token: { type: token.TokenType.LET , literal: "let"},
    name: new ast.Identifier({token: { type: token.TokenType.IDENT, literal: "myVar"}, value: "myVar"}),
    value: new ast.Identifier({token: { type: token.TokenType.IDENT, literal: "anotherVar"}, value: "anotherVar"})
  });

  let program = new ast.Program([letStmt]);

  expect(program.toString()).toEqual("let myVar = anotherVar;");
  if (program.toString() !== "let myVar = anotherVar;") {
    throw new Error("program.toString() wrong. got=" + program.toString());
  }
})