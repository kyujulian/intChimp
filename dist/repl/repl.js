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
exports.Start = void 0;
const readline = __importStar(require("readline"));
const lexer_1 = require("../lexer/lexer");
const token = __importStar(require("../token/token"));
const PROMPT = ">> ";
function Start() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on("line", (line) => {
        const l = (0, lexer_1.newLexer)(line);
        let tok;
        do {
            tok = (0, lexer_1.nextToken)(l);
            console.log(`${JSON.stringify(tok, null, 2)}`);
        } while (tok.type !== token.TokenType.EOF);
        rl.prompt();
    });
    rl.on("close", () => {
        console.log("bye!");
        process.exit(0);
    });
    rl.setPrompt(PROMPT);
    rl.prompt();
}
exports.Start = Start;
