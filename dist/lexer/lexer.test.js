"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const token = __importStar(require("../token/token"));
const lexer_1 = require("./lexer");
(0, globals_1.test)("testing lexer", () => {
    let input = "=+,;(){}";
    let tests = [
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
    ];
    let lex = new lexer_1.Lexer(input);
    for (let i = 0; i < tests.length; i++) {
        let tok = lex.nextToken();
        (0, globals_1.expect)(tok.type).toBe(tests[i].type);
        (0, globals_1.expect)(tok.literal).toBe(tests[i].literal);
    }
});
(0, globals_1.test)("textNextToken", () => {
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
            type: token.TokenType.LET,
            literal: "let"
        },
        {
            type: token.TokenType.IDENT,
            literal: "five"
        },
        {
            type: token.TokenType.ASSIGN,
            literal: "="
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
            type: token.TokenType.ASSIGN,
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
            type: token.TokenType.GT,
            literal: ">",
        },
        {
            type: token.TokenType.INT,
            literal: "5",
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
            literal: "(",
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
            literal: "10",
        },
        {
            type: token.TokenType.EQ,
            literal: "==",
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
    let lex = new lexer_1.Lexer(input);
    for (let i = 0; i < tests.length; i++) {
        let tok = lex.nextToken();
        (0, globals_1.expect)(tok.type).toBe(tests[i].type);
        (0, globals_1.expect)(tok.literal).toBe(tests[i].literal);
    }
});
