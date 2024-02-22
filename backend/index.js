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




app.post("/download", async (req, res) => {
    console.log("hit")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const { url } = req.body;

    await page.goto(url, { 'timeout': 10000, 'waitUntil': 'networkidle2' });

    await page.emulateMediaType("screen");

    const pdf = await page.pdf({'timeout': 2000, printBackground: true });

    await browser.close();

    res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
    res.send(pdf);
});
//task
// check valid url
// add loading spinner
