import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NdiBackendService {

  constructor(private http: HttpClient) { }

  getQuestions(selectedLanguage: string): Observable<any> {
    const url = 'http://localhost:3000/api/questions/' + selectedLanguage;
    const apiKey = '21f1aac7-9965-41f9-b88c-b5a4ed4636cb';

    const headers = new HttpHeaders().set('apikey', apiKey);

    return this.http.get(url, { headers });
  }
}