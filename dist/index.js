#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = __importDefault(require("commander"));
const util_1 = require("./util");
const program = new commander_1.default.Command();
console.log(figlet_1.default.textSync("url-css-selector"));
program
    .name("url-css-selector")
    .description("Print text from url given a css selector")
    .version("1.0.0")
    .argument("<url>", "url to fetch")
    .argument("<selector>", "css selector");
program.parse(process.argv);
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = program.args[0];
        const selector = program.args[1];
        if (!url || !selector) {
            throw new Error("url and selector are required");
        }
        const html = yield (0, util_1.fetchData)(url);
        const textArr = (0, util_1.getHtmlTextFromSelector)(html, selector);
        textArr.forEach((text) => {
            console.log(text);
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        else if (typeof err === "string") {
            console.log(err);
        }
        else {
            console.log("Something went wrong");
        }
        process.exit(1);
    }
});
init();
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map