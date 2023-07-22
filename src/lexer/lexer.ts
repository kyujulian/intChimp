import * as token from "../token/token.ts";

export type Lexer = {
    input: string, 
    position: number, //current position in input (poinst to current char)
    readPosition: number, // current reading position in input (after current char)
    ch : any,  // current char under examination
}


export function newLexer(input: string) : Lexer {
    let l : Lexer  = {
        input: input,
        position: 0,
        readPosition: 0,
        ch: 0,
    }
    readChar(l);
    return l;
}

export function readChar(l: Lexer) {
    if (l.readPosition >= l.input.length){
        l.ch = 0;
    } else {
        l.ch = l.input[l.readPosition];
    }
    l.position = l.readPosition;
    l.readPosition += 1;
}


const newToken = (tokenType : token.TokenType, ch: any) => {
    return {
        type : tokenType,
        literal: ch,
    }
}

export function nextToken(l: Lexer) {
    let tok : token.Token;
    
    switch(l.ch) {
        case '=': {
            tok = newToken(token.ASSIGN, l.ch);
            break;
        }
        case ';':{
            tok = newToken(token.SEMICOLON, l.ch);
            break;
        }
        case '(':{
            tok = newToken(token.LPAREN, l.ch);
            break;
        }
        case ')':{
            tok = newToken(token.RPAREN, l.ch);
            break;
        }
        case ',':{
            tok = newToken(token.COMMA, l.ch);
            break;
        }
        case '+' :{
            tok = newToken(token.PLUS, l.ch);
            break; 
        }
        case '{':{
            tok = newToken(token.LBRACE, l.ch);
            break;
        }
        case '}':{
            tok = newToken(token.RBRACE, l.ch);
            break;
        }
        default:{
            tok = newToken(token.EOF, "");
            break;
        }
        
    }

    readChar(l);
    return tok;
}