"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupIdent = exports.keywords = exports.TokenType = void 0;
exports.TokenType = {
    ILLEGAL: 'ILLEGAL',
    EOF: 'EOF',
    // Identifiers + literals
    IDENT: "IDENT",
    INT: "INT",
    //Operators
    ASSIGN: "=",
    PLUS: "+",
    MINUS: "-",
    BANG: "!",
    ASTERISK: "*",
    SLASH: "/",
    LT: "<",
    GT: ">",
    EQ: "==",
    NOT_EQ: "!=",
    //Delimiters
    COMMA: ",",
    SEMICOLON: ";",
    LPAREN: "(",
    RPAREN: ")",
    LBRACE: "{",
    RBRACE: "}",
    //Keywords
    FUNCTION: "FUNCTION",
    LET: "LET",
    RETURN: "RETURN",
    IF: "IF",
    ELSE: "ELSE",
    TRUE: "TRUE",
    FALSE: "FALSE",
};
exports.keywords = {
    "fn": exports.TokenType.FUNCTION,
    "let": exports.TokenType.LET,
    "return": exports.TokenType.RETURN,
    "if": exports.TokenType.IF,
    "else": exports.TokenType.ELSE,
    "true": exports.TokenType.TRUE,
    "false": exports.TokenType.FALSE
};
function lookupIdent(ident) {
    const tok = exports.keywords[ident];
    if (tok !== undefined)
        return tok;
    return "IDENT";
}
exports.lookupIdent = lookupIdent;
