import * as token from '../token/token';

export class Lexer {
  input!: string;
  position: number = 0; //current position in input (poinst to current char)
  readPosition: number = 0; // current reading position in input (after current char)
  ch: string = '0'; // current char under examination

  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = '0';
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }
  nextToken() {
    let tok: token.Token;

    this.skipWhitespace();

    switch (this.ch) {
      case '=': {
        if (this.peekChar() === '=') {
          let ch = this.ch;
          this.readChar();
          tok = newToken(token.TokenType.EQ, ch + this.ch);
        } else {
          tok = newToken(token.TokenType.ASSIGN, this.ch);
        }
        break;
      }
      case '!': {
        if (this.peekChar() === '=') {
          let ch = this.ch;
          this.readChar();
          tok = newToken(token.TokenType.NOT_EQ, ch + this.ch);
        } else {
          tok = newToken(token.TokenType.BANG, this.ch);
        }
        break;
      }
      //One chaaracter tokens
      case '(': {
        tok = newToken(token.TokenType.LPAREN, this.ch);
        break;
      }
      case ')': {
        tok = newToken(token.TokenType.RPAREN, this.ch);
        break;
      }
      case ',': {
        tok = newToken(token.TokenType.COMMA, this.ch);
        break;
      }
      case '+': {
        tok = newToken(token.TokenType.PLUS, this.ch);
        break;
      }
      case '{': {
        tok = newToken(token.TokenType.LBRACE, this.ch);
        break;
      }
      case '}': {
        tok = newToken(token.TokenType.RBRACE, this.ch);
        break;
      }
      case ';': {
        tok = newToken(token.TokenType.SEMICOLON, this.ch);
        break;
      }
      case '-': {
        tok = newToken(token.TokenType.MINUS, this.ch);
        break;
      }
      case '/': {
        tok = newToken(token.TokenType.SLASH, this.ch);
        break;
      }
      case '*': {
        tok = newToken(token.TokenType.ASTERISK, this.ch);
        break;
      }
      case '<': {
        tok = newToken(token.TokenType.LT, this.ch);
        break;
      }
      case '>': {
        tok = newToken(token.TokenType.GT, this.ch);
        break;
      }
      case '<': {
        tok = newToken(token.TokenType.LT, this.ch);
        break;
      }
      case '>': {
        tok = newToken(token.TokenType.GT, this.ch);
        break;
      }
      case '0': {
        tok = newToken(token.TokenType.EOF, '');
        break;
      }
      default: {
        if (isLetter(this.ch)) {
          let literal = this.readIdentifier();
          tok = newToken(token.lookupIdent(literal), literal);
          return tok;
        } else if (isDigit(this.ch)) {
          let literal = this.readNumber();
          tok = newToken(token.TokenType.INT, literal);
          return tok;
        } else {
          console.log('illegal', this.ch, '|');
          tok = newToken(token.TokenType.ILLEGAL, this.ch);
        }

        break;
      }
    }

    this.readChar();
    return tok;
  }
  readNumber(): string {
    let position = this.position;
    while (isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }

  readIdentifier(): string {
    let position = this.position;
    while (isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.slice(position, this.position);
  }
  skipWhitespace() {
    while (
      this.ch === ' ' ||
      this.ch === '\t' ||
      this.ch === '\n' ||
      this.ch === '\r'
    ) {
      this.readChar();
    }
  }

  peekChar() {
    if (this.readPosition >= this.input.length) {
      return 0;
    } else {
      return this.input[this.readPosition];
    }
  }
}

const newToken = (tokenType: token.TokenType, ch: any) => {
  return {
    type: tokenType,
    literal: ch,
  };
};

function isDigit(ch: any): boolean {
  return '0' <= ch && ch <= '9';
}

function isLetter(ch: any): boolean {
  return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') || ch == '_';
}
