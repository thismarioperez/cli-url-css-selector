import * as cheerio from "cheerio";

export const fetchData = async (url: string) => {
    try {
        const res = await fetch(url);
        return await res.text();
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

export const getHtmlTextFromSelector = (
    html: string,
    selector: string
): string[] => {
    const $ = cheerio.load(html);

    return $(selector)
        .map(function () {
            return $(this).text();
        })
        .toArray();
};
