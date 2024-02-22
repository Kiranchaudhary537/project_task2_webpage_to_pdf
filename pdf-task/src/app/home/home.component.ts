import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileDownloadService } from '../file-download.service';
import { PdfGeneratorService } from '../pdf-generator.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  url: string = '';
  isDownloading: boolean = false;
  isDownloaded: boolean = false;
  error: string | null = null;
  generatedFile: any = '';
  constructor(private pdfGeneratorService: PdfGeneratorService) { }

  async onSubmit(): Promise<any> {
    try {

      if (!this.url.trim()) {
        this.error = 'Please enter a valid URL';
        return;
      }
      this.isDownloading = true;
      this.isDownloaded = false;
      this.error = null;

      const response = await this.pdfGeneratorService.generatePDF(this.url);
      // const response = await this.fileDownloadService.downloadFile(this.url);
      this.generatedFile = response;
      this.isDownloaded = true;
      // this.pdfUrl=this.generatedFile?.files[0].Url;
      // console.log(this.pdfUrl);
      // this.downloadFile(response);
    } catch (error) {
      console.error('Error generating file:', error);
      this.error = 'An error while generating the PDF';
    } finally {
      this.isDownloading = false;
    }
  }
  downloadFile() {

    const a = document.createElement('a');
    a.href = this.generatedFile.files[0].Url;
    a.download = this.generatedFile.files[0].FileName;
    document.body.appendChild(a);
    a.click();
    // window.URL.revokeObjectURL(url);

  }
}


// rector code
// add comments
// add validation for url
// add proper error message. 
