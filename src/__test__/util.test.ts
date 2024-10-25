import { fetchData, getHtmlTextFromSelector } from "../util";

const html = `
<!DOCTYPE html>
<html>
    <body>
        <p>Hello World</p>
    </body>
</html>
`;

global.fetch = jest.fn(() =>
    Promise.resolve({
        text: () => Promise.resolve(html),
    })
) as jest.Mock;

beforeEach(() => {
    (fetch as jest.Mock).mockClear();
});

describe("fetchData", () => {
    it("should fetch html from url", async () => {
        const url = "https://example.com";
        const html = await fetchData(url);

        expect(html).toMatch(/hello world/i);
        expect(fetch).toHaveBeenCalledWith(url);
    });
});

describe("getHtmlTextFromSelector", () => {
    it("should get array of text from html given a selector", async () => {
        const selector = "p";
        const elements = getHtmlTextFromSelector(html, selector);

        elements.forEach((element) => {
            expect(element).toMatch(/hello world/i);
        });
    });
});
