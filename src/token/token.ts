export type TokenType = string;

export type Token = {
    type: TokenType;
    literal: string;
}

export const ILLEGAL = 'ILLEGAL';
export const EOF = 'EOF';

// Identifiers + literals
export const IDENT = "IDENT"; // add, foobar, x, y...
export const INT = "INT";

//Operators
export const ASSIGN = "=";
export const PLUS = "+";
export const MINUS =  "-";
export const BANG = "!";
export const ASTERISK = "*";
export const SLASH = "/";

export const LT = "<";
export const GT = ">";

//Delimiters
export const COMMA = ",";
export const SEMICOLON = ";";

export const LPAREN = "(";
export const RPAREN = ")";
export const LBRACE = "{";
export const RBRACE = "}";

//Keywords
export const FUNCTION = "FUNCTION";
export const LET = "LET";



export const keywords : Record<string, TokenType> = {
    "fn": FUNCTION,
    "let": LET,
}


export function lookupIdent(ident: string) : TokenType {
    const tok = keywords[ident];
    if (tok !== undefined) return tok;
    return "IDENT";
}
