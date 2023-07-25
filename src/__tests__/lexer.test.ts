import { expect, test} from '@jest/globals';

import * as token from '../token/token';


import { Lexer } from '../lexer/lexer';



test("testing lexer", () => {
    let input = "=+,;(){}";

    let tests : token.Token[] = [
        {
            type: token.TokenType.ASSIGN,
            literal: "=",
        },
        {
            type: token.TokenType.PLUS,
            literal: "+",
        },
        {
            type: token.TokenType.COMMA,
            literal: ",",
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";",
        },
        {
            type: token.TokenType.LPAREN,
            literal: "(",
        },
        {
            type: token.TokenType.RPAREN,
            literal: ")",
        },
        {
            type: token.TokenType.LBRACE,
            literal: "{",
        },
        {
            type: token.TokenType.RBRACE,
            literal: "}",
        },

    ]
    
    let lex = new Lexer(input);

    for(let i = 0; i < tests.length ; i++) {
        let tok = lex.nextToken();

        expect(tok.type).toBe(tests[i].type);
        expect(tok.literal).toBe(tests[i].literal);         
    }
}) 


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
        `
    ;

    let tests : token.Token[] = [
        {
            type: token.TokenType.LET,
            literal: "let"
        },
        {
            type: token.TokenType.IDENT ,
            literal: "five"
        },
        {
            type: token.TokenType.ASSIGN ,
            literal: "="
        },
        {
            type: token.TokenType.INT ,
            literal: "5"
        },
        {
            type: token.TokenType.SEMICOLON ,
            literal: ";"
        },
        {
            type: token.TokenType.LET,
            literal: "let"
        },
        {
            type: token.TokenType.IDENT,
            literal: "ten"
        },
        {
            type: token.TokenType.ASSIGN,
            literal: "="
        },
        {
            type: token.TokenType.INT,
            literal: "10"
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";"
        },
        {
            type: token.TokenType.LET,
            literal: "let"
        },
        {
            type: token.TokenType.IDENT,
            literal: "add"
        },
        {
            type: token.TokenType.ASSIGN ,
            literal: "="
        },
        {
            type: token.TokenType.FUNCTION,
            literal: "fn"
        },
        {
            type: token.TokenType.LPAREN,
            literal: "("
        },
        {
            type: token.TokenType.IDENT,
            literal: "x"
        },
        {
            type: token.TokenType.COMMA,
            literal: ","
        },
        {
            type: token.TokenType.IDENT,
            literal: "y"
        },
        {
            type: token.TokenType.RPAREN,
            literal: ")"
        },
        {
            type: token.TokenType.LBRACE,
            literal: "{"
        },
        {
            type: token.TokenType.IDENT,
            literal: "x"
        },
        {
            type: token.TokenType.PLUS,
            literal: "+"
        },
        {
            type: token.TokenType.IDENT,
            literal: "y"
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";"
        },
        {
            type: token.TokenType.RBRACE,
            literal: "}"
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";"
        },
        {
            type: token.TokenType.LET,
            literal: "let"
        },
        {
            type: token.TokenType.IDENT,
            literal: "result"
        },
        {
            type: token.TokenType.ASSIGN,
            literal: "="
        },
        {
            type: token.TokenType.IDENT,
            literal: "add"
        },
        {
            type: token.TokenType.LPAREN,
            literal: "("
        },
        {
            type: token.TokenType.IDENT,
            literal: "five"
        },
        {
            type: token.TokenType.COMMA,
            literal: ","
        },
        {
            type: token.TokenType.IDENT,
            literal: "ten"
        },
        {
            type: token.TokenType.RPAREN,
            literal: ")"
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";"
        },
        {
            type: token.TokenType.BANG,
            literal: "!"
        },
        {
            type: token.TokenType.MINUS,
            literal: "-"
        },
        {
            type: token.TokenType.SLASH,
            literal: "/"
        },
        {
            type: token.TokenType.ASTERISK,
            literal: "*"
        },
        {
            type: token.TokenType.INT,
            literal: "5"
        }, 
        {
            type: token.TokenType.SEMICOLON,
            literal: ";"
        },
        {
            type: token.TokenType.INT,
            literal: "5"
        },
        {
            type: token.TokenType.LT,
            literal: "<"
        },
        {
            type: token.TokenType.INT,
            literal: "10"
        },
        {
            type: token.TokenType. GT, 
            literal : ">",
        },
        {
            type: token.TokenType.INT,
            literal : "5",
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";",
        },
        {
            type: token.TokenType.IF,
            literal: "if",
        },
        {
            type: token.TokenType.LPAREN,
            literal : "(",
        },
        {
            type: token.TokenType.INT,
            literal: "5",
        },
        {
            type: token.TokenType.LT,
            literal: "<",
        },
        {
            type: token.TokenType.INT,
            literal: "10",
        },
        {
            type: token.TokenType.RPAREN,
            literal: ")",
        },
        {
            type: token.TokenType.LBRACE,
            literal: "{",
        },
        {
            type: token.TokenType.RETURN,
            literal: "return",
        },
        {
            type: token.TokenType.TRUE, 
            literal: "true",
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";"
        },
        {
            type: token.TokenType.RBRACE,
            literal: "}"
        },
        {
            type: token.TokenType.ELSE,
            literal: "else",
        },
        {
            type: token.TokenType.LBRACE,
            literal: "{",
        },
        {
            type: token.TokenType.RETURN,
            literal: "return",
        },
        {
            type: token.TokenType.FALSE,
            literal: "false",
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";"
        },
        {
            type: token.TokenType.RBRACE,
            literal: "}",
        },
        {
            type: token.TokenType.INT,
            literal:"10",
        },
        {
            type: token.TokenType.EQ,
            literal : "==",
        },
        {
            type: token.TokenType.INT,
            literal: "10",
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";",
        },
        {
            type: token.TokenType.INT,
            literal: "10",
        },
        {
            type: token.TokenType.NOT_EQ,
            literal: "!=",
        },
        {
            type: token.TokenType.INT,
            literal: "9",
        },
        {
            type: token.TokenType.SEMICOLON,
            literal: ";"
        },
        {
            type: token.TokenType.EOF,
            literal: ""
        },
    ];
    
    let lex = new Lexer(input);

    for(let i = 0; i < tests.length ; i++) {
        let tok = lex.nextToken();

        expect(tok.type).toBe(tests[i].type);
        expect(tok.literal).toBe(tests[i].literal);         
    }
})