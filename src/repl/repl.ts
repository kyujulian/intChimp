import * as readline from 'readline';
import { Lexer, newLexer, nextToken } from '../lexer/lexer';
import * as token from '../token/token';
import { Token }  from "../token/token";


const PROMPT = ">> ";


export function Start() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on("line", (line) => {
        const l : Lexer = newLexer(line);
        let tok : Token;

        do {
            tok = nextToken(l);
            console.log(`${JSON.stringify(tok, null, 2)}`);
        } while (tok.type !== token.TokenType.EOF);

        rl.prompt();
    })

    rl.on("close", () => {
        console.log("bye!");
        process.exit(0);
    });
    rl.setPrompt(PROMPT);
    rl.prompt();
}