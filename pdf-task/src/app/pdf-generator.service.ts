import { Injectable } from '@angular/core';
import * as puppeteer from 'puppeteer';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(private http: HttpClient) { }


}
