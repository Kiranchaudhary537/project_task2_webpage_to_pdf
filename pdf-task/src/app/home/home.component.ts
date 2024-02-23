import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PdfGeneratorService } from '../pdf-generator.service';
import { FileDownloadService } from '../file-download.service';


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
  constructor(private pdfGeneratorService: PdfGeneratorService, private fileDownloadService: FileDownloadService) { }

  // Function to validate URL format
  isValidUrl(url: string): string {
    const urlPattern: RegExp = /^(https?:\/\/)?([\w-]+\.)*([\w-]+\.)([a-zA-Z]{2,20})(:\d{1,5})?(\/\S*)?$/;

    if (!url.trim()) {
      return "URL is required.";
    }

    const urlMatch: RegExpMatchArray | null = url.match(urlPattern);
    console.log(urlMatch);
    if (!urlMatch) {
      return "Invalid URL format. Please enter a valid URL";
    }

    return "Valid URL";
  };


  // Function to handle call service 
  async onSubmit(): Promise<any> {
    try {

      const urlerror = this.isValidUrl(this.url)
      if (urlerror != "Valid URL") {
        this.error = urlerror;
        return;
      }

      this.isDownloading = true;
      this.isDownloaded = false;
      this.error = null;

      const response = await this.fileDownloadService.downloadFile(this.url);
      console.log(response);
      this.generatedFile = response;
      this.isDownloaded = true;

    } catch (error: any) {
      this.error = 'An error while generating the PDF and error is: ' + error.Message != '' ? error.message : error.Message;
      console.error('Error generating file:', error);

    } finally {
      this.isDownloading = false;
    }
  }


  //Function to donwload the generated file
  downloadFile() {
    const url = window.URL.createObjectURL(this.generatedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloaded_file';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

