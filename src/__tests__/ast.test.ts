import { test, expect } from '@jest/globals';
import * as ast from '../ast/ast';
test ("test String functions", () => {

  let program = new ast.Program(
     [
      new ast.LetStatement({
        token: { type: "LET", literal: "let" },
        name: new ast.Identifier({
          token:{ type: "IDENT", literal: "myVar" },
          value:"myVar"
      }),
        value: new ast.Identifier({
          token:{ type: "IDENT", literal: "anotherVar" },
          value:"anotherVar"
      })
      })
    ]);
    expect(program.toString()).toEqual("let myVar = anotherVar;")
  })
