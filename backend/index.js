const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);

const waitTillHTMLRendered = async (page, timeout = 30000) => {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;

    while (checkCounts++ <= maxChecks) {
        let html = await page.content();
        let currentHTMLSize = html.length;

        let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

        console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

        if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
            countStableSizeIterations++;
        else
            countStableSizeIterations = 0; //reset the counter

        if (countStableSizeIterations >= minStableSizeIterations) {
            console.log("Page rendered fully..");
            break;
        }

        lastHTMLSize = currentHTMLSize;
        // await page.waitFor(checkDurationMsecs);
    }
};


app.post("/download", async (req, res) => {
    console.log("hit")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const { url } = req.body;

    await page.goto(url, { 'timeout': 10000, 'waitUntil': 'networkidle2' });
    // await waitTillHTMLRendered(page)
    page.waitForResponse()
    //To reflect CSS used for screens instead of print
    await page.emulateMediaType("screen");

    const pdf = await page.pdf({ printBackground: true });

    await browser.close();

    res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
    res.send(pdf);
});
//task
// check valid url
// add loading spinner
