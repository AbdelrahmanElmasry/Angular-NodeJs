import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {
  url: string = 'http://localhost:3000/send';
  constructor(private http:HttpClient) { }
  sendMessage(messageContent: any) {
    console.log(messageContent);
    return this.http.post(this.url,
    JSON.stringify(messageContent),
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }
}
