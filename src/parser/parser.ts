import * as lexer from "../lexer/lexer";
import * as token from "../token/token";



class Parser {
    lex!: lexer.Lexer;
    curToken!: token.Token;
    peekToken!: token.Token;


    constructor( lex : lexer.Lexer) {
        this.lex = lex;
        this.nextToken();
        this.nextToken();
    }

    nextToken()  {
        this.curToken = this.peekToken;
        this.peekToken = this.lex.nextToken();
    }

    parseProgram() {
        return null;
    }



}