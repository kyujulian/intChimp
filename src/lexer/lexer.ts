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

    skipWhitespace(l);
    
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
        case '!' : {
            tok = newToken(token.BANG, l.ch);
            break;
        }
        case '-' : {
            tok = newToken(token.MINUS, l.ch);
            break;
        }
        case '/' : {
            tok = newToken(token.SLASH, l.ch);
            break;
        }
        case '*' : {
            tok = newToken(token.ASTERISK, l.ch);
            break;
        }
        case "<" : {
            tok = newToken(token.LT, l.ch);
            break;
        }
        case ">" : {
            tok = newToken(token.GT, l.ch);
            break;
        }
        case 0: {
            tok = newToken(token.EOF, "");
            break;
        }
        default:{
            if (isLetter(l.ch)) {
                let literal = readIdentifier(l);
                tok = newToken(token.lookupIdent(literal), literal)
                return tok;
            } else if (isDigit(l.ch)) {
                let literal = readNumber(l);
                tok = newToken(token.INT, literal);
                return tok;
            }
            else tok = newToken(token.ILLEGAL, l.ch);

            break;
        }
        
    }

    readChar(l);
    return tok;
}


function isDigit(ch: any) : boolean {
    return '0' <= ch && ch <= '9';
}

function readNumber(l : Lexer) : string {
    let position = l.position;
    while(isDigit(l.ch)) {
        readChar(l);
    }
    return l.input.slice(position, l.position);
}

function readIdentifier(l: Lexer) : string {
    let position = l.position;
    while(isLetter(l.ch)) {
        readChar(l);
    }
    return l.input.slice(position, l.position);
}

function isLetter(ch: any) : boolean{
    return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_';
}


function skipWhitespace(l : Lexer) {
    while (
        l.ch === ' ' || l.ch === '\t' || l.ch === '\n' || l.ch === '\r'
    ) {
        readChar(l);
    }
}