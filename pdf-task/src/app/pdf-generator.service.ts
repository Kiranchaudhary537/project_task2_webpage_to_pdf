import { Injectable } from '@angular/core';
import ConvertApi from 'convertapi-js'
import puppeteer from 'puppeteer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {


  constructor(private http: HttpClient) { }

  async generatePDF(url: string): Promise<Object> {
    let convertApi = ConvertApi.auth('YHbqWj5f4Z5vGebu')
    let params = convertApi.createParams()
    params.add('Url', url);
    let result = await convertApi.convert('web', 'pdf', params)
    console.log(result);
    return result;
  }

}
