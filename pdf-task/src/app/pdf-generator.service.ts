import { Injectable } from '@angular/core';
import ConvertApi from 'convertapi-js'
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {


  constructor() { }

  //function to generate pdf using convertapi.
  async generatePDF(url: string): Promise<Object> {
    try {
      let convertApi = ConvertApi.auth('YHbqWj5f4Z5vGebu');
      let params = convertApi.createParams();
      //conversiondelay so page can load
      params.add('Url', url);
      params.add('ConversionDelay',"2");
      params.add('LoadLazyContent',"true");
      let result = await convertApi.convert('web', 'pdf', params);
      return result;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }

}
