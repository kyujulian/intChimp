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
exports.Lexer = void 0;
const token = __importStar(require("../token/token"));
class Lexer {
    constructor(input) {
        this.position = 0; //current position in input (poinst to current char)
        this.readPosition = 0; // current reading position in input (after current char)
        this.ch = "0"; // current char under examination
        this.input = input;
        this.readChar();
    }
    readChar() {
        if (this.readPosition >= this.input.length) {
            this.ch = "0";
        }
        else {
            this.ch = this.input[this.readPosition];
        }
        this.position = this.readPosition;
        this.readPosition += 1;
    }
    nextToken() {
        let tok;
        this.skipWhitespace();
        switch (this.ch) {
            case "=": {
                if (this.peekChar() === "=") {
                    let ch = this.ch;
                    this.readChar();
                    tok = newToken(token.TokenType.EQ, ch + this.ch);
                }
                else {
                    tok = newToken(token.TokenType.ASSIGN, this.ch);
                }
                break;
            }
            case "!": {
                if (this.peekChar() === "=") {
                    let ch = this.ch;
                    this.readChar();
                    tok = newToken(token.TokenType.NOT_EQ, ch + this.ch);
                }
                else {
                    tok = newToken(token.TokenType.BANG, this.ch);
                }
                break;
            }
            //One chaaracter tokens
            case "(": {
                tok = newToken(token.TokenType.LPAREN, this.ch);
                break;
            }
            case ")": {
                tok = newToken(token.TokenType.RPAREN, this.ch);
                break;
            }
            case ",": {
                tok = newToken(token.TokenType.COMMA, this.ch);
                break;
            }
            case "+": {
                tok = newToken(token.TokenType.PLUS, this.ch);
                break;
            }
            case "{": {
                tok = newToken(token.TokenType.LBRACE, this.ch);
                break;
            }
            case "}": {
                tok = newToken(token.TokenType.RBRACE, this.ch);
                break;
            }
            case ";": {
                tok = newToken(token.TokenType.SEMICOLON, this.ch);
                break;
            }
            case "-": {
                tok = newToken(token.TokenType.MINUS, this.ch);
                break;
            }
            case "/": {
                tok = newToken(token.TokenType.SLASH, this.ch);
                break;
            }
            case "*": {
                tok = newToken(token.TokenType.ASTERISK, this.ch);
                break;
            }
            case "<": {
                tok = newToken(token.TokenType.LT, this.ch);
                break;
            }
            case ">": {
                tok = newToken(token.TokenType.GT, this.ch);
                break;
            }
            case "<": {
                tok = newToken(token.TokenType.LT, this.ch);
                break;
            }
            case ">": {
                tok = newToken(token.TokenType.GT, this.ch);
                break;
            }
            case "0": {
                tok = newToken(token.TokenType.EOF, "");
                break;
            }
            default: {
                if (isLetter(this.ch)) {
                    let literal = this.readIdentifier();
                    tok = newToken(token.lookupIdent(literal), literal);
                    return tok;
                }
                else if (isDigit(this.ch)) {
                    let literal = this.readNumber();
                    tok = newToken(token.TokenType.INT, literal);
                    return tok;
                }
                else {
                    console.log("illegal", this.ch, "|");
                    tok = newToken(token.TokenType.ILLEGAL, this.ch);
                }
                break;
            }
        }
        this.readChar();
        return tok;
    }
    readNumber() {
        let position = this.position;
        while (isDigit(this.ch)) {
            this.readChar();
        }
        return this.input.slice(position, this.position);
    }
    readIdentifier() {
        let position = this.position;
        while (isLetter(this.ch)) {
            this.readChar();
        }
        return this.input.slice(position, this.position);
    }
    skipWhitespace() {
        while (this.ch === " " ||
            this.ch === "\t" ||
            this.ch === "\n" ||
            this.ch === "\r") {
            this.readChar();
        }
    }
    peekChar() {
        if (this.readPosition >= this.input.length) {
            return 0;
        }
        else {
            return this.input[this.readPosition];
        }
    }
}
exports.Lexer = Lexer;
const newToken = (tokenType, ch) => {
    return {
        type: tokenType,
        literal: ch,
    };
};
function isDigit(ch) {
    return "0" <= ch && ch <= "9";
}
function isLetter(ch) {
    return ("a" <= ch && ch <= "z") || ("A" <= ch && ch <= "Z") || ch == "_";
}
