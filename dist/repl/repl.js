import * as readline from 'readline';
import { newLexer, nextToken } from '../lexer/lexer.js';
import * as token from '../token/token.js';
const PROMPT = ">> ";
export function Start() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on("line", (line) => {
        const l = newLexer(line);
        let tok;
        do {
            tok = nextToken(l);
            console.log(`${JSON.stringify(tok, null, 2)}`);
        } while (tok.type !== token.EOF);
        rl.prompt();
    });
    rl.on("close", () => {
        console.log("bye!");
        process.exit(0);
    });
    rl.setPrompt(PROMPT);
    rl.prompt();
}
//# sourceMappingURL=repl.js.map