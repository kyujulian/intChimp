import * as ast from "../ast/ast";
import * as lexer from "../lexer/lexer";
import { expect, test } from "@jest/globals";
import * as parser from "../parser/parser";

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