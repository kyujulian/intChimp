export type TokenType = string;

export type Token = {
    type: TokenType;
    literal: string;
}
export const TokenType = {
    ILLEGAL : 'ILLEGAL',
    EOF : 'EOF',
    
    // Identifiers + literals
    IDENT : "IDENT", // add, foobar, x, y...
    INT : "INT",
    
    //Operators
    ASSIGN : "=",
    PLUS : "+",
    MINUS :  "-",
    BANG : "!",
    ASTERISK : "*",
    SLASH : "/",
    
    LT : "<",
    GT : ">",
    EQ : "==",
    NOT_EQ : "!=",
    
    //Delimiters
    COMMA : ",",
    SEMICOLON : ";",
    
    LPAREN : "(",
    RPAREN : ")",
    LBRACE : "{",
    RBRACE : "}",
    
    //Keywords
    FUNCTION : "FUNCTION",
    LET : "LET",
    RETURN : "RETURN",
    IF : "IF",
    ELSE : "ELSE",
    TRUE : "TRUE",
    FALSE : "FALSE",
} as const;




export const keywords : Record<string, TokenType> = {
    "fn": TokenType.FUNCTION,
    "let": TokenType.LET,
    "return" : TokenType.RETURN,
    "if" : TokenType.IF,
    "else" : TokenType.ELSE,
    "true" : TokenType.TRUE,
    "false" : TokenType.FALSE
}


export function lookupIdent(ident: string) : TokenType {
    const tok = keywords[ident];
    if (tok !== undefined) return tok;
    return "IDENT";
}
