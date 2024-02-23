using Microsoft.AspNetCore.Mvc;
using PdfGenerater;
using PuppeteerSharp;
using PuppeteerSharp.Media;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PdfGenerator.Controllers
{
    public class PdfGeneratorController : Controller
    {
        public PdfGeneratorController()
        {
            // Constructor logic if needed
        }

        // Method to generate PDF from URL
        private async Task<byte[]> GeneratePdfFromUrl(string url)
        {
            try
            {
                using (var browserFetcher = new BrowserFetcher())
                {
                    await browserFetcher.DownloadAsync();
                    using (var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true }))
                    using (var page = await browser.NewPageAsync())
                    {
                        await page.GoToAsync(url, WaitUntilNavigation.Networkidle2);
                        await page.EmulateMediaTypeAsync(MediaType.Screen);

                        var pdfOptions = new PdfOptions
                        {
                            Format = PaperFormat.A4,
                            PrintBackground = true
                        };

                        return await page.PdfDataAsync(pdfOptions);
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Error generating PDF: {ex.Message}");
                throw; // Re-throw the exception to be handled by the caller
            }
        }

        // Endpoint to generate PDF from URL
        [HttpPost("/generatepdf")]
        public async Task<IActionResult> GeneratePdf([FromBody] PdfGeneraterModel model)
        {
            if (!ModelState.IsValid || string.IsNullOrWhiteSpace(model.url))
            {
                return BadRequest("Invalid request. Please provide a valid URL.");
            }

            try
            {
                var pdfBytes = await GeneratePdfFromUrl(model.url);
                var memoryStream = new MemoryStream(pdfBytes);
                return File(memoryStream, "application/pdf", "generated.pdf");
            }
            catch (Exception ex)
            {
                // Log the error
                Console.WriteLine($"Error generating PDF: {ex.Message}");
                return StatusCode(400, $"Error generating PDF: {ex.Message}");
            }
        }
    }
}