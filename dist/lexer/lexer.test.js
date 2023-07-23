import { expect, test } from '@jest/globals';
import * as token from '../token/token.js';
import { newLexer, nextToken } from './lexer.js';
test("testing lexer", () => {
    let input = "=+,;(){}";
    let tests = [
        {
            type: token.ASSIGN,
            literal: "=",
        },
        {
            type: token.PLUS,
            literal: "+",
        },
        {
            type: token.COMMA,
            literal: ",",
        },
        {
            type: token.SEMICOLON,
            literal: ";",
        },
        {
            type: token.LPAREN,
            literal: "(",
        },
        {
            type: token.RPAREN,
            literal: ")",
        },
        {
            type: token.LBRACE,
            literal: "{",
        },
        {
            type: token.RBRACE,
            literal: "}",
        },
    ];
    let l = newLexer(input);
    for (let i = 0; i < tests.length; i++) {
        let tok = nextToken(l);
        expect(tok.type).toBe(tests[i].type);
        expect(tok.literal).toBe(tests[i].literal);
    }
});
test("textNextToken", () => {
    let input = `let five = 5;
        let ten = 10;
        let add = fn(x,y) {
            x + y;
        };
        let result = add(five, ten);
        !-/*5;
        5 < 10 > 5;
        if ( 5 < 10 ) {
            return true;
        } else {
            return false;
        }

        10 == 10;
        10 != 9;
        `;
    let tests = [
        {
            type: token.LET,
            literal: "let"
        },
        {
            type: token.IDENT,
            literal: "five"
        },
        {
            type: token.ASSIGN,
            literal: "="
        },
        {
            type: token.INT,
            literal: "5"
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.LET,
            literal: "let"
        },
        {
            type: token.IDENT,
            literal: "ten"
        },
        {
            type: token.ASSIGN,
            literal: "="
        },
        {
            type: token.INT,
            literal: "10"
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.LET,
            literal: "let"
        },
        {
            type: token.IDENT,
            literal: "add"
        },
        {
            type: token.ASSIGN,
            literal: "="
        },
        {
            type: token.FUNCTION,
            literal: "fn"
        },
        {
            type: token.LPAREN,
            literal: "("
        },
        {
            type: token.IDENT,
            literal: "x"
        },
        {
            type: token.COMMA,
            literal: ","
        },
        {
            type: token.IDENT,
            literal: "y"
        },
        {
            type: token.RPAREN,
            literal: ")"
        },
        {
            type: token.LBRACE,
            literal: "{"
        },
        {
            type: token.IDENT,
            literal: "x"
        },
        {
            type: token.PLUS,
            literal: "+"
        },
        {
            type: token.IDENT,
            literal: "y"
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.RBRACE,
            literal: "}"
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.LET,
            literal: "let"
        },
        {
            type: token.IDENT,
            literal: "result"
        },
        {
            type: token.ASSIGN,
            literal: "="
        },
        {
            type: token.IDENT,
            literal: "add"
        },
        {
            type: token.LPAREN,
            literal: "("
        },
        {
            type: token.IDENT,
            literal: "five"
        },
        {
            type: token.COMMA,
            literal: ","
        },
        {
            type: token.IDENT,
            literal: "ten"
        },
        {
            type: token.RPAREN,
            literal: ")"
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.BANG,
            literal: "!"
        },
        {
            type: token.MINUS,
            literal: "-"
        },
        {
            type: token.SLASH,
            literal: "/"
        },
        {
            type: token.ASTERISK,
            literal: "*"
        },
        {
            type: token.INT,
            literal: "5"
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.INT,
            literal: "5"
        },
        {
            type: token.LT,
            literal: "<"
        },
        {
            type: token.INT,
            literal: "10"
        },
        {
            type: token.GT,
            literal: ">",
        },
        {
            type: token.INT,
            literal: "5",
        },
        {
            type: token.SEMICOLON,
            literal: ";",
        },
        {
            type: token.IF,
            literal: "if",
        },
        {
            type: token.LPAREN,
            literal: "(",
        },
        {
            type: token.INT,
            literal: "5",
        },
        {
            type: token.LT,
            literal: "<",
        },
        {
            type: token.INT,
            literal: "10",
        },
        {
            type: token.RPAREN,
            literal: ")",
        },
        {
            type: token.LBRACE,
            literal: "{",
        },
        {
            type: token.RETURN,
            literal: "return",
        },
        {
            type: token.TRUE,
            literal: "true",
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.RBRACE,
            literal: "}"
        },
        {
            type: token.ELSE,
            literal: "else",
        },
        {
            type: token.LBRACE,
            literal: "{",
        },
        {
            type: token.RETURN,
            literal: "return",
        },
        {
            type: token.FALSE,
            literal: "false",
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.RBRACE,
            literal: "}",
        },
        {
            type: token.INT,
            literal: "10",
        },
        {
            type: token.EQ,
            literal: "==",
        },
        {
            type: token.INT,
            literal: "10",
        },
        {
            type: token.SEMICOLON,
            literal: ";",
        },
        {
            type: token.INT,
            literal: "10",
        },
        {
            type: token.NOT_EQ,
            literal: "!=",
        },
        {
            type: token.INT,
            literal: "9",
        },
        {
            type: token.SEMICOLON,
            literal: ";"
        },
        {
            type: token.EOF,
            literal: ""
        },
    ];
    let l = newLexer(input);
    for (let i = 0; i < tests.length; i++) {
        let tok = nextToken(l);
        expect(tok.type).toBe(tests[i].type);
        expect(tok.literal).toBe(tests[i].literal);
    }
});
//# sourceMappingURL=lexer.test.js.map