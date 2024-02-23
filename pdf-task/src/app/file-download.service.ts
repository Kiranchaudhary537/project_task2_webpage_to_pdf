import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient) { }

  async downloadFile(url: string): Promise<any> {
    console.log("on downloadfiles");
    try {
      const response = await this.http.post<Blob>('https://localhost:7055/generatepdf', { url }, { responseType: 'blob' as 'json' }).toPromise();
      return response;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }
}
