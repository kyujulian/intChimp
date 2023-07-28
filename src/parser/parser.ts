import * as lexer from "../lexer/lexer";
import * as ast from "../ast/ast";
import * as token from "../token/token";


//enum-like behavior
export type ExpressionType = number;
export const ExpressionType = {
    LOWEST: 1,
    EQUALS: 2, // ==
    LESSGREATER: 3, // > or <
    SUM : 4, // +
    PRODUCT: 5, // *
    PREFIX: 6, // -X or !X
    CALL: 7 // myFunction(X)
} as const;


export class Parser {
    lex!: lexer.Lexer;
    curToken!: token.Token;
    peekToken!: token.Token;
    prefixParseFns : Record<string, Function> = {};
    infixParseFns : Record<string, Function> = {};
    private errors: string [] = [];


    constructor( lex : lexer.Lexer) {
        this.lex = lex;
        this.nextToken();
        this.nextToken();
        this.registerPrefix(token.TokenType.IDENT, this.parseIdentifier);
        this.registerPrefix(token.TokenType.INT, this.parseIntegerLiteral);
        this.registerPrefix(token.TokenType.BANG, this.parsePrefixExpression);
        this.registerPrefix(token.TokenType.MINUS, this.parsePrefixExpression);
    }

    registerPrefix(tokenType: token.TokenType, fn: Function) {
        //interesting syntax here
        //Assure that the function is bound to the parser
        //that means that 'this' keyword will still be bound inside the function calls
        //                                  vvvv
        this.prefixParseFns[tokenType] = fn.bind(this);
    }

    registerInfix(tokenType: token.TokenType, fn: Function) {
        this.infixParseFns[tokenType] = fn.bind(this);
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
    parsePrefixExpression() : ast.Expression {
        let expression = new ast.PrefixExpression({
            token: this.curToken,
            operator : this.curToken.literal
        });

        this.nextToken();

        expression.setRight(this.parseExpression(ExpressionType.PREFIX) );
        return expression;

    }
    parseIdentifier() : ast.Identifier {
        //cannot call this inside this function
        return new ast.Identifier({token: this.curToken, value: this.curToken.literal});
    }

    parseStatement () : ast.Statement | null {
        switch(this.curToken.type) {
            case (token.TokenType.LET):{
                return this.parseLetStatement();
            }
            case (token.TokenType.RETURN):{
                return this.parseReturnStatement();
            }
            default: {
                return this.parseExpressionStatement();
            }
        }
    }

    noPrefixParseFnError(tokenType: token.TokenType) {
        let msg = "no prefix parse function for " + tokenType;
        throw new Error(msg);
    }
    parseExpression(expressionType : ExpressionType ) : ast.Expression {
        let prefix = this.prefixParseFns[this.curToken.type];

        if (!prefix) {
            this.noPrefixParseFnError(this.curToken.type);
        }
        let leftExpression = prefix();
        return leftExpression;
    }

    parseExpressionStatement() : ast.Statement | null {

        let stmt = new ast.ExpressionStatement({ token: this.curToken, expression: null});

        stmt.setExpression(this.parseExpression(ExpressionType.LOWEST));

        if (this.peekTokenIs(token.TokenType.SEMICOLON)) {
            this.nextToken();
        }
        return stmt;

    }


    parseReturnStatement() : ast.ReturnStatement | null {
        let stmt = new ast.ReturnStatement({ token: this.curToken});
        this.nextToken();

        while(!this.curTokenIs(token.TokenType.SEMICOLON)) {
            this.nextToken();
        }
        return stmt;
    }

    parseLetStatement() : ast.LetStatement | null {
        let name = new ast.Identifier({token: this.curToken, value: this.curToken.literal});
        let stmt = new ast.LetStatement({ token: this.curToken ,name: name, value: null});

        if (!this.expectPeek(token.TokenType.IDENT)) {
            return null;
        }

        stmt.setName(new ast.Identifier({token: this.curToken,value: this.curToken.literal}));

        if (!this.expectPeek(token.TokenType.ASSIGN)) {
            return null;
        }

        while (!this.curTokenIs(token.TokenType.SEMICOLON)) {
            this.nextToken();
        }

        return stmt;
    }

    parseIntegerLiteral() : ast.IntegerLiteral | null {
        let intLiteral = new ast.IntegerLiteral({token: this.curToken});
        let value = parseInt(this.curToken.literal);

        if (isNaN(value)) {
            let msg = "could not parse " + this.curToken.literal + " as integer";
            this.errors.push(msg);
            return null;
        }

        intLiteral.setValue(value);
        return intLiteral;
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
            this.peekError(token)
            return false;
        }

    }

    // == ERRORS ==
    getErrors() {
        return this.errors;
    }

    peekError(token : token.TokenType) {
        let msg = "expected next token to be" + this.peekToken.type + " got " + token + " instead";
        this.errors.push(msg);
    }



}