#! /usr/bin/env node

import figlet from "figlet";
import commander from "commander";
import { fetchData, getHtmlTextFromSelector } from "./util";

const program = new commander.Command();

console.log(figlet.textSync("url-css-selector"));

program
    .name("url-css-selector")
    .description("Print text from url given a css selector")
    .version("1.0.0")
    .argument("<url>", "url to fetch")
    .argument("<selector>", "css selector");

program.parse(process.argv);

const init = async () => {
    try {
        const url = program.args[0];
        const selector = program.args[1];
        if (!url || !selector) {
            throw new Error("url and selector are required");
        }

        const html = await fetchData(url);
        const textArr = getHtmlTextFromSelector(html, selector);

        textArr.forEach((text) => {
            console.log(text);
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
        } else if (typeof err === "string") {
            console.log(err);
        } else {
            console.log("Something went wrong");
        }
        process.exit(1);
    }
};

init();

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
