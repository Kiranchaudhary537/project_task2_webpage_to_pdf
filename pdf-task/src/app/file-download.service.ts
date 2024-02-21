import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PdfGeneratorService } from './pdf-generator.service';
@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient,private pdfGeneratorService:PdfGeneratorService ) { }

  downloadFile(url: string): Promise<any> {
    console.log("on downloadfiles");
    // return this.pdfGeneratorService.generatePdf(url);
    return this.http.post<Blob>('http://localhost:5000/download', { url }, { responseType: 'blob' as 'json' }).toPromise();
  }
}
