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
exports.nextToken = exports.readChar = exports.newLexer = void 0;
const token = __importStar(require("../token/token"));
function newLexer(input) {
    let l = {
        input: input,
        position: 0,
        readPosition: 0,
        ch: 0,
    };
    readChar(l);
    return l;
}
exports.newLexer = newLexer;
function readChar(l) {
    if (l.readPosition >= l.input.length) {
        l.ch = 0;
    }
    else {
        l.ch = l.input[l.readPosition];
    }
    l.position = l.readPosition;
    l.readPosition += 1;
}
exports.readChar = readChar;
const newToken = (tokenType, ch) => {
    return {
        type: tokenType,
        literal: ch,
    };
};
function nextToken(l) {
    let tok;
    skipWhitespace(l);
    switch (l.ch) {
        case "=": {
            if (peekChar(l) === "=") {
                let ch = l.ch;
                readChar(l);
                tok = newToken(token.TokenType.EQ, ch + l.ch);
            }
            else {
                tok = newToken(token.TokenType.ASSIGN, l.ch);
            }
            break;
        }
        case "!": {
            if (peekChar(l) === "=") {
                let ch = l.ch;
                readChar(l);
                tok = newToken(token.TokenType.NOT_EQ, ch + l.ch);
            }
            else {
                tok = newToken(token.TokenType.BANG, l.ch);
            }
            break;
        }
        //One chaaracter tokens
        case "(": {
            tok = newToken(token.TokenType.LPAREN, l.ch);
            break;
        }
        case ")": {
            tok = newToken(token.TokenType.RPAREN, l.ch);
            break;
        }
        case ",": {
            tok = newToken(token.TokenType.COMMA, l.ch);
            break;
        }
        case "+": {
            tok = newToken(token.TokenType.PLUS, l.ch);
            break;
        }
        case "{": {
            tok = newToken(token.TokenType.LBRACE, l.ch);
            break;
        }
        case "}": {
            tok = newToken(token.TokenType.RBRACE, l.ch);
            break;
        }
        case ";": {
            tok = newToken(token.TokenType.SEMICOLON, l.ch);
            break;
        }
        case "-": {
            tok = newToken(token.TokenType.MINUS, l.ch);
            break;
        }
        case "/": {
            tok = newToken(token.TokenType.SLASH, l.ch);
            break;
        }
        case "*": {
            tok = newToken(token.TokenType.ASTERISK, l.ch);
            break;
        }
        case "<": {
            tok = newToken(token.TokenType.LT, l.ch);
            break;
        }
        case ">": {
            tok = newToken(token.TokenType.GT, l.ch);
            break;
        }
        case "<": {
            tok = newToken(token.TokenType.LT, l.ch);
            break;
        }
        case ">": {
            tok = newToken(token.TokenType.GT, l.ch);
            break;
        }
        case 0: {
            tok = newToken(token.TokenType.EOF, "");
            break;
        }
        default: {
            if (isLetter(l.ch)) {
                let literal = readIdentifier(l);
                tok = newToken(token.lookupIdent(literal), literal);
                return tok;
            }
            else if (isDigit(l.ch)) {
                let literal = readNumber(l);
                tok = newToken(token.TokenType.INT, literal);
                return tok;
            }
            else {
                console.log("illegal", l.ch, "|");
                tok = newToken(token.TokenType.ILLEGAL, l.ch);
            }
            break;
        }
    }
    readChar(l);
    return tok;
}
exports.nextToken = nextToken;
function isDigit(ch) {
    return '0' <= ch && ch <= '9';
}
function readNumber(l) {
    let position = l.position;
    while (isDigit(l.ch)) {
        readChar(l);
    }
    return l.input.slice(position, l.position);
}
function readIdentifier(l) {
    let position = l.position;
    while (isLetter(l.ch)) {
        readChar(l);
    }
    return l.input.slice(position, l.position);
}
function isLetter(ch) {
    return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_';
}
function skipWhitespace(l) {
    while (l.ch === ' ' || l.ch === '\t' || l.ch === '\n' || l.ch === '\r') {
        readChar(l);
    }
}
function peekChar(l) {
    if (l.readPosition >= l.input.length) {
        return 0;
    }
    else {
        return l.input[l.readPosition];
    }
}
