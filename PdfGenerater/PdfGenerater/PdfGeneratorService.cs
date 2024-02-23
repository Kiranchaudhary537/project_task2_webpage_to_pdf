using Microsoft.AspNetCore.Mvc.Formatters;
using PuppeteerSharp;
using PuppeteerSharp.Media;

namespace PdfGenerater
{
    public class PdfGeneratorService
    {
        public async Task<byte[]> GeneratePdf(string url)
        {
            /* using (var browserFetcher = new BrowserFetcher())
             {
              await browserFetcher.DownloadAsync();
             var browser = await Puppeteer.LaunchAsync(new LaunchOptions
             {
                 Headless = true
             });
             var page = await browser.NewPageAsync();
             await page.GoToAsync("http://www.google.com");
             await page.PdfAsync(outputFile);
             } */
            using (var browserFetcher = new BrowserFetcher())
            {
                await browserFetcher.DownloadAsync();
                using (var browser = await Puppeteer.LaunchAsync(new LaunchOptions
                {
                    Headless = true
                }))
                {
                    using (var page = await browser.NewPageAsync())
                    {
                        await page.GoToAsync(url, WaitUntilNavigation.Networkidle2);
                        await page.EmulateMediaTypeAsync(PuppeteerSharp.Media.MediaType.Screen);

                        // Adjust PDF settings as needed
                        var pdfOptions = new PdfOptions
                        {
                            Format = PaperFormat.A4,
                            PrintBackground = true
                        };

                        var pdfData = await page.PdfDataAsync(pdfOptions);
                        //var pdfData = await page.PdfStreamAsync(pdfOptions);
                        return pdfData;
                    }
                }
            }
        }
    }
}
