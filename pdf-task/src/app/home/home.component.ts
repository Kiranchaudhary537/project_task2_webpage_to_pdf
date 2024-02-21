import { NgIf } from '@angular/common';
import { Component,Inject  } from '@angular/core';
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
  downloadForm: string = '';
  downloadBlob: any = '';
  constructor(private fileDownloadService: FileDownloadService, private pdfGeneratorService: PdfGeneratorService) { }

  getViewportSize() {
    return {
      width:  window.innerWidth,
      height:  window.innerHeight,
    };
  }
  async onSubmit(downloadForm: NgForm): Promise<any> {
    try {
      this.isDownloading = true;
      this.isDownloaded = false;
      console.log(this.getViewportSize());
      console.log("onsubmit");
      // const response = await this.pdfGeneratorService.downloadPDF(this.url);
      const response = await this.fileDownloadService.downloadFile(this.url);
      // this.downloadFile(response);
      this.downloadBlob = response;
      this.isDownloaded = true;
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      this.isDownloading = false;
    }
  }
  downloadFile() {
    console.log("downloadfile");
    const url = window.URL.createObjectURL(this.downloadBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'downloaded_file';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

  }
}
