import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpRoutingService {

  get(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
  
  apiUrl = environment.apiUrl;
  
  PostMethod(url: string, value: any) {
    return this.http.post(this.apiUrl + 'v1/' + url, value);
  }
  
  GetMethod(value: string) {
    return this.http.get(this.apiUrl + 'v1/' + value);
  }

  getJsonData(file :any){
    return this.http.get('./assets/'+file);
  }
}
