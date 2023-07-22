import {describe, expect, test} from '@jest/globals';

import * as token from '../token/token.ts';


import { TokenType,Token } from '../token/token.ts';
import { Lexer,newLexer,readChar, nextToken } from './lexer.ts';



test("testing lexer", () => {
    let input = "=+,;(){}";

    let tests : Token[] = [
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

    ]
    
    let l = newLexer(input);

    for(let i = 0; i < tests.length ; i++) {
        let tok = nextToken(l);

        expect(tok.type).toBe(tests[i].type);
        expect(tok.literal).toBe(tests[i].literal);         
    }


}) 
// testNextToken() {
//     let input = "=+(){},;";

//     let tests : Token[] = [
//         {
//             type: token.ASSIGN,
//             literal: "=",
//         },
//         {
//             type: token.PLUS,
//             literal: "+",
//         },
//         {
//             type: token.COMMA,
//             literal: ",",
//         },
//         {
//             type: token.SEMICOLON,
//             literal: ";",
//         },
//         {
//             type: token.LPAREN,
//             literal: "(",
//         },
//         {
//             type: token.RPAREN,
//             literal: ")",
//         },
//         {
//             type: token.LBRACE,
//             literal: "{",
//         },
//         {
//             type: token.RBRACE,
//             literal: "}",
//         },

//     ]
    
//     l = new Lexer(input);

//     for(let i = 0; i < tests.length : i++) {
//         tok = l.nextToken();

//         if tok.type != tests[i].type {

//         }
//         if tok.literal != tests[i].literal {

//         }

//     }


//     // let tests = [
//     //     { 
//     //         token.ASSIGN,
//     //         "=",
//     //     },
//     //     { 
//     //         expectedType : token.PLUS,
//     //         expectedLiteral : "+",
//     //     },
//     //     {
//     //         expectedType : token.LPAREN,
//     //         expectedLiteral : "(",
//     //     },

//     // ]
// }
// describe('lexer', () => {
//   test('TestNextToken', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// });