import * as lexer from "../lexer/lexer";
import * as ast from "../ast/ast";
import * as token from "../token/token";



export class Parser {
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
        let program = new ast.Program();

        while( this.curToken.type !== token.TokenType.EOF) {
            let stmt = this.parseStatement();
            if (stmt) {
                program.statements.push(stmt);
            }
            this.nextToken();
        }



        return program;
    }

    parseStatement () : ast.Statement | null {
        switch(this.curToken.type) {
            case (token.TokenType.LET):{
                return this.parseLetStatement();
            }
            default:
                return null;
        }
    }

    parseLetStatement() : ast.LetStatement | null {
        let name = new ast.Identifier(this.curToken, this.curToken.literal);
        let stmt = new ast.LetStatement({ token: this.curToken ,name: name, value: null});

        if (!this.expectPeek(token.TokenType.IDENT)) {
            return null;
        }

        stmt.setName(new ast.Identifier(this.curToken, this.curToken.literal));
        return stmt;
    }

    curTokenIs(token : token.TokenType) : boolean {
        return this.curToken.type === token;
    }

    peekTokenIs(token : token.TokenType): boolean {
        return this.peekToken.type === token;
    }

    expectPeek(token : token.TokenType) : boolean {
        if (this.peekTokenIs(token)){
            this.nextToken();
            return true;
        } else {
            return false;
        }

    }



}